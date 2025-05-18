export interface Category {
	id: number;
	name: string;
}

export interface Model {
	id: number;
	name: string;
	authorName: string;
	userId?: number;
	preview?: string;
	fileName?: string;
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

export interface Comment {
	id: number;
	comment: string;
	date: string;
	user_id: number;
	user: {
		nickname: string;
	};
}

export interface CommentsProps {
	modelId: number;
}


export interface SidebarProps {
	modelsByAuthor: Model[];
	otherModels: Model[];
}