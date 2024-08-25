import React from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import './MainMenu.css'; // Importer le fichier CSS pour les styles personnalisés

const MainMenu: React.FC = () => {
	const {isAuthenticated, logout} = useAuth();

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav mx-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/articles">Articles</Link>
					</li>
					{isAuthenticated ? (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/create-article">Créer un article</Link>
							</li>
							<li className="nav-item">
								<button className="nav-link btn btn-link" onClick={logout}>Logout</button>
							</li>
						</>
					) : (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/login">Login</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/register">Register</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default MainMenu;
