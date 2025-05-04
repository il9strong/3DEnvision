import React from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
			<ScrollToTopButton />
		</>
	);
};

export default Layout;
