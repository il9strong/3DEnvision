import './Registration.scss';

import React from 'react';

import close from '@/assets/img/icon_close.svg';

export default function Registration({
	isVisible,
	onClose,
}: {
	isVisible: boolean;
	onClose: () => void;
}) {
	return (
		<div className={`modalWrapper ${isVisible ? 'visible' : ''}`}>
			<div className="regBlock">
				<button onClick={onClose} className="closeButton">
					<img src={close} alt="close" className="close" />
				</button>
				<h3>Registration</h3>
				<form className="regForm">
					<label>
						Login
						<input type="text" />
					</label>
					<label>
						E-mail
						<input type="text" />
					</label>
					<label>
						Password
						<input type="text" />
					</label>
					<label>
						Confirm password
						<input type="text" />
					</label>
					<button type='submit'>Register</button>
				</form>
			</div>
		</div>
	);
}
