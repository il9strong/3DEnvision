// src/context/AuthContext.tsx
import axios from 'axios';
import React, { createContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
	id: number;
	login: string;
	email?: string;
	nickname?: string;
	role: 'Admin' | 'User';
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	login: (login: string, password: string) => Promise<boolean>;
	logout: () => void;
	checkAuth: () => Promise<void>;
	isAdmin: () => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token')
	);

	const login = async (login: string, password: string): Promise<boolean> => {
		try {
			const response = await axios.post('http://localhost:3001/auth/login', {
				login,
				password,
			});
			const receivedToken = response.data.token;
			localStorage.setItem('token', receivedToken);
			setToken(receivedToken);

			await checkAuth();
			return true;
		} catch (err) {
			console.error('Login failed:', err);
			return false;
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		navigate('/');
	};

	const checkAuth = async () => {
		const savedToken = localStorage.getItem('token');
		if (!savedToken) return;

		try {
			const response = await axios.get('http://localhost:3001/auth/me', {
				headers: { Authorization: `Bearer ${savedToken}` },
			});
			console.log('User data:', response.data);
			setUser(response.data);
		} catch (err) {
			console.error('Token check failed:', err);
			logout();
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	const isAdmin = (): boolean => {
		return user?.role === 'Admin';
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, checkAuth, isAdmin }}>
			{children}
		</AuthContext.Provider>
	);
};
