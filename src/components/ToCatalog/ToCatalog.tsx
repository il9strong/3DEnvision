import './ToCatalog.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import arrow from '@/assets/img/arrow_down_white.svg';

export default function ToCatalog() {
	return (
		<div className="toCatalog">
			<div className="toCatalogBlock">
				<p>
					Take a look at our catalog to discover more amazing works and projects
					that we are proud to present!
				</p>
				<Link to="/catalog">
					Catalog
					<img src={arrow} alt="arrow" />
				</Link>
			</div>
		</div>
	);
}
