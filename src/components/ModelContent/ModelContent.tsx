import './ModelContent.scss';

import React, { useState } from 'react';
import ReactStars from 'react-stars';

import load from '@/assets/img/icon_download_white.svg';
import likeBlank from '@/assets/img/like_white_blank.svg';
import likeFill from '@/assets/img/like_white_fill.svg';
import Comments from '@/components/Comments/Comments';
import Viewport from '@/components/Viewport/Viewport';

export default function ModelContent() {
	const [isFavorite, setFavorite] = useState(false);
	const [rating, setRating] = useState<number>(0);

	const handleClick = (): void => {
		setFavorite(!isFavorite);
	};

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	return (
		<section className="modelContent">
			<Viewport />
			<aside className="modelDetails">
				<section className="header">
					<div className="modelTitle">
						<h3>Gypsum head</h3>
						<p>Auhtor</p>
					</div>
					<div className='rateAndFavorite'>
						<div className="rating">
							<ReactStars
								count={5}
								value={rating}
								onChange={handleRatingChange}
								size={32}
								color2={'#ffd700'}
							/>
							<p>4.7</p>
						</div>
						<button className="toFavorite" onClick={handleClick}>
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
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
						deserunt dolore cupiditate, doloremque ratione libero distinctio
						illum veritatis, iusto, aspernatur dolores? Maiores, architecto
						eaque. Non praesentium numquam voluptas temporibus officiis. Lorem
						ipsum dolor sit amet consectetur, adipisicing elit. Dolorum deserunt
						dolore cupiditate, doloremque ratione libero distinctio illum
						veritatis, iusto, aspernatur dolores? Maiores, architecto eaque. Non
						praesentium numquam voluptas temporibus officiis. Lorem ipsum dolor
						sit amet consectetur, adipisicing elit. Dolorum deserunt dolore
						cupiditate, doloremque ratione libero distinctio illum veritatis,
						iusto, aspernatur dolores? Maiores, architecto eaque. Non
						praesentium numquam voluptas temporibus officiis. Lorem ipsum dolor
						sit amet consectetur, adipisicing elit. Dolorum deserunt dolore
						cupiditate, doloremque ratione libero distinctio illum veritatis,
						iusto, aspernatur dolores? Maiores, architecto eaque. Non
						praesentium numquam voluptas temporibus officiis.
					</p>
				</section>
				<section className="sizes">
					<h2>Sizes</h2>
					<p>300x200x100</p>
				</section>
				<Comments />
			</aside>
		</section>
	);
}
