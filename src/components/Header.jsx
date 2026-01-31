import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * Application header with wallet info and theme toggle
 */
export default function Header({ accountInfo, theme, onThemeToggle }) {
	return (
		<header className="header">
			<h1 className="header__title">
				<HowToVoteIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
				<span>Blockchain Polling System</span>
			</h1>
			<p className="header__subtitle">Decentralized voting powered by Ethereum</p>
			<div className="header__account-info">
				<AccountBalanceWalletIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
				<strong> Connected Account:</strong>
				<span>{accountInfo}</span>
			</div>
			<button
				className="theme-toggle"
				onClick={onThemeToggle}
				title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
				aria-label="Toggle theme"
			>
				{theme === 'light' ? (
					<DarkModeIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
				) : (
					<LightModeIcon style={{ fontSize: '1em', verticalAlign: 'middle' }} />
				)}
			</button>
		</header>
	);
}
