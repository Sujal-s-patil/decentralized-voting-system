import { useState } from 'react';
import { createPoll } from '../utils/app';
import MessageDisplay from './common/MessageDisplay';
import { useMessage } from '../hooks/useMessage';

// Constants
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 10;
const MAX_DURATION_HOURS = 8760; // 1 year
const MIN_DURATION_HOURS = 1;

export default function CreatePoll() {
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const [durationInHours, setDurationInHours] = useState('');
	const [liveResults, setLiveResults] = useState(false);
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

		const duration = parseInt(durationInHours);
		if (!durationInHours || isNaN(duration) || duration < MIN_DURATION_HOURS) {
			showMessage(`Please enter a valid duration (at least ${MIN_DURATION_HOURS} hour)`, 'error');
			return false;
		}

		if (duration > MAX_DURATION_HOURS) {
			showMessage(`Duration cannot exceed ${MAX_DURATION_HOURS} hours (1 year)`, 'error');
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
			const duration = parseInt(durationInHours);
			const pollId = await createPoll(question, filteredOptions, duration, liveResults);
			
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
		setDurationInHours('');
		setLiveResults(false);
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
					<label htmlFor="duration">Voting Duration (in hours):</label>
					<input
						type="number"
						id="duration"
						placeholder="e.g., 24 for 1 day, 168 for 1 week"
						value={durationInHours}
						onChange={(e) => setDurationInHours(e.target.value)}
						min="1"
						max="8760"
						required
					/>
					<small className="form-hint">Maximum: 8760 hours (1 year)</small>
				</div>

				<div className="form-group">
					<label>
						<input
							type="checkbox"
							checked={liveResults}
							onChange={(e) => setLiveResults(e.target.checked)}
						/>
						<span style={{ marginLeft: '8px' }}>Enable Live Results</span>
					</label>
					<small className="form-hint">
						If enabled, voters can see results in real-time during voting. 
						If disabled, results will only be visible after voting ends.
					</small>
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
