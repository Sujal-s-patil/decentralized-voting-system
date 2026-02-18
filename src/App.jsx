import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CreatePoll from './components/CreatePoll';
import VotePoll from './components/VotePoll';
import ViewResults from './components/ViewResults';
import AdminLogin from './components/AdminLogin';
import MessageDisplay from './components/common/MessageDisplay';
import { initWeb3 } from './utils/app';
import { TABS, TAB_CONFIG } from './constants/tabs';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {
	const [activeTab, setActiveTab] = useState(TABS.VOTE); // Default to Vote for public users
	const [accountInfo, setAccountInfo] = useState('Connect your wallet to get started');
	const [loading, setLoading] = useState(true);
	const [theme, setTheme] = useState('light');
	const [isAdmin, setIsAdmin] = useState(false);
	const [showAdminLogin, setShowAdminLogin] = useState(false);

	// Check admin status on mount
	useEffect(() => {
		const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
		setIsAdmin(adminStatus);
		if (adminStatus) {
			setActiveTab(TABS.CREATE);
		}
	}, []);

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
					? newAccounts[0] 
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

	const handleAdminLogin = () => {
		setShowAdminLogin(true);
	};

	const handleLoginSuccess = () => {
		setIsAdmin(true);
		setShowAdminLogin(false);
		setActiveTab(TABS.CREATE);
	};

	const handleLogout = () => {
		sessionStorage.removeItem('isAdmin');
		setIsAdmin(false);
		setActiveTab(TABS.VOTE);
	};

	/**
	 * Filter tabs based on admin status
	 */
	const getAvailableTabs = () => {
		if (isAdmin) {
			// Admin only sees Create Poll tab
			return TAB_CONFIG.filter(tab => tab.id === TABS.CREATE);
		}
		// Public users see Vote and Results tabs
		return TAB_CONFIG.filter(tab => tab.id !== TABS.CREATE);
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

		if (showAdminLogin) {
			return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
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
		<>
			{/* Theme toggle and Admin/Logout button at top right */}
			<div className="admin-button-container">
				<button
					className="theme-toggle"
					onClick={handleThemeToggle}
					title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
					aria-label="Toggle theme"
				>
					{theme === 'light' ? (
						<DarkModeIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
					) : (
						<LightModeIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
					)}
				</button>
				{!isAdmin ? (
					<button
						onClick={handleAdminLogin}
						className="btn btn--admin"
						title="Admin Login"
					>
						<AdminPanelSettingsIcon style={{ fontSize: '1.2em', marginRight: '4px', verticalAlign: 'middle' }} />
						Admin
					</button>
				) : (
					<button
						onClick={handleLogout}
						className="btn btn--logout"
						title="Logout"
					>
						<LogoutIcon style={{ fontSize: '1.2em', marginRight: '4px', verticalAlign: 'middle' }} />
						Logout
					</button>
				)}
			</div>

			<div className="container">
				<Header 
					accountInfo={accountInfo}
				/>

			<MessageDisplay
				message={{ text: '', type: '' }}
				placement="top-right"
			/>

			{!showAdminLogin && (
				<div className="tabs">
					{getAvailableTabs().map(({ id, label, icon: IconComponent }) => (
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
			)}

			{renderTabContent()}
			</div>
		</>
	);
}

export default App;
