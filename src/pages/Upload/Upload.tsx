import './Upload.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoginModal from '@/components/LoginModal/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import { Category } from '@/interfaces/interfaces';

export default function Upload() {
	const { user } = useAuth();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [modelFile, setModelFile] = useState<File | null>(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [accessToDownload, setAccessToDownload] = useState(true);
	const [newCategoryName, setNewCategoryName] = useState('');

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get('http://localhost:3001/categories');
				console.log(response.data);

				if (response.status === 200 && response.data.requestBody) {
					setCategories(response.data.requestBody);
				} else {
					console.error(
						'Ошибка при загрузке категорий:',
						response.data.message
					);
				}
			} catch (error) {
				console.error('Ошибка запроса категорий:', error);
			}
		};
		fetchCategories();
	}, []);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onload = (e) => setImagePreview(e.target?.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setModelFile(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user || !user.id) {
			setShowLoginModal(true);
			return;
		}

		if (
			!modelFile ||
			!name ||
			!description ||
			selectedCategories.length === 0
		) {
			alert('Пожалуйста, заполните все обязательные поля.');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('categories', JSON.stringify(selectedCategories));
		formData.append('user_id', user.id.toString());
		formData.append('model', modelFile);
		formData.append('access_to_download', accessToDownload.toString());
		if (imageFile) {
			formData.append('preview', imageFile);
		}

		try {
			const response = await axios.post(
				'http://localhost:3001/api/upload',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log(response.data);
			alert('Модель успешно загружена!');
		} catch (error: any) {
			console.error('Ошибка загрузки модели:', error);
			alert(
				`Загрузка не удалась: ${error.response?.data?.message || 'Неизвестная ошибка'}`
			);
		}
	};

	const handleAddCategory = async () => {
		if (!newCategoryName.trim()) {
			alert('Пожалуйста, введите название новой категории.');
			return;
		}

		try {
			const response = await axios.post('http://localhost:3001/categories', {
				name: newCategoryName,
			});

			if (
				response.status >= 200 &&
				response.status < 300 &&
				response.data.requestBody
			) {
				const newCategory = response.data.requestBody;
				setCategories([...categories, newCategory]);
				setNewCategoryName('');
				alert('Категория успешно добавлена!');
			} else {
				console.error(
					'Ошибка при добавлении категории:',
					response.data.message || 'Неизвестная ошибка'
				);
				alert(
					`Не удалось добавить категорию: ${response.data.message || 'Неизвестная ошибка'}`
				);
			}
		} catch (error: any) {
			console.error('Ошибка запроса добавления категории:', error);
			alert(
				`Не удалось добавить категорию: ${error.response?.data?.message || 'Неизвестная ошибка'}`
			);
		}
	};

	return (
		<main className="upload">
			<div className="wrapper">
				<h2 className="title">Загрузите свою модель</h2>
				<form className="addModelForm" onSubmit={handleSubmit}>
					<section className="loadPreviewBlock">
						<div className="imgPreview">
							{imagePreview ? (
								<img src={imagePreview} alt="Preview" />
							) : (
								<p>Нет изображения</p>
							)}
						</div>
						<input
							type="file"
							id="loadImg"
							hidden
							accept="image/*"
							onChange={handleImageChange}
						/>
						<div className="loadLabel">
							<label htmlFor="loadImg" className="loadImg">
								Загрузить изображение
							</label>
							{imagePreview && <p>{imageFile?.name}</p>}
						</div>
					</section>
					<section className="loadModelBlock">
						<input
							type="file"
							id="loadModel"
							hidden
							onChange={handleModelChange}
						/>
						<div className="loadLabel">
							<label htmlFor="loadModel" className="loadModel">
								Загрузить модель
							</label>
							{modelFile && <p>{modelFile.name}</p>}
						</div>
					</section>
					<section className="addDescriptionBlock">
						<label htmlFor="#modelName" className="modelNameLabel">
							Название модели
							<input
								type="text"
								placeholder="Название модели"
								id="modelName"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</label>
						<label htmlFor="#description" className="descriptionLabel">
							Описание
							<textarea
								className="addDescription"
								placeholder="Описание"
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</label>
						<div className="sortSelector">
							<label htmlFor="categories-select">
								Категории (можно выбрать несколько, для этого зажмите клавишу
								Ctrl):
							</label>
							<select
								id="categories-select"
								multiple
								value={selectedCategories.map(String)}
								onChange={(e) => {
									const selected = Array.from(
										e.target.selectedOptions,
										(option) => Number(option.value)
									);
									setSelectedCategories(selected);
								}}
								required
							>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="addCategoryInput">
							<label htmlFor="addNewCategory">
								Добавить новую категорию:
								<input
									type="text"
									placeholder="Новая категория"
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									id="addNewCategory"
								/>
							</label>
							<button
								type="button"
								onClick={handleAddCategory}
								className="addCategoryButton"
							>
								Добавить категорию
							</button>
						</div>
						<div className="downloadAccess">
							<label>
								<input
									type="checkbox"
									checked={accessToDownload}
									onChange={(e) => setAccessToDownload(e.target.checked)}
								/>
								Разрешить скачивание модели другим пользователям
							</label>
						</div>
					</section>
					<button type="submit" className="submit">
						Подтвердить
					</button>
				</form>
				{showLoginModal && (
					<LoginModal onClose={() => setShowLoginModal(false)} />
				)}
			</div>
		</main>
	);
}
