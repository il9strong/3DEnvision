import './Favorites.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader/Loader';
import ModelCard from '@/components/ModelCard/ModelCard';
import SortSelector from '@/components/SortSelector/SortSelector';
import { useAuth } from '@/hooks/useAuth';
import { Model } from '@/interfaces/interfaces';
import { sortModels } from '@/utils/sortModels';

export default function Favorites() {
	const { user } = useAuth();
	const [favorites, setFavorites] = useState<Model[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortOption, setSortOption] = useState<string>('name');
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		const fetchFavorites = async () => {
			if (!user) return;

			try {
				setIsLoading(true);
				const res = await axios.get(
					`http://localhost:3001/favorites/user/${user.id}`
				);
				const data = res.data;

				if (data.successful && data.requestBody) {
					const models = data.requestBody.map((fav: any) => {
						const model = fav.model;
						const author = model.users?.[0]?.nickname ?? 'Неизвестный автор';

						return {
							id: model.id,
							name: model.name,
							authorName: author,
							preview: model.preview,
							averageRating: model.averageRating,
							date: model.date,
						};
					});
					setFavorites(models);
				}
			} catch (err) {
				console.error('Ошибка при загрузке избранного:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFavorites();
	}, [user]);

	const filteredFavorites = favorites.filter((model) =>
		model.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const sortedFavorites = sortModels(filteredFavorites, sortOption);

	return (
		<main className="favorites">
			<div className="wrapper">
				<div className="title">
					<h3>Избранное</h3>
					<div className="searchBlock">
						<input
							type="text"
							placeholder="Поиск..."
							className="searchString"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<SortSelector onChange={setSortOption} />
					</div>
				</div>
				{isLoading ? (
					<Loader />
				) : (
					<div className="modelsList">
						{sortedFavorites.map((model) => (
							<ModelCard
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={model.authorName}
								preview={model.preview}
								averageRating={model.averageRating}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
