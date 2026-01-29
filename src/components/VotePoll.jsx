import { useState, useEffect } from 'react';
import { getAllPolls, hasVoted, submitVote } from '../utils/app';
import MessageDisplay from './common/MessageDisplay';
import PollSelector from './common/PollSelector';

export default function VotePoll() {
	const [polls, setPolls] = useState([]);
	const [selectedPollId, setSelectedPollId] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [message, setMessage] = useState({ text: '', type: '' });
	const [loading, setLoading] = useState(false);
	const [alreadyVoted, setAlreadyVoted] = useState(false);

	useEffect(() => {
		loadPolls();
	}, []);

	const loadPolls = async () => {
		try {
			const pollsData = await getAllPolls();
			setPolls(pollsData);
		} catch (error) {
			showMessage(`Error loading polls: ${error.message}`, 'error');
		}
	};

	const handlePollSelect = async (pollId) => {
		setSelectedPollId(pollId);
		setSelectedOption('');
		setAlreadyVoted(false);
		setMessage({ text: '', type: '' });

		if (!pollId) return;

		try {
			const voted = await hasVoted(parseInt(pollId));
			if (voted) {
				setAlreadyVoted(true);
				showMessage('You have already voted in this poll', 'info');
			}
		} catch (error) {
			showMessage(`Error checking vote status: ${error.message}`, 'error');
		}
	};

	const handleSubmitVote = async (e) => {
		e.preventDefault();

		if (!selectedPollId || selectedOption === '') {
			showMessage('Please select a poll and an option', 'error');
			return;
		}

		setLoading(true);
		showMessage('Submitting vote... Please confirm the transaction in MetaMask', 'info');

		try {
			await submitVote(parseInt(selectedPollId), parseInt(selectedOption));
			showMessage('Vote submitted successfully!', 'success');
			setSelectedPollId('');
			setSelectedOption('');
			setAlreadyVoted(true);
		} catch (error) {
			showMessage(`Error submitting vote: ${error.message}`, 'error');
		} finally {
			setLoading(false);
		}
	};

	const showMessage = (text, type) => {
		setMessage({ text, type });
		setTimeout(() => setMessage({ text: '', type: '' }), 5000);
	};

	const selectedPoll = polls.find(p => p.id === parseInt(selectedPollId));

	return (
		<div className="content-section">
			<h2>Vote in Poll</h2>
			<MessageDisplay message={message} />

			<PollSelector
				polls={polls}
				selectedPollId={selectedPollId}
				onPollSelect={handlePollSelect}
			/>

			{selectedPoll && !alreadyVoted && (
				<form onSubmit={handleSubmitVote} className="form">
					<div className="poll-card">
						<h3>{selectedPoll.question}</h3>
						<div className="poll-options">
							{selectedPoll.options.map((option, index) => (
								<div key={index} className="poll-option">
									<input
										type="radio"
										name="option"
										value={index}
										id={`option-${index}`}
										checked={selectedOption === String(index)}
										onChange={(e) => setSelectedOption(e.target.value)}
									/>
									<label htmlFor={`option-${index}`}>{option}</label>
								</div>
							))}
						</div>
						<button type="submit" className="btn btn--primary" disabled={loading}>
							{loading ? 'Submitting...' : 'Submit Vote'}
						</button>
					</div>
				</form>
			)}

			{selectedPoll && alreadyVoted && (
				<div className="poll-card">
					<div className="message message--info">You have already voted in this poll.</div>
				</div>
			)}
		</div>
	);
}

