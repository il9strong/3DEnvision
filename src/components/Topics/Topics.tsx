import './Topics.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader/Loader';
import ModelCard from '@/components/ModelCard/ModelCard';
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
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
