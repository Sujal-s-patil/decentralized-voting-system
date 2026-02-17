/**
 * Authentication utility functions for admin access control
 */

const ADMIN_CREDENTIALS = {
	username: 'admin',
	password: 'admin123'
};

/**
 * Check if user is authenticated as admin
 * @returns {boolean}
 */
export function isAuthenticated() {
	return sessionStorage.getItem('isAdmin') === 'true';
}

/**
 * Login admin user
 * @param {string} username
 * @param {string} password
 * @returns {boolean} Success status
 */
export function login(username, password) {
	if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
		sessionStorage.setItem('isAdmin', 'true');
		return true;
	}
	return false;
}

/**
 * Logout admin user
 */
export function logout() {
	sessionStorage.removeItem('isAdmin');
}
