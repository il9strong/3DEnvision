import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { AuthProvider } from '@/context/AuthContext';
import About from '@/pages/About/About';
import Catalog from '@/pages/Catalog/Catalog';
import Favorites from '@/pages/Favorites/Favorites';
import FullModel from '@/pages/FullModel/FullModel';
import Home from '@/pages/Home/Home';
import Profile from '@/pages/Profile/Profile';
import Upload from '@/pages/Upload/Upload';
import WrongPage from '@/pages/WrongPage/WrongPage';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ScrollToTop />
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Home />
							</Layout>
						}
					/>
					<Route
						path="/catalog"
						element={
							<Layout>
								<Catalog />
							</Layout>
						}
					/>
					<Route
						path="/favorites"
						element={
							<Layout>
								<Favorites />
							</Layout>
						}
					/>
					<Route
						path="/model/:id"
						element={
							<Layout>
								<FullModel />
							</Layout>
						}
					/>
					<Route
						path="/upload"
						element={
							<Layout>
								<Upload />
							</Layout>
						}
					/>
					<Route
						path="/profile"
						element={
							<Layout>
								<Profile />
							</Layout>
						}
					/>
					<Route
						path="/about"
						element={
							<Layout>
								<About />
							</Layout>
						}
					/>
					<Route
						path="/*"
						element={
							<Layout>
								<WrongPage />
							</Layout>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
