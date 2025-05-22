import './Authorization.scss';

import React, { useState } from 'react';

import close from '@/assets/img/icon_close.svg';
import { useAuth } from '@/hooks/useAuth';

export default function Authorization({
	isVisible,
	onClose,
}: {
	isVisible: boolean;
	onClose: () => void;
}) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { login: loginUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		const success = await loginUser(login, password);

		if (success) {
			onClose();
		} else {
			setError('Неверный логин или пароль');
		}
	};

	return (
		<div className={`modalWrapper ${isVisible ? 'visible' : ''}`}>
			<div className="authBlock">
				<button onClick={onClose} className="closeButton">
					<img src={close} alt="close" className="close" />
				</button>
				<h3>Авторизация</h3>
				<form className="authForm" onSubmit={handleSubmit}>
					<label>
						Логин
						<input
							type="text"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							required
						/>
					</label>
					<label>
						Пароль
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					{error && <div className="error">{error}</div>}
					<button type="submit">Войти</button>
				</form>
			</div>
		</div>
	);
}
