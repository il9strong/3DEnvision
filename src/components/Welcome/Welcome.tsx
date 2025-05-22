import './Welcome.scss';

import React from 'react';

import arrow from '@/assets/img/arrow_down_white.svg';

export default function Welcome() {
	return (
		<div className="welcomeBlock">
			<div className="welcomeTextBlock">
				<p>
					Откройте для себя увлекательный мир 3D-моделирования с нашей
					онлайн-платформой!
				</p>
				<a href="#topics">
					Подробнее
					<img src={arrow} alt="arrowDown" />
				</a>
			</div>
		</div>
	);
}
