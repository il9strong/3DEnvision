import './ModelCard.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import noImage from '@/assets/img/no_image.png';
import Like from '@/components/Like/Like';
import Rating from '@/components/Rating/Rating';
import { useAuth } from '@/hooks/useAuth';
import { Model } from '@/interfaces/interfaces';

export default function ModelCard({
	id,
	name,
	authorName,
	preview,
	averageRating,
	onDelete,
}: Model & { onDelete: (id: number) => void }) {
	const { user, isAdmin } = useAuth();

	const previewUrl = preview
		? `http://localhost:3001/assets/images/${preview}`
		: noImage;

	return (
		<div className="modelCard">
			<img src={previewUrl} alt={name} className="modelPreview" />
			<div className="modelCardInfo">
				<div className="cardInfo">
					<Link to={`/model/${id}`}>{name}</Link>
					<p>{authorName}</p>
				</div>
				<div className="cardButtons">
					{user && <Like modelId={id} userId={user.id} />}
					<Rating value={averageRating ?? 0} />
				</div>
			</div>
			{isAdmin() && (
				<button onClick={() => onDelete(id)} className="deleteIcon"></button>
			)}
		</div>
	);
}
