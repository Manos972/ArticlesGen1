import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import Breadcrumbs from "../Articles/Breadcrumbs";

const breadcrumbsLinks = [
	{label: 'Menu Principal', path: '/'},
	{label: 'Login', path: '/login'},
];
const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://backend:8000/login', {email, password});
			localStorage.setItem('token', response.data.token);
			setSuccess('Successfully logged in!');
			setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
		} catch (error: any) {
			setError('Invalid credentials. Please try again.');
		}
	};

	return (
		<div className="container mt-5">
			<Breadcrumbs links={breadcrumbsLinks}/>
			<h1>Login</h1>
			{success && <Alert variant="success">{success}</Alert>}
			{error && <Alert variant="danger">{error}</Alert>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Adresse e-mail</label>
					<input
						type="email"
						id="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						id="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;
