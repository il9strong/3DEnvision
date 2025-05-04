import "./Rating.scss";

import React, { useState } from 'react';

import ratingFill from "@/assets/img/rating_white_blank.svg";
import ratingBlank from "@/assets/img/rating_white_fill.svg";

export default function Rating() {
	const [isRated, setRated] = useState(false);

	const handleClick = () => {
		setRated(!isRated);
	}

	return (
		<div className='modelRating'>
			<button onClick={handleClick}>
				{isRated ? <img src={ratingBlank} alt="ratingBlank" /> : <img src={ratingFill} alt="ratingFill" />}
			</button>
			<p>4.7</p>
		</div>
	)
}
