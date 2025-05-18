import './ModelContent.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

import load from '@/assets/img/icon_download_white.svg';
import likeBlank from '@/assets/img/like_white_blank.svg';
import likeFill from '@/assets/img/like_white_fill.svg';
import Comments from '@/components/Comments/Comments';
import LoginModal from '@/components/LoginModal/LoginModal';
import Viewport from '@/components/Viewport/Viewport';
import { useAuth } from '@/hooks/useAuth';
import { Model } from '@/interfaces/interfaces';

export default function ModelContent({ model }: { model: Model }) {
	const { user } = useAuth();
	const { id, name, authorName, averageRating, sizes, description, fileName } =
		model;
	const [isFavorite, setFavorite] = useState(false);
	const [loadingFavorite, setLoadingFavorite] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [userRating, setUserRating] = useState<number | null>(null);
	const [average, setAverage] = useState<number>(averageRating || 0);

	useEffect(() => {
		if (!user) return;

		const checkFavorite = async () => {
			try {
				const res = await axios.get(
					`http://localhost:3001/favorites/user/${user.id}`
				);
				const favorites = res.data.requestBody;
				const hasFavorite = favorites.some((fav: any) => fav.model.id === id);
				setFavorite(hasFavorite);
			} catch (err) {
				console.error('Ошибка при проверке избранного', err);
			}
		};

		const fetchUserRating = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/ratings`);
				const ratings = res.data.requestBody;
				const rating = ratings.find(
					(r: any) => r.user_id === user.id && r.model_id === id
				);
				if (rating) setUserRating(rating.rating);
			} catch (error) {
				console.error('Ошибка при получении рейтинга пользователя', error);
			}
		};

		checkFavorite();
		fetchUserRating();
	}, [user, id]);

	const handleRatingChange = async (newRating: number) => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		
		try {
			const res = await axios.get(`http://localhost:3001/ratings`);
			const ratings = res.data.requestBody;
			const existing = ratings.find(
				(r: any) => r.user_id === user.id && r.model_id === model.id
			);
			console.log(existing);
			console.log(newRating);

			if (existing) {
				console.log(existing.id);
				
				await axios.put(`http://localhost:3001/ratings/${existing.id}`, {
					rating: newRating,
					date: new Date(),
					user_id: user.id,
					model_id: model.id,
				});
			} else {
				await axios.post(`http://localhost:3001/ratings`, {
					rating: newRating,
					date: new Date(),
					user_id: user.id,
					model_id: model.id,
				});
			}

			setUserRating(newRating);

			const updatedRes = await axios.get(`http://localhost:3001/ratings`);
			const updatedRatings = updatedRes.data.requestBody.filter(
				(r: any) => r.model_id === model.id
			);
			const avg =
				updatedRatings.reduce((sum: number, r: any) => sum + r.rating, 0) /
				updatedRatings.length;
			setAverage(Number(avg.toFixed(1)));
		} catch (error) {
			console.error('Ошибка при сохранении рейтинга', error);
		}
	};

	const toggleFavorite = async () => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}

		setLoadingFavorite(true);

		try {
			if (!isFavorite) {
				await axios.post('http://localhost:3001/favorites', {
					user_id: user.id,
					model_id: id,
				});
				setFavorite(true);
			} else {
				const res = await axios.get(
					`http://localhost:3001/favorites/user/${user.id}`
				);
				const favorites = res.data.requestBody;
				const favObj = favorites.find((fav: any) => fav.model.id === id);
				if (favObj) {
					await axios.delete(`http://localhost:3001/favorites/${favObj.id}`);
					setFavorite(false);
				}
			}
		} catch (err) {
			console.error('Ошибка при обновлении избранного', err);
		} finally {
			setLoadingFavorite(false);
		}
	};

	return (
		<section className="modelContent">
			{fileName ? (
				<Viewport fileName={fileName} />
			) : (
				<p className="noModelFile">No model file</p>
			)}
			<aside className="modelDetails">
				<section className="header">
					<div className="modelTitle">
						<h3>{name}</h3>
						<p>{authorName}</p>
					</div>
					<div className="rateAndFavorite">
						<div className="rating">
							<ReactStars
								count={5}
								value={userRating || 0}
								onChange={handleRatingChange}
								size={32}
								color2={'#ffd700'}
							/>
							<p>{average.toFixed(1)}</p>
						</div>
						<button
							className="toFavorite"
							onClick={toggleFavorite}
							disabled={loadingFavorite}
							title={isFavorite ? 'Unfavorite' : 'To favorite'}
						>
							{isFavorite ? 'Unfavorite' : 'To favorite'}
							<img src={isFavorite ? likeFill : likeBlank} alt="favorite" />
						</button>
					</div>
				</section>
				<button className="download">
					Download
					<img src={load} alt="download" />
				</button>
				<section className="description">
					<h2>Description</h2>
					<p>{description}</p>
				</section>
				<section className="sizes">
					<h2>Sizes</h2>
					<p>{sizes}</p>
				</section>
				<Comments modelId={model.id} />
			</aside>

			{showLoginModal && (
				<LoginModal onClose={() => setShowLoginModal(false)} />
			)}
		</section>
	);
}
