import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Modal} from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import useAuth from "../Hook/useAuth";

interface Article {
	id: number;
	title: string;
	content: string;
}

const API_URL = 'http://backend:8000';

const ArticleList: React.FC = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const {isAuthenticated} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${API_URL}/articles`)
			.then(response => setArticles(response.data))
			.catch(err => {
				setError('Failed to fetch articles.');
				console.error('Error fetching articles:', err);
			});
	}, []);

	const deleteArticle = async (id: number) => {
		try {
			await axios.delete(`${API_URL}/articles/${id}`);
			setArticles(articles.filter(article => article.id !== id));
			setSuccess('Article deleted successfully!');
		} catch (err) {
			setError('Could not delete the article.');
			console.error('Error deleting article:', err);
		}
	};

	const editArticle = (id: number) => {
		navigate(`/edit-article/${id}`);
	};

	const handleReadMore = (article: Article) => {
		setSelectedArticle(article);
		setShowModal(true);
	};

	const truncateContent = (content: string, maxLength: number) => {
		return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
	};

	return (<div className="container mt-5">
			<Breadcrumbs links={[{label: 'Menu Principal', path: '/'}, {label: 'Articles', path: '/articles'},]}/>
			<h2>Articles</h2>
			{success && <Alert variant="success">{success}</Alert>}
			{error && <Alert variant="danger">{error}</Alert>}
			<div className="row">
				{articles.map((article: Article) => (<div key={article.id} className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h5 className="card-title">{article.title}</h5>
								<p className="card-text">
									{truncateContent(article.content, 15)}
								</p>
							</div>
							<div className="card-footer">
								<Button onClick={() => handleReadMore(article)} className="btn btn-primary mr-2">
									Read More
								</Button>
								{isAuthenticated && (<>

										<Button onClick={() => editArticle(article.id)} className="btn btn-warning mr-2">
											Edit
										</Button>
										<Button onClick={() => deleteArticle(article.id)} className="btn btn-danger">
											Delete
										</Button>
									</>)}
							</div>
						</div>
					</div>))}
			</div>

			{selectedArticle && (<Modal show={showModal} onHide={() => setShowModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>{selectedArticle.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{selectedArticle.content}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowModal(false)}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>)}
		</div>);
};

export default ArticleList;
