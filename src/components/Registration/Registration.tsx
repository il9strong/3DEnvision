import './Registration.scss';

import axios from 'axios';
import React, { useState } from 'react';

import close from '@/assets/img/icon_close.svg';

export default function Registration({
	isVisible,
	onClose,
}: {
	isVisible: boolean;
	onClose: () => void;
}) {
	const [formData, setFormData] = useState({
		nickname: '',
		login: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (formData.password !== formData.confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		try {
			const response = await axios.post(
				'http://localhost:3001/auth/register',
				{
					nickname: formData.nickname,
					login: formData.login,
					email: formData.email,
					password: formData.password,
				}
			);

			if (response.data.success) {
				setSuccess('Регистрация прошла успешно!');
				setFormData({
					nickname: '',
					login: '',
					email: '',
					password: '',
					confirmPassword: '',
				});
			}
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка регистрации');
		}
	};

	return (
		<div className={`modalWrapper ${isVisible ? 'visible' : ''}`}>
			<div className="regBlock">
				<button onClick={onClose} className="closeButton">
					<img src={close} alt="close" className="close" />
				</button>
				<h3>Регистрация</h3>
				<form className="regForm" onSubmit={handleSubmit}>
					<label>
						Имя пользователя
						<input
							type="text"
							name="nickname"
							value={formData.nickname}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Логин
						<input
							type="text"
							name="login"
							value={formData.login}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						E-mail
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</label>
					<label>
						Пароль
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Подтверждение пароля
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</label>
					<button type="submit">Регистрация</button>
				</form>
				{error && <p className="error">{error}</p>}
				{success && <p className="success">{success}</p>}
			</div>
		</div>
	);
}
