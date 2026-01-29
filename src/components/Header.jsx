export default function Header({ accountInfo }) {
	return (
		<header className="header">
			<h1 className="header__title">🗳️ Blockchain Polling System</h1>
			<p className="header__subtitle">Decentralized voting powered by Ethereum</p>
			<div className="header__account-info">
				<strong>Connected Account:</strong>
				<span>{accountInfo}</span>
			</div>
		</header>
	);
}
