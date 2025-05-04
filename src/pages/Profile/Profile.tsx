import './Profile.scss';

import React, { useState } from 'react';

import ModelCard from '@/components/ModelCard/ModelCard';
import { models, users } from '@/temporaryDataBase/dataBase';

export default function Profile() {
	const [isEditing, setIsEditing] = useState(false);
	const [userData, setUserData] = useState(users[0]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setUserData((prev) => ({ ...prev, [id]: value }));
	};

	const toggleEditMode = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<main className="profile">
			<div className="wrapper">
				<h2>My profile</h2>
				<div className="profileFields">
					<label htmlFor="nickname">
						Nickname:
						<input
							type="text"
							id="nickname"
							value={userData.nickname}
							readOnly={!isEditing}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="email">
						Email:
						<input
							type="text"
							id="email"
							value={userData.email}
							readOnly={!isEditing}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="login">
						Login:
						<input
							type="text"
							id="login"
							value={userData.login}
							readOnly={!isEditing}
							onChange={handleChange}
						/>
					</label>
					<button onClick={toggleEditMode}>{isEditing ? 'Save' : 'Edit'}</button>
				</div>
				<div className="modelsList">
					{models.map((model) => (
						<ModelCard
							key={model.id}
							id={model.id}
							modelName={model.modelName}
							modelAuthor={model.modelAuthor}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
