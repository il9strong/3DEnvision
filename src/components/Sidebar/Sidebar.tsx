import './Sidebar.scss';

import React from 'react';

import ModelCardSmall from '@/components/ModelCardSmall/ModelCardSmall';
// import { models } from '@/temporaryDataBase/dataBase';

export default function Sidebar() {
	// const modelsByAuthor = models.slice(0, 4);
	// const otherWorks = models.slice(0, 4);
	return (
		<aside className="sidebar">
			<section className="moreByAuthor">
				<h4>More by Author</h4>
				<div className="sidebarModelsList">
					{/* {modelsByAuthor.map((model) => (
						<ModelCardSmall
							key={model.id}
							id={model.id}
							modelName={model.modelName}
							modelAuthor={model.modelAuthor}
						/>
					))} */}
				</div>
			</section>
			<section className="otherWorks">
				<h4>Other works</h4>
				<div className="sidebarModelsList">
					{/* {otherWorks.map((model) => (
						<ModelCardSmall
							key={model.id}
							id={model.id}
							modelName={model.modelName}
							modelAuthor={model.modelAuthor}
						/>
					))} */}
				</div>
			</section>
		</aside>
	);
}
