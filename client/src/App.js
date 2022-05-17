import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
