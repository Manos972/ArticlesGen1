import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ArticleList from './components/Articles/ArticleList';
import CreateArticle from './components/Articles/CreateArticle';
import {useAuth} from "./components/Auth/AuthContext";
import Home from "./components/Home/Home";
import EditArticle from './components/Articles/EditArticle';

const App: React.FC = () => {
	const {isAuthenticated, loading} = useAuth();

	if (loading) return <div>Loading...</div>;
	return (

		<Router>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/"/>}/>
				<Route path="/register" element={!isAuthenticated ? <Register/> : <Navigate to="/"/>}/>
				<Route path="/articles" element={<ArticleList/>}/>
				<Route path="/create-article" element={<CreateArticle/>}/>
				<Route path="/edit-article/:id" element={<EditArticle/>}/>
			</Routes>
		</Router>
	);
};

export default App;
