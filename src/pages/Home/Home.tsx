import React from 'react';

import ToCatalog from '@/components/ToCatalog/ToCatalog';
import Topics from '@/components/Topics/Topics';
import Welcome from '@/components/Welcome/Welcome';

export default function Home() {
	return (
		<>
			<main>
				<Welcome />
				<Topics />
				<ToCatalog />
			</main>
		</>
	);
}
