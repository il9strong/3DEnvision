import './Welcome.scss';

import React from 'react';

import arrow from '@/assets/img/arrow_down_white.svg';

export default function Welcome() {
	return (
		<div className="welcomeBlock">
			<div className='welcomeTextBlock'>
				<p>
					Explore the fascinating world of 3D modeling with our online platform!
				</p>
				<a href='#topics'>
					Explore
					<img src={arrow} alt="arrowDown" />
				</a>
			</div>
		</div>
	);
}
