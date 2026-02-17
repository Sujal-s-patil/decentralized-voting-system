import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

/**
 * Application header with wallet info
 */
export default function Header({ accountInfo }) {
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
		</header>
	);
}
