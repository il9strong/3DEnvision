declare module 'react-stars' {
	import * as React from 'react';

	interface ReactStarsProps {
		count: number;
		value: number;
		onChange: (newRating: number) => void;
		size?: number;
		color2?: string;
	}

	const ReactStars: React.FC<ReactStarsProps>;

	export default ReactStars;
}
