import { useState } from 'react';
import { createPoll } from '../utils/app';
import MessageDisplay from './common/MessageDisplay';
import { useMessage } from '../hooks/useMessage';

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 10;

export default function CreatePoll() {
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const [loading, setLoading] = useState(false);
	const { message, showMessage } = useMessage();

	const handleAddOption = () => {
		if (options.length < MAX_OPTIONS) {
			setOptions([...options, '']);
		} else {
			showMessage(`Maximum ${MAX_OPTIONS} options allowed`, 'error');
		}
	};

	const handleRemoveOption = (index) => {
		if (options.length > MIN_OPTIONS) {
			setOptions(options.filter((_, i) => i !== index));
		} else {
			showMessage(`At least ${MIN_OPTIONS} options required`, 'error');
		}
	};

	/**
	 * Update a single option value
	 */
	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	/**
	 * Validate form before submission
	 */
	const validateForm = () => {
		if (!question.trim()) {
			showMessage('Please enter a question', 'error');
			return false;
		}

		const filteredOptions = options.map(o => o.trim()).filter(o => o !== '');
		if (filteredOptions.length < MIN_OPTIONS) {
			showMessage(`Please provide at least ${MIN_OPTIONS} options`, 'error');
			return false;
		}

		return true;
	};

	/**
	 * Submit poll to blockchain
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setLoading(true);
		showMessage('Creating poll... Please confirm the transaction in MetaMask', 'info');

		try {
			const filteredOptions = options.map(o => o.trim()).filter(o => o !== '');
			const pollId = await createPoll(question, filteredOptions);
			
			showMessage(`Poll created successfully! Poll ID: ${pollId}`, 'success');
			resetForm();
		} catch (error) {
			showMessage(`Error creating poll: ${error.message}`, 'error');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Reset form to initial state
	 */
	const resetForm = () => {
		setQuestion('');
		setOptions(['', '']);
	};

	return (
		<div className="content-section">
			<h2>Create New Poll</h2>
			<MessageDisplay message={message} />

			<form onSubmit={handleSubmit} className="form">
				<div className="form-group">
					<label htmlFor="question">Poll Question:</label>
					<textarea
						id="question"
						placeholder="What is your question?"
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						required
					/>
				</div>

				<div className="form-group">
					<label>Options:</label>
					<div className="options-container">
						{options.map((option, index) => (
							<div key={index} className="option-input">
								<input
									type="text"
									placeholder={`Option ${index + 1}`}
									value={option}
									onChange={(e) => handleOptionChange(index, e.target.value)}
									required
								/>
								{options.length > MIN_OPTIONS && (
									<button
										type="button"
										className="btn btn--remove"
										onClick={() => handleRemoveOption(index)}
										title="Remove option"
									>
										Remove
									</button>
								)}
							</div>
						))}
					</div>
					<button
						type="button"
						className="btn btn--secondary btn--add"
						onClick={handleAddOption}
					>
						+ Add Option
					</button>
				</div>

				<button type="submit" className="btn btn--primary" disabled={loading}>
					{loading ? 'Creating...' : 'Create Poll'}
				</button>
			</form>
		</div>
	);
}
