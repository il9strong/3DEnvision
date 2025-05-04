import './FullModel.scss';

import React from 'react';

import ModelContent from '@/components/ModelContent/ModelContent';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function FullModel() {
	return (
		<main className='fullModel'>
			<div className="wrapper">
				<ModelContent />
				<Sidebar />
			</div>
		</main>
	);
}
