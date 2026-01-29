import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import ViewResults from './components/ViewResults';
import MessageDisplay from './components/common/MessageDisplay';
import { initWeb3 } from './utils/app';

const TABS = {
	CREATE: 'create',
	VOTE: 'vote',
	RESULTS: 'results',
};

function App() {
	const [activeTab, setActiveTab] = useState(TABS.CREATE);
	const [accountInfo, setAccountInfo] = useState('Connect your wallet to get started');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		// Load theme preference from localStorage
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);
		
		initializeWeb3();
		setupAccountChangeListener();

		return () => {
			if (typeof window.ethereum !== 'undefined') {
				window.ethereum.removeAllListeners('accountsChanged');
			}
		};
	}, []);

	const initializeWeb3 = async () => {
		try {
			const result = await initWeb3();
			setAccountInfo(`Connected Account: ${result.accounts[0]}`);
			setError('');
		} catch (err) {
			setError(err.message);
			setAccountInfo('Please install MetaMask to use this application');
		} finally {
			setLoading(false);
		}
	};

	const setupAccountChangeListener = () => {
		if (typeof window.ethereum === 'undefined') return;

		window.ethereum.on('accountsChanged', (newAccounts) => {
			if (newAccounts.length > 0) {
				setAccountInfo(`Connected Account: ${newAccounts[0]}`);
			} else {
				setAccountInfo('Wallet disconnected');
			}
		});
	};

	const handleThemeToggle = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const renderTabContent = () => {
		if (loading) {
			return <div className="content-section active"><div className="loading">Initializing Web3...</div></div>;
		}

		switch (activeTab) {
			case TABS.CREATE:
				return <CreatePoll />;
			case TABS.VOTE:
				return <VotePoll />;
			case TABS.RESULTS:
				return <ViewResults />;
			default:
				return null;
		}
	};

	return (
		<div className="container">
			<Header accountInfo={accountInfo} theme={theme} onThemeToggle={handleThemeToggle} />

			<MessageDisplay
				message={error ? { text: error, type: 'error' } : { text: '', type: '' }}
				placement="top-right"
			/>

			<div className="tabs">
				{Object.values(TABS).map((tab) => (
					<button
						key={tab}
						className={`tab-button ${activeTab === tab ? 'active' : ''}`}
						onClick={() => setActiveTab(tab)}
					>
						{getTabLabel(tab)}
					</button>
				))}
			</div>

			{renderTabContent()}
		</div>
	);
}

function getTabLabel(tab) {
	const labels = {
		[TABS.CREATE]: '📝 Create Poll',
		[TABS.VOTE]: '✅ Vote in Poll',
		[TABS.RESULTS]: '📊 View Results',
	};
	return labels[tab];
}

export default App;
