import './Topics.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader/Loader';
import ModelCard from '@/components/ModelCard/ModelCard';
import { useAuth } from '@/hooks/useAuth';
import { Model } from '@/interfaces/interfaces';

export default function Topics() {
	const [models, setModels] = useState<Model[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchModels = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get(
					'http://localhost:3001/models/top-rated'
				);
				setModels(response.data.requestBody);
			} catch (error) {
				console.error('Ошибка при загрузке моделей:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModels();
	}, []);

	const { token, isAdmin } = useAuth();

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

	return (
		<section id="topics" className="topicsBlock">
			<div className="wrapper">
				<h3>Рекомендуемое</h3>
				{isLoading ? (
					<Loader />
				) : (
					<div className="modelsList">
						{models.map((model) => (
							<ModelCard
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={model.users?.[0]?.nickname ?? 'Unknown author'}
								preview={model.preview}
								averageRating={model.averageRating}
								onDelete={handleDelete}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
