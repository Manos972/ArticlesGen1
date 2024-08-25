import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import Breadcrumbs from "../Articles/Breadcrumbs";

const breadcrumbsLinks = [
	{label: 'Menu Principal', path: '/'},
	{label: 'Register', path: '/register'},
];
const Register: React.FC = () => {
	const [pseudo, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [password_confirmation, setPasswordConfirmation] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await axios.post('http://backend:8000/register', {pseudo, email, password, password_confirmation});
			setSuccess('Registration successful! Redirecting...');
			setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
		} catch (error: any) {
			setError('Registration failed. Please try again.');
		}
	};

	return (
		<div className="container mt-5">
			<Breadcrumbs links={breadcrumbsLinks} />
			<h1>Register</h1>
			{success && <Alert variant="success">{success}</Alert>}
			{error && <Alert variant="danger">{error}</Alert>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="pseudo">Pseudo</label>
					<input
						type="text"
						id="pseudo"
						name="pseudo"
						className="form-control"
						value={pseudo}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
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
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password_confirmation">Confirm Password</label>
					<input
						type="password"
						id="password_confirmation"
						className="form-control"
						value={password_confirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Register</button>
			</form>
		</div>
	);
};

export default Register;
