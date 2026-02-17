import { useState } from 'react';
import { useMessage } from '../hooks/useMessage';
import MessageDisplay from './common/MessageDisplay';
import './AdminLogin.css';

// Hardcoded credentials
const ADMIN_CREDENTIALS = {
	username: 'admin',
	password: 'admin123'
};

export default function AdminLogin({ onLoginSuccess }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { message, showMessage } = useMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Simulate authentication delay
		setTimeout(() => {
			if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
				showMessage('Login successful!', 'success');
				// Store admin status in sessionStorage
				sessionStorage.setItem('isAdmin', 'true');
				setTimeout(() => {
					onLoginSuccess();
				}, 500);
			} else {
				showMessage('Invalid username or password', 'error');
				setLoading(false);
			}
		}, 500);
	};

	return (
		<div className="admin-login-container">
			<div className="admin-login-card">
				<h2>Admin Login</h2>
				<MessageDisplay message={message} />
				
				<form onSubmit={handleSubmit} className="form">
					<div className="form-group">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter admin username"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter admin password"
							required
						/>
					</div>

					<button 
						type="submit" 
						className="btn btn--primary" 
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<div className="admin-hint">
					<small>Default credentials: admin / admin123</small>
				</div>
			</div>
		</div>
	);
}
