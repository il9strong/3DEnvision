import './Topics.scss';

import React from 'react';

import ModelCard from '@/components/ModelCard/ModelCard';
import { models } from '@/temporaryDataBase/dataBase';

export default function Topics() {
	const topicsModels = models.slice(0, 6);

	return (
		<section id="topics" className="topicsBlock">
			<div className="wrapper">
				<h3>Topics for you</h3>
				<div className="modelsList">
					{topicsModels.map(model => 
						<ModelCard 
							key={model.id} 
							id={model.id}
							modelName={model.modelName}
							modelAuthor={model.modelAuthor}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
