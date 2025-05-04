import './Catalog.scss';

import React from 'react';

import Categories from '@/components/Categories/Categories';
import ModelCard from '@/components/ModelCard/ModelCard';
import SortSelector from '@/components/SortSelector/SortSelector';
import { models } from '@/temporaryDataBase/dataBase';

export default function Catalog() {
	return (
		<>
			<main className="catalog">
				<div className="wrapper">
					<div className="title">
						<h3>catalog</h3>
						<div className="searchBlock">
							<input
								type="text"
								placeholder="Search..."
								className="searchString"
							/>
							<SortSelector />
						</div>
					</div>
					<Categories />
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
