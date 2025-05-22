import './ToCatalog.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import arrow from '@/assets/img/arrow_down_white.svg';

export default function ToCatalog() {
	return (
		<div className="toCatalog">
			<div className="toCatalogBlock">
				<p>
				Загляните в наш каталог, чтобы открыть для себя еще больше потрясающих работ и проектов, которые мы с гордостью представляем!
				</p>
				<Link to="/catalog">
					Каталог
					<img src={arrow} alt="arrow" />
				</Link>
			</div>
		</div>
	);
}
