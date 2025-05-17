import './ModelCardSmall.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import head from '@/assets/img/gypsum_head.png';
import Like from '@/components/Like/Like';
import Rating from '@/components/Rating/Rating';
import { useAuth } from '@/hooks/useAuth';
import { Model } from '@/interfaces/interfaces';

export default function ModelCard({
	id,
	name,
	authorName,
	averageRating,
}: Model) {
	const { user } = useAuth();
	if (!user) return null;

	return (
		<div className="modelCardSmall">
			<img src={head} alt="head" className="modelPreview" />
			<div className="modelCardInfo">
				<div className="cardInfo">
					<Link to="/model">{name}</Link>
					<p>{authorName}</p>
				</div>
				<div className="cardButtons">
					<Like modelId={id} userId={user.id} />
					<Rating value={averageRating ?? 0} />
				</div>
			</div>
		</div>
	);
}
