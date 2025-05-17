import './Rating.scss';

import React, { useState } from 'react';

import ratingBlank from '@/assets/img/rating_white_blank.svg';
import ratingFill from '@/assets/img/rating_white_fill.svg';
import { RatingProps } from '@/interfaces/interfaces';

export default function Rating({ value }: RatingProps) {
	const displayedRating = value ? Number(value).toFixed(1) : '0.0';

	return (
		<div className="modelRating">
			<button>
				<img src={ratingFill} alt="ratingFill" />
			</button>
			<p>{displayedRating}</p>
		</div>
	);
}
