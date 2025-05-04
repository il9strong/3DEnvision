import './ScrollToTopButton.scss';

import React, { useEffect, useState } from 'react';

import scrollToTopImg from '@/assets/img/scroll-to-top.svg';

const ScrollToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
		});
	};

	return (
		<button
			onClick={scrollToTop}
			className={`scrollToTopButton ${isVisible ? 'show' : ''}`}
		>
			<img src={scrollToTopImg} alt="scroll to top" />
		</button>
	);
};

export default ScrollToTopButton;
