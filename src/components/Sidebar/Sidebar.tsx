import './Sidebar.scss';

import React from 'react';

import ModelCardSmall from '@/components/ModelCardSmall/ModelCardSmall';
import { Model } from '@/interfaces/interfaces';

interface SidebarProps {
	modelsByAuthor: Model[];
	otherModels: Model[];
}

export default function Sidebar({ modelsByAuthor, otherModels }: SidebarProps) {
	return (
		<aside className="sidebar">
			<section className="moreByAuthor">
				<h4>More by Author</h4>
				<div className="sidebarModelsList">
					{modelsByAuthor.map((model) => (
						<ModelCardSmall
							key={model.id}
							id={model.id}
							name={model.name}
							authorName={model.authorName}
							averageRating={model.averageRating}
						/>
					))}
				</div>
			</section>
			<section className="otherWorks">
				<h4>Other works</h4>
				<div className="sidebarModelsList">
					{otherModels.map((model) => (
						<ModelCardSmall
							key={model.id}
							id={model.id}
							name={model.name}
							authorName={model.authorName}
							averageRating={model.averageRating}
						/>
					))}
				</div>
			</section>
		</aside>
	);
}