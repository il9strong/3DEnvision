import './Footer.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import instagram from '@/assets/img/icon_instagram.svg';
import telegram from '@/assets/img/icon_telegram.svg';
import vk from '@/assets/img/icon_vk.svg';
import logo from '@/assets/img/logo_white.svg';

export default function Footer() {
	return (
		<footer>
			<div className="wrapper">
				<div className="navigation">
					<h4>Navigation</h4>
					<ul>
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
				</div>
				<div className="networks">
					<h4>Networks</h4>
					<div>
						<Link to='https://vk.com'><img src={vk} alt="vk" /></Link>
						<Link to='https://web.telegram.org'><img src={telegram} alt="telegram" /></Link>
						<Link to='https://www.instagram.com'><img src={instagram} alt="instagram" /></Link>
					</div>
				</div>
				<div className="footerLogo">
					<img src={logo} alt="logo" />
				</div>
				<div className="contacts">
					<h4>Contacts</h4>
					<p>email@mail.com</p>
				</div>
				<div className="copyright">
					<h4>Copyright</h4>
					<p>&copy; Ilya and Vlad, 2024-2025</p>
				</div>
			</div>
		</footer>
	);
}
