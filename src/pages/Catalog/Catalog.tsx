import './Catalog.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Categories from '@/components/Categories/Categories';
import Loader from '@/components/Loader/Loader';
import ModelCard from '@/components/ModelCard/ModelCard';
import SortSelector from '@/components/SortSelector/SortSelector';
import { useAuth } from '@/hooks/useAuth';
import { Category, Model } from '@/interfaces/interfaces';
import { sortModels } from '@/utils/sortModels';

export default function Catalog() {
	const { isAdmin, token } = useAuth();
	const [models, setModels] = useState<Model[]>([]);
	const [filteredModels, setFilteredModels] = useState<Model[]>([]);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortOption, setSortOption] = useState<string>('name');
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		const fetchModels = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get('http://localhost:3001/models');
				setModels(response.data.requestBody);
			} catch (error) {
				console.error('Ошибка при загрузке моделей:', error);
			} finally {
				setIsLoading(false);
			}
		};

		const fetchCategories = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get('http://localhost:3001/categories');
				setCategories(response.data.requestBody);
			} catch (error) {
				console.error('Ошибка при загрузке категорий:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModels();
		fetchCategories();
	}, []);

	useEffect(() => {
		let result = [...models];

		if (selectedCategory !== 'All') {
			result = result.filter(model => 
				model.categories?.some(category => category.name === selectedCategory)
			);
		}

		if (searchQuery.trim() !== '') {
			result = result.filter((model) =>
				model.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredModels(sortModels(result, sortOption));
	}, [models, selectedCategory, searchQuery, sortOption]);

	const handleCategorySelect = (categoryName: string) => {
		setSelectedCategory(categoryName);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const deleteModel = async (modelId: number) => {
		if (!isAdmin()) return;
		try {
			await axios.delete(`http://localhost:3001/models/${modelId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			setModels(models.filter(model => model.id !== modelId));
		} catch (err) {
			console.error('Ошибка при удалении модели:', err);
		}
	};

	return (
		<main className="catalog">
			<div className="wrapper">
				<div className="title">
					<h3>Каталог</h3>
					<div className="searchBlock">
						<input
							type="text"
							placeholder="Поиск..."
							className="searchString"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<SortSelector onChange={setSortOption} />
					</div>
				</div>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<Categories
							onSelectCategory={handleCategorySelect}
							categories={categories}
						/>
						<div className="modelsList">
							{filteredModels.map((model) => (
								<ModelCard
									key={model.id}
									id={model.id}
									name={model.name}
									authorName={
										model.users?.[0]?.nickname ?? model.authorName ?? 'Неизвестный автор'
									}
									preview={model.preview}
									averageRating={model.averageRating}
									onDelete={deleteModel}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</main>
	);
}
