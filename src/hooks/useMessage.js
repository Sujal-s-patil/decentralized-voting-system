import { useState } from 'react';

const MESSAGE_TIMEOUT = 5000;

/**
 * Custom hook for managing toast/alert messages
 * Automatically clears messages after a timeout
 */
export function useMessage() {
	const [message, setMessage] = useState({ text: '', type: '' });

	const showMessage = (text, type = 'info') => {
		setMessage({ text, type });
		setTimeout(() => setMessage({ text: '', type: '' }), MESSAGE_TIMEOUT);
	};

	const clearMessage = () => setMessage({ text: '', type: '' });

	return { message, showMessage, clearMessage };
}
