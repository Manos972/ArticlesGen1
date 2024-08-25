import React, {useState} from 'react';
import axios from 'axios';
import Breadcrumbs from "./Breadcrumbs";

const CreateArticle = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [success, setSuccess] = useState('');
	const [error, setError] = useState<string | null>(null);
	const breadcrumbsLinks = [
		{label: 'Menu Principal', path: '/'},
		{label: 'Créer un Article', path: '/articles/create'},
	];
	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		// Récupérer le token CSRF
		const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
		const csrfToken = csrfTokenMeta?.getAttribute('content');
		console.log("CSRF Token:", csrfToken);

		if (!csrfToken) {
			setError('CSRF token not found');
			return;
		}

		try {
			const response = await axios.post('http://localhost:8000/articles', {
				title,
				content,
			}, {
				headers: {
					'X-CSRF-TOKEN': csrfToken,
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 201) {
				setSuccess('Article créé avec succès!');
				setTitle('');
				setContent('');
			}
		} catch (e) {
			console.error('Erreur lors de la création de l’article:', e);
		}

	};

	return (
		<div className="container mt-5">
			<Breadcrumbs links={breadcrumbsLinks}/>
			<h1>Créer un Nouvel Article</h1>
			{success && <div className="alert alert-success">{success}</div>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Titre</label>
					<input
						type="text"
						className="form-control"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="content">Contenu</label>
					<textarea
						className="form-control"
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Créer</button>
			</form>
		</div>
	);
};

export default CreateArticle;
