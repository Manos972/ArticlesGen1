import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const API_URL = 'http://backend:8000';

const EditArticle: React.FC = () => {
	const {id} = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios.get(`${API_URL}/articles/${id}`)
			.then(response => {
				setTitle(response.data.title);
				setContent(response.data.content);
			})
			.catch(err => {
				console.error('Error fetching article:', err);
				setError('Could not fetch the article.');
			});
	}, [id]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await axios.put(`${API_URL}/articles/${id}`, {title, content});
			navigate('/articles');
		} catch (err) {
			console.error('Error updating article:', err);
			setError('Could not update the article.');
		}
	};

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="container mt-5">
			<h2>Edit Article</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="content">Content</label>
					<textarea
						id="content"
						className="form-control"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Save Changes</button>
			</form>
		</div>
	);
};

export default EditArticle;
