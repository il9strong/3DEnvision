import './SortSelector.scss';

import React from 'react';

export default function SortSelector() {
	return (
		<div className='sortSelector'>
			<label>Sort by</label>
			<select name="sorting" id="sorting">
				<option value="name">name</option>
				<option value="author">author</option>
				<option value="date">date added</option>
			</select>
		</div>
	);
}
