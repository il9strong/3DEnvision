import './ModelCard.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import head from '@/assets/img/gypsum_head.png';
import Like from '@/components/Like/Like';
import Rating from '@/components/Rating/Rating';
import { Model } from '@/interfaces/interfaces';

export default function ModelCard({ modelName, modelAuthor }: Model) {
	return (
		<div className="modelCard">
			<img src={head} alt="head" className="modelPreview" />
			<div className="modelCardInfo">
				<div className="cardInfo">
					<Link to="/model">{modelName}</Link>
					<p>{modelAuthor}</p>
				</div>
				<div className="cardButtons">
					<Like />
					<Rating />
				</div>
			</div>
		</div>
	);
}
