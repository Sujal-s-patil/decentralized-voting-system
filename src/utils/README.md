# Utility Functions

## app.js

Web3 integration and blockchain interaction utilities.

### Initialization
- `initWeb3()` - Initialize MetaMask connection and contract
- `getWeb3()` - Get Web3 instance
- `getContract()` - Get contract instance
- `getAccounts()` - Get connected accounts
- `getCurrentAccount()` - Get current account address

### Poll Operations
- `createPoll(question, options)` - Create a new poll
- `getAllPolls()` - Fetch all polls from blockchain
- `getPollDetails(pollId)` - Get specific poll details

### Voting Operations
- `hasVoted(pollId, voterAddress)` - Check if user has voted
- `submitVote(pollId, optionIndex)` - Submit a vote

### Results Operations
- `getPollResults(pollId)` - Get poll results with vote counts and percentages

### Error Handling
All functions throw descriptive errors for proper React component error handling.
