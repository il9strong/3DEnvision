import './About.scss';

import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
	return (
		<main className="about">
			<div className="wrapper">
				<h2>About Our Website</h2>
				<p>
					Welcome to our platform! Here, you can explore a vast collection of 3D
					models across various categories, download models for your projects,
					and even upload your own creations to share with the community.
				</p>
				<h3>Features of Our Platform</h3>
				<ul>
					<li>
						<strong>Browse 3D Models:</strong> Discover models in categories
						such as humans, animals, architecture, and more.
					</li>
					<li>
						<strong>Download Models:</strong> Easily download 3D models to use
						in your personal or professional projects.
					</li>
					<li>
						<strong>Upload Your Creations:</strong> Share your own 3D models
						with the community by uploading them directly to our platform.
					</li>
				</ul>
				<h3>Why Choose Us?</h3>
				<p>
					We aim to provide a user-friendly platform for 3D enthusiasts,
					designers, and developers to find, download, and share high-quality 3D
					models. Whether you’re looking for inspiration or want to contribute
					to the community, our website is the perfect place for you.
				</p>
				<h3>Get Started</h3>
				<p>
					To begin, browse our <Link to="/catalog">catalog</Link>, or sign up to
					upload your own models.
				</p>
			</div>
		</main>
	);
}
