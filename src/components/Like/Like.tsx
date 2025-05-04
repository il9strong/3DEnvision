import './Like.scss';

import React, { useState } from 'react';

import likeBlank from '@/assets/img/like_white_blank.svg';
import likeFill from '@/assets/img/like_white_fill.svg';

export default function Like() {
	const [isFavorite, setFavorite] = useState(false);

	const handleClick = (): void => {
		setFavorite(!isFavorite);
	};

	return (
		<button onClick={handleClick} className='likeButton'>
			{isFavorite ? (
				<img src={likeFill} alt="likeFill" />
			) : (
				<img src={likeBlank} alt="likeBlank" />
			)}
		</button>
	);
}
