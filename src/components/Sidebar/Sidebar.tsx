import './Sidebar.scss';

import React from 'react';

import ModelCardSmall from '@/components/ModelCardSmall/ModelCardSmall';
import { SidebarProps } from '@/interfaces/interfaces';

export default function Sidebar({ modelsByAuthor, otherModels }: SidebarProps) {
	return (
		<aside className="sidebar">
			<section className="moreByAuthor">
				<h4>More by Author</h4>
				<div className="sidebarModelsList">
					{modelsByAuthor.length > 0 ? (
						modelsByAuthor.map((model) => (
							<ModelCardSmall
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={model.authorName}
								preview={model.preview}
								averageRating={model.averageRating}
							/>
						))
					) : (
						<p className='noOtherWorks'>No other works by this author</p>
					)}
				</div>
			</section>
			<section className="otherWorks">
				<h4>Other works</h4>
				<div className="sidebarModelsList">
					{otherModels.length > 0 ? (
						otherModels.map((model) => (
							<ModelCardSmall
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={model.authorName}
								preview={model.preview}
								averageRating={model.averageRating}
							/>
						))
					) : (
						<p className='noOtherWorks'>No other works</p>
					)}
				</div>
			</section>
		</aside>
	);
}