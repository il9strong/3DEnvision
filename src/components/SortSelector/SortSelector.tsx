import './SortSelector.scss';

import React from 'react';

import { SortSelectorProps } from '@/interfaces/interfaces';

export default function SortSelector({onChange}: SortSelectorProps) {
	return (
		<div className='sortSelector'>
			<label htmlFor='#sorting'>Sort by</label>
			<select name="sorting" id="sorting" onChange={(e) => onChange(e.target.value)}>
				<option value="name">name</option>
				<option value="author">author</option>
				<option value="date">date added</option>
			</select>
		</div>
	);
}
