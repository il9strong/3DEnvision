import './Header.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/img/logo.svg';
import Authorization from '@/components/Authorization/Authorization';
import Registration from '@/components/Registration/Registration';

export default function Header() {
	const [isAuthVisible, setAuthVisible] = useState(false);
	const [isRegVisible, setRegVisible] = useState(false);

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
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/catalog">Catalog</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/favorites">Favorites</Link>
						</li>
					</ul>
					<ul className="auth">
						<li>
							<Link to="/upload">Upload</Link>
						</li>
						<li>
							<button onClick={toggleAuthVisibility}>Login</button>
						</li>
						<li>
							<button onClick={toggleRegVisibility}>Sign Up</button>
						</li>
					</ul>
				</div>
			</header>
			<Authorization isVisible={isAuthVisible} onClose={toggleAuthVisibility} />
			<Registration isVisible={isRegVisible} onClose={toggleRegVisibility} />
		</>
	);
}
