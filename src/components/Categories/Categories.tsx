import './Categories.scss';

import React, { useState } from 'react';

import { CategoriesProps } from '@/interfaces/interfaces';

export default function Categories({ onSelectCategory, categories }: CategoriesProps) {
	const [selectedCategory, setCategory] = useState('All');

	const handleClick = (categoryName: string) => {
		setCategory(categoryName);
		onSelectCategory(categoryName);
	};

	return (
		<div className="categories">
			<div className="categoriesList">
				<button
					key="all"
					onClick={() => handleClick('All')}
					className={`categoryButton ${selectedCategory === 'All' ? 'active' : ''}`}
				>
					Все
				</button>
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => handleClick(category.name)}
						className={`categoryButton ${selectedCategory === category.name ? 'active' : ''}`}
					>
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
}
