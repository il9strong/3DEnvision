import './FullModel.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '@/components/Loader/Loader';
import ModelContent from '@/components/ModelContent/ModelContent';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Model } from '@/interfaces/interfaces';

export default function FullModel() {
	const { id } = useParams<{ id: string }>();
	const [modelData, setModelData] = useState<Model | null>(null);
	const [modelsByAuthor, setModelsByAuthor] = useState<Model[]>([]);
	const [otherModels, setOtherModels] = useState<Model[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchModel = async () => {
			if (!id) return;

			try {
				setIsLoading(true);
				const response = await axios.get(`http://localhost:3001/models/${id}`);
				const rawData = response.data.requestBody;
				console.log(rawData);

				const mappedModel = {
					id: rawData.id,
					name: rawData.name,
					description: rawData.description,
					sizes: rawData.sizes,
					memory: rawData.memory,
					date: rawData.date,
					category_id: Number(rawData.category_id),
					preview: rawData.preview,
					fileName: rawData.file_name,
					averageRating: parseFloat(rawData.averageRating),
					authorName: rawData.users?.[0]?.nickname || 'Unknown',
					userId: rawData.users?.[0]?.id || null,
				};

				setModelData(mappedModel);
			} catch (error) {
				console.error('Ошибка при получении модели:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModel();
	}, [id]);

	useEffect(() => {
		const fetchRelatedModels = async () => {
			if (!modelData) return;

			try {
				console.log(modelData);
				const [byAuthorRes, otherRes] = await Promise.all([
					axios.get(`http://localhost:3001/models/related/by-author`, {
						params: {
							userId: modelData.userId,
							modelId: modelData.id,
						},
					}),
					axios.get(`http://localhost:3001/models/related/others`, {
						params: {
							modelId: modelData.id,
						},
					}),
				]);

				setModelsByAuthor(byAuthorRes.data.requestBody);
				setOtherModels(otherRes.data.requestBody);
			} catch (error) {
				console.error('Ошибка при получении связанных моделей:', error);
			}
		};

		fetchRelatedModels();
	}, [modelData]);

	return (
		<main className="fullModel">
			<div className="wrapper">
				{isLoading || !modelData ? (
					<Loader />
				) : (
					<ModelContent model={modelData} />
				)}
				<Sidebar modelsByAuthor={modelsByAuthor} otherModels={otherModels} />
			</div>
		</main>
	);
}
