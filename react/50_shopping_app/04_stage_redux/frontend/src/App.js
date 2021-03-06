import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const appState = useSelector(state => state);
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(appState.login.loading) {
		messageArea = <h4>Loading...</h4>
	}
	let error = appState.shopping.error;
	if(appState.login.error) {
		error = appState.login.error;
	}
	if(error) {
		messageArea =<h4>{error}</h4>
	}
	let tempRender = <Routes>
			<Route exact path="/" element={
				<LoginPage/>
			}/>
			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
	if(appState.login.isLogged) {
		tempRender = <Routes>
				<Route exact path="/" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar />
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;
