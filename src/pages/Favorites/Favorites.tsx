import './Favorites.scss';

import React from 'react';

import ModelCard from '@/components/ModelCard/ModelCard';
import SortSelector from '@/components/SortSelector/SortSelector';
import { models } from '@/temporaryDataBase/dataBase';

export default function Favorites() {
	return (
		<>
			<main className="favorites">
				<div className="wrapper">
					<div className="title">
						<h3>Favorites</h3>
						<div className="searchBlock">
							<input
								type="text"
								placeholder="Search..."
								className="searchString"
							/>
							<SortSelector />
						</div>
					</div>
					<div className="modelsList">
						{models.map((model) => (
							<ModelCard
								key={model.id}
								id={model.id}
								modelName={model.modelName}
								modelAuthor={model.modelAuthor}
							/>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
