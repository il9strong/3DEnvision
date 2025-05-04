import './Authorization.scss';

import React from 'react';

import close from '@/assets/img/icon_close.svg';

export default function Authorization({
	isVisible,
	onClose,
}: {
	isVisible: boolean;
	onClose: () => void;
}) {
	return (
		<div className={`modalWrapper ${isVisible ? 'visible' : ''}`}>
			<div className="authBlock">
				<button onClick={onClose} className="closeButton">
					<img src={close} alt="close" className="close" />
				</button>
				<h3>Authorization</h3>
				<form className="authForm">
					<label>
						Login
						<input type="text" />
					</label>
					<label>
						Password
						<input type="text" />
					</label>
					<button type='submit'>Login</button>
				</form>
			</div>
		</div>
	);
}
