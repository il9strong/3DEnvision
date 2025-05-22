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
	const [categoryId, setCategoryId] = useState<number | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [showLoginModal, setShowLoginModal] = useState(false);

	console.log(user);

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

		if (!modelFile || !name || !description || !categoryId) {
			alert('Пожалуйста, заполните все обязательные поля.');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('category_id', categoryId.toString());
		formData.append('user_id', user?.id.toString() || '');
		formData.append('model', modelFile);
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
							<select
								value={categoryId || ''}
								onChange={(e) => setCategoryId(Number(e.target.value))}
								required
							>
								<option value="" disabled>
									Выберите категорию
								</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
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
