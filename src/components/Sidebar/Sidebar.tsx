import './Sidebar.scss';

import React from 'react';

import ModelCardSmall from '@/components/ModelCardSmall/ModelCardSmall';
import { SidebarProps } from '@/interfaces/interfaces';

export default function Sidebar({
	modelsByAuthor,
	otherModels,
	modelAuthor,
}: SidebarProps) {
	console.log(modelsByAuthor);
	console.log(otherModels);

	return (
		<aside className="sidebar">
			<section className="moreByAuthor">
				<h4>Больше от {modelAuthor ? modelAuthor : 'неизвестного автора'}</h4>
				<div className="sidebarModelsList">
					{modelsByAuthor.length > 0 ? (
						modelsByAuthor.map((model) => (
							<ModelCardSmall
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={
									model.users?.[0]?.nickname ??
									model.authorName ??
									'Неизвестный автор'
								}
								preview={model.preview}
								averageRating={model.averageRating}
							/>
						))
					) : (
						<p className="noOtherWorks">Нет других работ этого автора</p>
					)}
				</div>
			</section>
			<section className="otherWorks">
				<h4>Другие работы</h4>
				<div className="sidebarModelsList">
					{otherModels.length > 0 ? (
						otherModels.map((model) => (
							<ModelCardSmall
								key={model.id}
								id={model.id}
								name={model.name}
								authorName={
									model.users?.[0]?.nickname ??
									model.authorName ??
									'Неизвестный автор'
								}
								preview={model.preview}
								averageRating={model.averageRating}
							/>
						))
					) : (
						<p className="noOtherWorks">Нет других работ</p>
					)}
				</div>
			</section>
		</aside>
	);
}
