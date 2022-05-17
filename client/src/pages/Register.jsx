import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';

const Register = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/chat');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleValidation = () => {
		const { username, email, password, confirmPassword } = values;
		if (password !== confirmPassword) {
			return false;
		} else if (username.length < 2) {
			return false;
		} else if (!email.includes('@')) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { username, email, password } = values;
			const createdUser = await axios.post(registerRoute, {
				username,
				email,
				password,
			});
			if (createdUser.status === 200) {
				localStorage.setItem(
					'chat-app-user',
					JSON.stringify(createdUser.data.user)
				);
				navigate('/chat');
			}
		}
	};

	return (
		<div>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<div className="brand">
						<h1>Chat App</h1>
					</div>
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Create account</button>
					<span>
						Already have an account? <Link to="/login">Login</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer></ToastContainer>
		</div>
	);
};

const FormContainer = styled.div``;

export default Register;
