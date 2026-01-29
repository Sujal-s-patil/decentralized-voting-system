# Blockchain Polling System - Setup & Usage Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install web3
npm install
```

### 2. Update Smart Contract Details
Edit `src/utils/app.js` and update:
```javascript
const CONTRACT_ADDRESS = '0x...' // Your deployed contract address
const CONTRACT_ABI = [...] // Your contract's ABI
```

### 3. Run Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Application Flow

### Tab 1: Create Poll
- Enter a poll question
- Add 2-10 options
- Click "Create Poll"
- Confirm transaction in MetaMask
- Poll is created on the blockchain

### Tab 2: Vote in Poll
- Select a poll from dropdown
- Choose an option
- Click "Submit Vote"
- Confirm transaction in MetaMask
- Vote is recorded on blockchain (one vote per account)

### Tab 3: View Results
- Select a poll from dropdown
- See vote counts and percentages
- Results update in real-time

## File Overview

### Main Application
- **App.jsx** - Main component with tab management and Web3 initialization
- **App.css** - All styling (gradient background, cards, buttons, etc.)

### Components
- **Header.jsx** - Display title and wallet info
- **CreatePoll.jsx** - Form for creating polls
- **VotePoll.jsx** - Voting interface
- **ViewResults.jsx** - Results display

### Utilities
- **utils/app.js** - Web3 integration and blockchain functions

## Key Features

✅ Modern React with Hooks
✅ Web3.js integration
✅ MetaMask wallet connection
✅ Ethereum contract interaction
✅ Responsive design
✅ Error handling & user feedback
✅ Transaction status messages
✅ Double-vote prevention

## Environment Requirements

- Node.js 16+
- MetaMask browser extension
- Ganache or Ethereum testnet
- Modern web browser

## Troubleshooting

### "Please install MetaMask"
- Install MetaMask extension from chrome.google.com/webstore

### "Contract not found on current network"
- Ensure MetaMask is connected to Ganache (http://127.0.0.1:7545)
- Update CONTRACT_ADDRESS with deployed contract address

### "Invalid contract ABI"
- Copy the correct ABI from your contract compilation output
- Ensure the ABI matches your deployed contract

### Transaction fails
- Check gas limit (set to 3,000,000 for createPoll)
- Ensure account has sufficient balance
- Verify contract is deployed correctly

## Smart Contract Interface

The app expects the following contract functions:

```solidity
function createPoll(string memory _question, string[] memory _options) public returns (uint256)
function vote(uint256 _pollId, uint256 _optionIndex) public
function getPollDetails(uint256 _pollId) public view returns (...)
function getPollResults(uint256 _pollId) public view returns (uint256[])
function hasVoted(uint256 _pollId, address _voter) public view returns (bool)
function pollCount() public view returns (uint256)
```

## Development Notes

- All async operations have proper error handling
- User feedback through toast-like messages
- Component state management with React hooks
- Automatic polling list refresh
- Real-time vote count updates
