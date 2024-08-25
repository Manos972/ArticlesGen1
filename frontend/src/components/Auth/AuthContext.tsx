// src/components/AuthContext.tsx
import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import axios from 'axios';

interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.get('http://localhost:8000/user', {
				headers: {Authorization: `Bearer ${token}`},
			})
				.then(() => setIsAuthenticated(true))
				.catch(() => setIsAuthenticated(false))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post('http://localhost:8000/login', {email, password});
			localStorage.setItem('token', response.data.token);
			setIsAuthenticated(true);
		} catch (error) {
			throw new Error('Échec de la connexion');
		}
	};

	const logout = () => {
		axios.post('http://localhost:8000/logout', {}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
		}).then(() => {
			localStorage.removeItem('token');
			setIsAuthenticated(false);
		}).catch((error) => {
			console.error('Erreur lors de la déconnexion:', error);
		});
	};

	return (
		<AuthContext.Provider value={{isAuthenticated, loading, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
