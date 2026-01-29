# Blockchain Polling System - React Integration

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Global styles
├── main.jsx               # React entry point
├── index.css              # Global CSS
├── utils/
│   └── app.js            # Web3 utility functions (blockchain integration)
└── components/
    ├── Header.jsx        # Header component
    ├── CreatePoll.jsx    # Create poll form component
    ├── VotePoll.jsx      # Voting component
    └── ViewResults.jsx   # Results display component
```

## Features

### Core Components

1. **Header Component**
   - Displays application title
   - Shows connected wallet account
   - Network information

2. **CreatePoll Component**
   - Create new polls with questions and options
   - Add/remove options (2-10 options)
   - Form validation
   - Transaction status messages

3. **VotePoll Component**
   - Select from available polls
   - Vote on poll options
   - Prevents double voting
   - Vote submission with MetaMask confirmation

4. **ViewResults Component**
   - Display poll results
   - Show vote counts and percentages
   - Visual progress bars for each option

### Utility Functions (app.js)

The `utils/app.js` file contains all Web3 integration functions:

- `initWeb3()` - Initialize MetaMask connection
- `getWeb3()` - Get Web3 instance
- `getContract()` - Get contract instance
- `getAccounts()` - Get connected accounts
- `getCurrentAccount()` - Get current connected account
- `createPoll(question, options)` - Create a new poll
- `getAllPolls()` - Fetch all polls
- `getPollDetails(pollId)` - Get details for a specific poll
- `hasVoted(pollId, voterAddress)` - Check if user voted
- `submitVote(pollId, optionIndex)` - Submit a vote
- `getPollResults(pollId)` - Get poll results with percentages

## Styling

The application uses a modern gradient design with:
- Purple gradient background (#667eea to #764ba2)
- Clean white cards with shadow effects
- Responsive design for mobile devices
- Smooth animations and transitions
- Color-coded messages (success, error, info)

## Installation & Setup

1. Install dependencies:
```bash
npm install web3
```

2. Update the contract address and ABI in `src/utils/app.js`:
```javascript
const CONTRACT_ADDRESS = '0x...'; // Your deployed contract address
const CONTRACT_ABI = [...]; // Your contract's ABI
```

3. Run the development server:
```bash
npm run dev
```

## How to Use

1. **Connect Wallet**: The app automatically connects to MetaMask on load
2. **Create Poll**: Go to "Create Poll" tab, enter question and options
3. **Vote**: Go to "Vote in Poll" tab, select a poll and vote
4. **View Results**: Go to "View Results" tab to see poll results

## Requirements

- MetaMask browser extension
- Ganache or Ethereum testnet for testing
- Web3 connection (configured in contract utility)

## Error Handling

All functions throw descriptive errors that are caught and displayed to users:
- Wallet connection errors
- Transaction failures
- Contract interaction errors
- Validation errors

## State Management

Components use React hooks:
- `useState` for local component state
- `useEffect` for side effects (loading polls, initialization)
- Error and message states for user feedback

## Browser Compatibility

- Requires a Web3-compatible browser (with MetaMask)
- Responsive design works on all screen sizes
