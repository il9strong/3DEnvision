import './SortSelector.scss';

import React from 'react';

import { SortSelectorProps } from '@/interfaces/interfaces';

export default function SortSelector({onChange}: SortSelectorProps) {
	return (
		<div className='sortSelector'>
			<label htmlFor='#sorting'>Сортировать по</label>
			<select name="sorting" id="sorting" onChange={(e) => onChange(e.target.value)}>
				<option value="name">имени</option>
				<option value="author">автору</option>
				<option value="date">дате добавления</option>
			</select>
		</div>
	);
}
