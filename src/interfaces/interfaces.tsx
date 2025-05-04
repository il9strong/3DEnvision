export interface Category {
	id: number;
	categoryName: string;
}

export interface Model {
	id: number;
	modelName: string;
	modelAuthor: string;
}

export interface User {
	id: number;
	nickname: string;
	email: string;
	login: string;
	password: string;
}
