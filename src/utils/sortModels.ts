import { Model } from '@/interfaces/interfaces';

export const sortModels = (models: Model[], sortOption: string): Model[] => {
	const sorted = [...models];
	switch (sortOption) {
		case 'name':
			sorted.sort((a, b) => a.name.localeCompare(b.name));
			break;
		case 'author':
			sorted.sort((a, b) =>
				(a.users?.[0]?.nickname ?? a.authorName ?? '').localeCompare(
					b.users?.[0]?.nickname ?? b.authorName ?? ''
				)
			);
			break;
		case 'date':
			sorted.sort((a, b) => {
				const dateA = new Date(a.date ?? '').getTime();
				const dateB = new Date(b.date ?? '').getTime();
				return dateB - dateA;
			});
			break;
		default:
			break;
	}
	return sorted;
};
