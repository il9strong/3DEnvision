import './Profile.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader/Loader';
import ModelCard from '@/components/ModelCard/ModelCard';
import { useAuth } from '@/hooks/useAuth';
import { Model, User } from '@/interfaces/interfaces';

export default function Profile() {
	const { token, isAdmin } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [userData, setUserData] = useState<Pick<User, 'nickname' | 'email'>>({
		nickname: '',
		email: '',
	});
	const [originalData, setOriginalData] = useState<
		Pick<User, 'nickname' | 'email'>
	>({
		nickname: '',
		email: '',
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [models, setModels] = useState<Model[]>([]);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					'http://localhost:3001/users/profile',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = response.data;

				setUserData({
					nickname: data.nickname,
					email: data.email,
				});
				setOriginalData({
					nickname: data.nickname,
					email: data.email,
				});

				if (data.models) {
					const mappedModels: Model[] = data.models.map((model: Model) => ({
						...model,
						authorName: model.users?.[0]?.nickname || 'Неизвестный автор',
						averageRating: model.averageRating ? +model.averageRating : null,
					}));
					setModels(mappedModels);
				}
			} catch (err: any) {
				setError(err.response?.data?.message || 'Ошибка загрузки профиля');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserProfile();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setUserData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem('token');
			await axios.put('http://localhost:3001/users/profile', userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setOriginalData(userData);
			setIsEditing(false);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка при сохранении профиля');
		}
	};

	const handleCancel = () => {
		setUserData(originalData);
		setIsEditing(false);
	};

	const handleDelete = async (modelId: number) => {
		if (!isAdmin()) return;
		try {
			await axios.delete(`http://localhost:3001/models/${modelId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			setModels(models.filter(model => model.id !== modelId));
		} catch (err) {
			console.error('Ошибка при удалении модели:', err);
		}
	};

	if (isLoading) return <Loader />;
	if (error) return <div className="error">Ошибка: {error}</div>;

	return (
		<main className="profile">
			<div className="wrapper">
				<h2>Мой профиль</h2>
				<div className="profileFields">
					<label htmlFor="nickname">
						Имя пользователя:
						<input
							type="text"
							id="nickname"
							value={userData.nickname}
							readOnly={!isEditing}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="email">
						E-mail:
						<input
							type="text"
							id="email"
							value={userData.email}
							readOnly={!isEditing}
							onChange={handleChange}
						/>
					</label>
					{isEditing ? (
						<div className="editButtons">
							<button onClick={handleSave} className="saveButton">
								Сохранить
							</button>
							<button onClick={handleCancel} className="cancelButton">
								Отменить
							</button>
						</div>
					) : (
						<button onClick={() => setIsEditing(true)} className="editButton">
							Изменить
						</button>
					)}
				</div>
				<div className="modelsList">
					{models.map((model) => (
						<ModelCard
							key={model.id}
							id={model.id}
							name={model.name}
							authorName={model.authorName}
							preview={model.preview}
							averageRating={model.averageRating}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
