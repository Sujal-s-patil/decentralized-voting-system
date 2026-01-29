export default function Header({ accountInfo, theme, onThemeToggle }) {
	return (
		<header className="header">
			<h1 className="header__title">
				<span>🗳️</span>
				<span>Blockchain Polling System</span>
			</h1>
			<p className="header__subtitle">Decentralized voting powered by Ethereum</p>
			<div className="header__account-info">
				<span>👛</span>
				<strong>Connected Account:</strong>
				<span>{accountInfo}</span>
			</div>
			<button
				className="theme-toggle"
				onClick={onThemeToggle}
				title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
			>
				{theme === 'light' ? '🌙' : '☀️'}
			</button>
		</header>
	);
}
