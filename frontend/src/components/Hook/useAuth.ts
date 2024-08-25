// src/hooks/useAuth.ts
import {useState, useEffect} from 'react';
import axios from 'axios';

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Vérifiez si le token est présent
		const token = localStorage.getItem('token');
		if (token) {
			axios.get('http://localhost:8000/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
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
			console.error('Login error:', error);
		}
	};

	const logout = () => {
		axios.post('http://localhost:8000/logout', {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}).then(() => {
			localStorage.removeItem('token');
			setIsAuthenticated(false);
		}).catch((error) => {
			console.error('Logout error:', error);
		});
	};

	return {isAuthenticated, loading, login, logout};
};

export default useAuth;
