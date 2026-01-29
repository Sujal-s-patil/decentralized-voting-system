import { createPortal } from 'react-dom';

const PLACEMENTS = {
	'bottom-right': ['bottom', 'right'],
	'bottom-left': ['bottom', 'left'],
	'bottom-center': ['bottom', 'center'],
	'top-right': ['top', 'right'],
	'top-left': ['top', 'left'],
	'top-center': ['top', 'center'],
};

export default function MessageDisplay({ message, placement = 'bottom-right' }) {
	if (!message?.text) return null;

	const [vertical, horizontal] = PLACEMENTS[placement] || PLACEMENTS['bottom-right'];
	const toast = (
		<div
			className={`toast-container toast-container--${vertical} toast-container--${horizontal}`}
			role="status"
			aria-live={message.type === 'error' ? 'assertive' : 'polite'}
		>
			<div className={`toast message message--${message.type || 'info'}`}>
				{message.text}
			</div>
		</div>
	);

	return createPortal(toast, document.body);
}
