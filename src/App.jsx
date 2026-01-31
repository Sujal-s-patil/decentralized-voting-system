import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import ViewResults from './components/ViewResults';
import MessageDisplay from './components/common/MessageDisplay';
import { initWeb3 } from './utils/app';
import { TABS, TAB_CONFIG } from './constants/tabs';

function App() {
	const [activeTab, setActiveTab] = useState(TABS.CREATE);
	const [accountInfo, setAccountInfo] = useState('Connect your wallet to get started');
	const [loading, setLoading] = useState(true);
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

	/**
	 * Initialize Web3 and connect to Ethereum wallet
	 */
	const initializeWeb3 = async () => {
		try {
			const result = await initWeb3();
			setAccountInfo(result.accounts[0]);
		} catch {
			setAccountInfo('Please install MetaMask to use this application');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Listen for account changes in MetaMask
	 */
	const setupAccountChangeListener = () => {
		if (typeof window.ethereum === 'undefined') return;

		window.ethereum.on('accountsChanged', (newAccounts) => {
			setAccountInfo(
				newAccounts.length > 0 
					? `Connected Account: ${newAccounts[0]}` 
					: 'Wallet disconnected'
			);
		});
	};

	const handleThemeToggle = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	/**
	 * Render the active tab's content
	 */
	const renderTabContent = () => {
		if (loading) {
			return (
				<div className="content-section active">
					<div className="loading">Initializing Web3...</div>
				</div>
			);
		}

		const contentComponents = {
			[TABS.CREATE]: CreatePoll,
			[TABS.VOTE]: VotePoll,
			[TABS.RESULTS]: ViewResults,
		};

		const Component = contentComponents[activeTab];
		return Component ? <Component /> : null;
	};

	return (
		<div className="container">
			<Header accountInfo={accountInfo} theme={theme} onThemeToggle={handleThemeToggle} />

			<MessageDisplay
				message={{ text: '', type: '' }}
				placement="top-right"
			/>

			<div className="tabs">
				{TAB_CONFIG.map(({ id, label, icon: IconComponent }) => (
					<button
						key={id}
						className={`tab-button ${activeTab === id ? 'active' : ''}`}
						onClick={() => setActiveTab(id)}
						title={label}
					>
						<IconComponent style={{ fontSize: '1em', verticalAlign: 'middle', marginRight: '8px' }} />
						{label}
					</button>
				))}
			</div>

			{renderTabContent()}
		</div>
	);
}

export default App;
