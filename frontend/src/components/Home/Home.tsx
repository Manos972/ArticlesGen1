import React from 'react';
import MainMenu from "../Menu/MainMenu";

const Home: React.FC = () => {
	return (
		<div className="d-flex flex-column min-vh-100">
			{/* Menu Principal */}
			<div className="container mt-5">
				<MainMenu/>
			</div>
			{/* Card de Présentation */}
			<div className="container mt-5">
				<div className="card mb-4">
					<div className="card-body">
						<h2 className="card-title">Bienvenue sur mon application Laravel API / React.js</h2>
						<p className="card-text">
							Cette application est un projet démontrant l'intégration d'une API Laravel avec un frontend
							React.js. Explorez les articles, créez les vôtres et profitez de l'expérience !
						</p>
					</div>
				</div>
			</div>
			{/* Section Vidéo centrée */}
			<div className="container flex-grow-1 d-flex justify-content-center align-items-center">
				<div className="embed-responsive embed-responsive-16by9" style={{width: '100%'}}>
					<iframe
						className="embed-responsive-item"
						src="https://www.youtube.com/embed/votre-video-id"
						allowFullScreen
						title="Présentation"
					/>
				</div>
			</div>

			{/* Footer poussé vers le bas */}
			<footer className="mt-auto text-center py-3 bg-light">
				<div className="container">
					<p>&copy; 2024 Mon Application Laravel API / React.js</p>
				</div>
			</footer>
		</div>
	);
};

export default Home;
