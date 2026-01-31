import { createPortal } from 'react-dom';

// Toast positioning configurations
const PLACEMENTS = {
	'bottom-right': ['bottom', 'right'],
	'bottom-left': ['bottom', 'left'],
	'bottom-center': ['bottom', 'center'],
	'top-right': ['top', 'right'],
	'top-left': ['top', 'left'],
	'top-center': ['top', 'center'],
};

/**
 * Toast message display component using portal
 * Renders messages in fixed positions without affecting DOM flow
 */
export default function MessageDisplay({ message, placement = 'bottom-right' }) {
	if (!message?.text) return null;

	const [vertical, horizontal] = PLACEMENTS[placement] || PLACEMENTS['bottom-right'];
	const toast = (
		<div
			className={`toast-container toast-container--${vertical} toast-container--${horizontal}`}
			role="status"
			aria-live={message.type === 'error' ? 'assertive' : 'polite'}
			aria-atomic="true"
		>
			<div className={`toast message message--${message.type || 'info'}`}>
				{message.text}
			</div>
		</div>
	);

	return createPortal(toast, document.body);
}
