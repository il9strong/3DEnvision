import './Header.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/img/logo.svg';
import Authorization from '@/components/Authorization/Authorization';
import Registration from '@/components/Registration/Registration';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
	const [isAuthVisible, setAuthVisible] = useState(false);
	const [isRegVisible, setRegVisible] = useState(false);

	const { user, logout } = useAuth();

	const toggleAuthVisibility = () => {
		setAuthVisible(!isAuthVisible);
	};

	const toggleRegVisibility = () => {
		setRegVisible(!isRegVisible);
	};

	useEffect(() => {
		if (isAuthVisible || isRegVisible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isAuthVisible, isRegVisible]);

	return (
		<>
			<header>
				<div className="topBar">
					<Link to="/" className="logo">
						<img src={logo} alt="Logo" />
					</Link>
					<ul className="nav">
						<li>
							<Link to="/">Главная</Link>
						</li>
						<li>
							<Link to="/catalog">Каталог</Link>
						</li>
						<li>
							<Link to="/about">О нас</Link>
						</li>
						{user && (
							<li>
								<Link to="/favorites">Избранное</Link>
							</li>
						)}
					</ul>
					<ul className="auth">
						<li>
							<Link to="/upload">Загрузить</Link>
						</li>
						{user ? (
							<>
								<li>
									<span><Link to="/profile">{user.nickname || user.login}</Link></span>
								</li>
								<li>
									<button onClick={logout}>Выйти</button>
								</li>
							</>
						) : (
							<>
								<li>
									<button onClick={toggleAuthVisibility}>Войти</button>
								</li>
								<li>
									<button onClick={toggleRegVisibility}>Регистрация</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</header>
			<Authorization isVisible={isAuthVisible} onClose={toggleAuthVisibility} />
			<Registration isVisible={isRegVisible} onClose={toggleRegVisibility} />
		</>
	);
}
