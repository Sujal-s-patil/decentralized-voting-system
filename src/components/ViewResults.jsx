import { useState, useEffect, useCallback } from 'react';
import { getAllPolls, getPollResults } from '../utils/app';
import MessageDisplay from './common/MessageDisplay';
import PollSelector from './common/PollSelector';
import ResultsChart from './common/ResultsChart';
import { useMessage } from '../hooks/useMessage';

export default function ViewResults() {
	const [polls, setPolls] = useState([]);
	const [selectedPollId, setSelectedPollId] = useState('');
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(false);
	const { message, showMessage } = useMessage();

	/**
	 * Load all available polls from blockchain
	 */
	const loadPolls = useCallback(async () => {
		try {
			const pollsData = await getAllPolls();
			setPolls(pollsData);
		} catch (error) {
			showMessage(`Error loading polls: ${error.message}`, 'error');
		}
	}, [showMessage]);

	useEffect(() => {
		loadPolls();
	}, [loadPolls]);

	/**
	 * Handle poll selection and load results
	 */
	const handlePollSelect = async (pollId) => {
		if (!pollId) {
			setSelectedPollId('');
			setResults(null);
			return;
		}

		setSelectedPollId(pollId);
		setLoading(true);

		try {
			const pollResults = await getPollResults(parseInt(pollId));
			setResults(pollResults);
		} catch (error) {
			showMessage(`Error loading results: ${error.message}`, 'error');
			setResults(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="content-section">
			<h2>Poll Results</h2>
			<MessageDisplay message={message} />

			<PollSelector
				polls={polls}
				selectedPollId={selectedPollId}
				onPollSelect={handlePollSelect}
			/>

			{loading && <div className="loading">Loading results...</div>}

			{results && <ResultsChart results={results} />}

			{!loading && selectedPollId && !results && (
				<div className="empty-state">No results available for this poll.</div>
			)}
		</div>
	);
}

