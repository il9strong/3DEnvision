import './Categories.scss';

import React, { useState } from 'react';

import { categories } from '@/temporaryDataBase/dataBase';

export default function Categories() {
	const [selectedCategory, setCategory] = useState('All');

	const handleClick = (categoryName: string) => {
		setCategory(categoryName);
	};
	return (
		<div className="categories">
			<div className="categoriesList">
				<button
					key="all"
					onClick={() => handleClick('All')}
					className={`categoryButton ${selectedCategory === 'All' ? 'active' : ''}`}
				>
					All
				</button>
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => handleClick(category.categoryName)}
						className={`categoryButton ${selectedCategory === category.categoryName ? 'active' : ''}`}
					>
						{category.categoryName}
					</button>
				))}
			</div>
		</div>
	);
}
