import './Like.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import likeBlank from '@/assets/img/like_white_blank.svg';
import likeFill from '@/assets/img/like_white_fill.svg';
import { LikeProps } from '@/interfaces/interfaces';

export default function Like({ modelId, userId }: LikeProps) {
	const [isFavorite, setFavorite] = useState(false);
	const [favoriteId, setFavoriteId] = useState<number | null>(null);

	useEffect(() => {
		if (!userId) return;
		const fetchFavorites = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/favorites`);
				const favorites = res.data.requestBody;

				const match = favorites.find(
					(fav: any) => fav.model_id === modelId && fav.user_id === userId
				);

				if (match) {
					setFavorite(true);
					setFavoriteId(match.id);
				}
			} catch (err) {
				console.error('Ошибка при получении избранного:', err);
			}
		};

		fetchFavorites();
	}, [modelId, userId]);

	const handleClick = async () => {
		if (!userId) return;
		try {
			if (!isFavorite) {
				const res = await axios.post('http://localhost:3001/favorites', {
					user_id: userId,
					model_id: modelId,
				});
				setFavoriteId(res.data.requestBody.id);
				setFavorite(true);
			} else if (favoriteId) {
				await axios.delete(`http://localhost:3001/favorites/${favoriteId}`);
				setFavoriteId(null);
				setFavorite(false);
			}
		} catch (err) {
			console.error('Ошибка при изменении избранного:', err);
		}
	};

	if (!userId) return null;

	return (
		<button onClick={handleClick} className="likeButton">
			{isFavorite ? (
				<img src={likeFill} alt="likeFill" />
			) : (
				<img src={likeBlank} alt="likeBlank" />
			)}
		</button>
	);
}
