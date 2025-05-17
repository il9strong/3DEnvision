export interface Category {
	id: number;
	name: string;
}

export interface Model {
	id: number;
	name: string;
	authorName: string;
	preview?: string;
	description?: string;
	sizes?: string;
	memory?: string;
	date?: string;
	category_id?: number;
	users?: User[];
	averageRating?: number | null;
}

export interface User {
	id: number;
	nickname: string;
	email: string;
	login: string;
	password: string;
	models?: Model[];
}

export interface RatingProps {
	value: number;
}

export interface LikeProps {
	modelId: number;
	userId: number;
}

export interface CategoriesProps {
	onSelectCategory: (category: string) => void;
	categories: Category[];
}

export interface SortSelectorProps {
	onChange: (option: string) => void;
}