# Blockchain Voting System — Complete End-to-End Documentation

**Version:** 1.0  
**Last Updated:** January 31, 2026  
**Status:** Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Why Use This System](#why-use-this-system)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [System Architecture](#system-architecture)
6. [Prerequisites & Requirements](#prerequisites--requirements)
7. [Quick Start Guide](#quick-start-guide)
8. [Detailed Setup Instructions](#detailed-setup-instructions)
9. [Configuration](#configuration)
10. [Project Structure](#project-structure)
11. [Component Documentation](#component-documentation)
12. [Smart Contract Details](#smart-contract-details)
13. [Usage Guide](#usage-guide)
14. [Troubleshooting](#troubleshooting)
15. [Development Workflow](#development-workflow)
16. [Deployment Guide](#deployment-guide)

---

## Project Overview

### What Is This Project?

The **Blockchain Voting System** is a decentralized voting application built on Ethereum. It provides a secure, transparent, and tamper‑evident platform for creating polls and collecting votes.

The application combines:
- **React** for the user interface
- **Web3.js** for blockchain interactions
- **Solidity smart contracts** for vote storage and rules
- **Ganache** for local blockchain testing

### Purpose

This system enables:
- **Secure voting**: Votes are immutably recorded on-chain
- **Transparency**: Anyone can verify results
- **Decentralization**: No central authority controls outcomes
- **Fraud prevention**: Duplicate voting is prevented by contract logic
- **Pseudonymity**: Voters are identified by Ethereum address
- **Accessibility**: Web UI for any modern browser

### Use Cases

1. **Corporate Decision Making**: Board votes, shareholder decisions
2. **Community Governance**: DAO (Decentralized Autonomous Organization) voting
3. **Academic Research**: Secure survey and poll collection
4. **Democratic Processes**: Government elections with blockchain transparency
5. **Entertainment**: Transparent award voting systems
6. **Organizational Decisions**: Team polls and consensus building

---

## Why Use This System

### Advantages Over Traditional Voting Systems

| Feature | Traditional | Blockchain System |
|---------|-------------|-------------------|
| **Transparency** | Limited | Complete (all votes on-chain) |
| **Fraud Prevention** | Moderate | Cryptographically Secure |
| **Accessibility** | Limited (physical/centralized) | Global (any internet) |
| **Cost** | High (infrastructure) | Low (automated smart contracts) |
| **Verification** | Third-party dependent | Self-verifiable |
| **Speed** | Slow (counting takes time) | Instant (automated) |
| **Audit Trail** | Limited | Complete immutable history |
| **Double Voting** | Possible (requires monitoring) | Impossible (enforced by code) |

### Key Advantages

- **Immutable records**: Once recorded on-chain, votes cannot be altered
# Complete Guide (Setup, Run, and Developer Operations)

Last updated: 2026-03-06

This guide documents how to run and work on the current codebase.

## 1) Prerequisites

- Node.js (16+)
- npm
- MetaMask browser extension
- Ganache (CLI or desktop)

Quick checks:

```bash
node -v
npm -v
```

## 2) Installation

```bash
npm install
```

Installed dependencies include React, Vite, Web3, Truffle, Ganache, and lint tooling.

## 3) Local Setup

### Option A: Step-by-step (recommended)

1. Start local chain (Ganache):

```bash
npx ganache
```

2. Compile contract:

```bash
npm run compile
```

3. Deploy contract:

```bash
npm run migrate
```

4. Write frontend env file:

```bash
node scripts/extractAddress.js
```

5. Start frontend:

```bash
npm run dev
```

### Option B: One command

```bash
npm run setup
```

`setup.sh` runs compile → migrate --reset → extract address → dev server.

## 4) Environment Variables

Required `.env` entry:

```env
VITE_CONTRACT_ADDRESS=0xYourPollingContractAddress
```

Notes:
- `.env` is git-ignored.
- `scripts/extractAddress.js` writes this automatically based on latest Truffle artifact network deployment.

## 5) MetaMask and Network Configuration

Current frontend network assumptions in `src/utils/app.js`:
- accepted chain id: `0x539` (1337)
- RPC used for add/switch: `http://127.0.0.1:7545`

Current Truffle development network in `contract/truffle-config.js`:
- host: `127.0.0.1`
- port: `8545`

If your Ganache instance uses a different port/chain id, align Ganache/Truffle/MetaMask/frontend settings so they target the same network.

## 6) Running the Application

With Ganache and frontend running, open the Vite URL shown in terminal (usually `http://localhost:5173`).

On first load:
- MetaMask account access is requested.
- Contract code existence is checked at `VITE_CONTRACT_ADDRESS`.

## 7) User Workflows

### Admin login
- Click `Admin` in top-right.
- Current credentials: `admin` / `admin123`.
- Successful login stores `isAdmin=true` in `sessionStorage`.

### Create poll
- Available in admin mode.
- Enter question, 2–10 options, duration (1–8760 hours), optional live-results toggle.
- Confirm transaction in MetaMask.

### Vote
- Select poll, choose one option, submit transaction.
- Prevented if already voted or voting period has ended.

### View results
- If poll ended: final results.
- If poll active + live enabled: live results.
- If poll active + live disabled: informative waiting message.

## 8) Developer Commands

```bash
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # lint JS/JSX

npm run compile  # truffle compile
npm run migrate  # truffle migrate
npm run reset    # truffle migrate --reset
npm run setup    # full setup script
```

## 9) API and Data Model References

- Smart contract API + frontend service surface: [API_REFERENCE.md](./API_REFERENCE.md)
- System architecture and sequence diagrams: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 10) Troubleshooting

### MetaMask not detected
- Ensure extension is installed/enabled in browser.

### `VITE_CONTRACT_ADDRESS` not configured
- Re-run `npm run migrate` then `node scripts/extractAddress.js`.

### Contract not found on current network
- Verify MetaMask is connected to same chain where contract was deployed.

### Transactions fail for voting
- Likely causes: already voted, voting ended, invalid option index.

### Setup interrupted (`Exit Code: 130`)
- Exit code 130 indicates process interrupted (Ctrl+C).
- Re-run steps manually or restart `npm run setup` and let it complete.

## 11) Known Constraints for Developers

- No automated tests in repository currently.
- No backend/API server; all persistent data is on-chain.
- Admin controls are UI-only and not enforced by smart contract roles.

# Step 3: In another terminal, compile the contract
npm run compile

# Step 4: Deploy the contract
npm run migrate

# Step 5: Start the development server
npm run dev
```

Open your browser to `http://localhost:5173`

### Subsequent Sessions (2 minutes)

```bash
# Step 1: Start Ganache
npx ganache

# Step 2: In another terminal, reset and run
npm run reset

# Step 3: Start development server
npm run dev
```

---

## Detailed Setup Instructions

### Step 1: Install Node.js and npm

#### Windows
1. Download from https://nodejs.org/
2. Run the installer
3. Follow the installation wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### Step 2: Clone or Extract Project

```bash
# If cloning from Git
git clone <repository-url>
cd "voting system based on blockchain"

# Or extract if downloaded as ZIP
# Then navigate to the project folder
```

### Step 3: Install Project Dependencies

```bash
# Install all npm packages
npm install

# Verify installation
npm list
```

Expected packages:
- react 19.2.0
- web3 4.16.0
- vite 7.2.4
- truffle 5.11.5
- ganache 7.9.2

### Step 4: Set Up MetaMask

1. **Install MetaMask Extension**
   - Open Chrome/Firefox/Edge
   - Search "MetaMask" in extension store
   - Click "Add to Chrome" (or your browser)
   - Create wallet or import existing one

2. **Connect MetaMask to Ganache**
   - Click MetaMask icon
   - Click Network dropdown
   - Select "Add Network"
   - Fill in:
     - Network Name: Ganache
     - RPC URL: http://127.0.0.1:7545
     - Chain ID: 1337
     - Currency: ETH
   - Click Save

3. **Import Ganache Account**
   - Start Ganache (see next step)
   - Copy first account's private key
   - In MetaMask: Import Account → paste private key
   - Account now shows Ganache funds

### Step 5: Start Ganache

In first terminal:
```bash
npx ganache
```

Output should show:
```
Ganache started successfully
Listening on 127.0.0.1:7545
10 accounts with 100 ETH each
```

### Step 6: Deploy Smart Contract

In second terminal:
```bash
# Compile the contract
npm run compile

# Deploy to Ganache
npm run migrate
```

Output should show deployment details:
```
Deploying 'Polling'
   > contract address:    0x123...
   > transaction hash:    0x456...
```

**Note the contract address** - needed for configuration.

### Step 7: Configure the Application

 Create a `.env` file in the project root:
   ```
   VITE_CONTRACT_ADDRESS=<paste-your-contract-address>
   ```



### Step 8: Start Development Server

In third terminal:
```bash
npm run dev
```

Output should show:
```
  VITE v7.2.4 ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 9: Open Application

1. Open browser to `http://localhost:5173`
2. MetaMask popup should appear
3. Click "Connect" to authorize application
4. Application loads with your account info

---

## Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Smart Contract Address (from truffle migration output)
VITE_CONTRACT_ADDRESS=0x123456789abcdef...

# Optional: For production/testnet deployment
VITE_INFURA_PROJECT_ID=your_infura_id
VITE_NETWORK=ganache  # or 'sepolia', 'mainnet'
```

### Smart Contract Configuration

Edit `contract/truffle-config.js`:

```javascript
// Ganache connection
development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "*"
}

// Sepolia Testnet (for testing)
sepolia: {
  provider: () => new HDWalletProvider(
    MNEMONIC,
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
  ),
  network_id: 11155111
}
```

### Application Configuration

In `src/utils/app.js`:

```javascript
// Ganache configuration
const GANACHE_CHAIN_IDS = ["0x539"]; // 1337 in hex

// Contract details
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ABI = [...]; // Already configured
```

### Gas Settings

For transactions, adjust gas limits in component functions:

```javascript
// Default: 3,000,000 for createPoll
// Adjust if running out of gas:
const gasLimit = web3.utils.toHex(3000000);
```

---

## Project Structure

```
voting system based on blockchain/
│
├── 📄 package.json                 # Dependencies and npm scripts
├── 📄 package-lock.json            # Lock file for exact versions
├── 📄 vite.config.js              # Vite build configuration
├── 📄 eslint.config.js            # ESLint rules for code quality
├── 📄 index.html                  # HTML entry point
├── 📄 README.md                   # Project overview
├── 📄 .env                        # Environment variables (CONTRACT_ADDRESS)
├── 📄 .gitignore                  # Git ignore rules
│
├── 📂 src/                        # React application source
│   ├── 📄 main.jsx               # React app entry point
│   ├── 📄 App.jsx                # Root component with routing
│   ├── 📄 App.css                # Main application styles
│   ├── 📄 index.css              # Global CSS styles and variables
│   ├── 📄 index.html             # Additional HTML template
│   │
│   ├── 📂 components/            # React components
│   │   ├── 📄 Header.jsx         # Header with wallet info and theme
│   │   ├── 📄 CreatePoll.jsx     # Poll creation form (148 lines)
│   │   ├── 📄 VotePoll.jsx       # Voting interface
│   │   ├── 📄 ViewResults.jsx    # Results display with charts
│   │   │
│   │   └── 📂 common/            # Reusable UI components
│   │       ├── 📄 MessageDisplay.jsx   # Toast/alert messages
│   │       ├── 📄 PollSelector.jsx     # Poll dropdown selector
│   │       ├── 📄 ResultsChart.jsx     # Vote results visualization
│   │       └── 📄 README.md            # Component documentation
│   │
│   ├── 📂 constants/             # Application constants
│   │   └── 📄 tabs.js            # Tab definitions with MUI icons
│   │
│   ├── 📂 hooks/                 # Custom React hooks
│   │   └── 📄 useMessage.js      # Message state management hook
│   │
│   └── 📂 utils/                 # Utility functions
│       ├── 📄 app.js             # Web3 integration (517 lines)
│       └── 📄 README.md          # Utils documentation
│
├── 📂 contract/                  # Smart contract workspace
│   ├── 📄 truffle-config.js      # Truffle framework configuration
│   │
│   ├── 📂 contracts/             # Solidity source files
│   │   └── 📄 Polling.sol        # Main voting contract (81 lines)
│   │
│   ├── 📂 migrations/            # Truffle deployment scripts
│   │   └── 📄 1_deploy_contracts.js  # Polling contract deployment
│   │
│   └── 📂 build/                 # Compiled contract artifacts
│       └── 📂 contracts/
│           └── 📄 Polling.json   # ABI, bytecode, networks
│
├── 📂 Documentation/             # Project documentation
│   ├── 📄 COMPLETE_GUIDE.md     # THIS FILE - Complete guide
│   ├── 📄 ARCHITECTURE.md       # Technical architecture details
│   ├── 📄 SETUP.md              # Setup instructions
│   ├── 📄 PROJECT_DOCUMENTATION.md  # Overall documentation
│   └── 📂 images/               # Documentation images
│
├── 📂 Photos/                   # Project screenshots
│   ├── create.png
│   ├── vote.png
│   └── result.png
│
├── 📂 public/                   # Static public assets
│   └── (vite.svg, etc.)
│
├── 📂 dist/                     # Production build output
│   └── (Generated by 'npm run build')
│
└── 📂 node_modules/             # npm dependencies (not in git)
    └── (Third-party packages)
```

### Key Directories Explained

**`src/`** - Contains all React application code
- `components/` - UI components organized by feature
- `components/common/` - Reusable shared components
- `constants/` - Configuration and constant values
- `hooks/` - Custom React hooks for state management
- `utils/` - Helper functions, especially Web3 integration

**`contract/`** - Smart contract development environment
- `contracts/` - Solidity source code
- `migrations/` - Deployment scripts
- `build/` - Compiled contracts (generated)

**`Documentation/`** - Complete project documentation
- Setup guides, architecture docs, and implementation notes

---

## Component Documentation

### App.jsx (Main Component)

**Purpose**: Central hub managing app state and tab navigation

**Props**: None (root component)

**State**:
```javascript
activeTab = 'create'    // Current tab: 'create', 'vote', 'results'
accountInfo = ''        // Connected Ethereum account
loading = true          // Initialization state
error = ''             // Error message
```

**Features**:
- Web3 initialization on mount
- Tab switching
- Account info display
- Error handling

**Usage**:
```jsx
import App from './App'

// In main.jsx or index
root.render(<App />)
```

### Header.jsx

**Purpose**: Display application title and account information

**Props**:
```javascript
accountInfo: string  // Wallet address
```

**Features**:
- Displays connected account
- Shows network info
- Professional styling

**Usage**:
```jsx
<Header accountInfo={accountInfo} />
```

### CreatePoll.jsx

**Purpose**: Form for creating new polls

**Props**:
```javascript
onMessage: function    // Callback for messages
```

**State**:
```javascript
question: string       // Poll question
options: string[]      // Answer options (2-10)
message: object        // Status/error message
loading: boolean       // Submit loading state
```

**Features**:
- Dynamic option management
- Form validation
- Transaction feedback

**Usage**:
```jsx
<CreatePoll onMessage={(msg) => handleMessage(msg)} />
```

### VotePoll.jsx

**Purpose**: Interface for voting in existing polls

**Props**:
```javascript
onMessage: function    // Callback for messages
```

**State**:
```javascript
polls: object[]        // Available polls
selectedPollId: string // Selected poll
selectedOption: string // Selected vote option
message: object        // Status/error message
loading: boolean       // Submit loading state
```

**Features**:
- Poll selection
- Double-vote prevention
- Vote submission
- Real-time status

**Usage**:
```jsx
<VotePoll onMessage={(msg) => handleMessage(msg)} />
```

### ViewResults.jsx

**Purpose**: Display voting results with charts

**Props**:
```javascript
onMessage: function    // Callback for messages
```

**State**:
```javascript
polls: object[]        // Available polls
selectedPollId: string // Selected poll
results: object        // Poll results
message: object        // Status/error message
loading: boolean       // Fetch loading state
```

**Features**:
- Poll selection
- Results display
- Visual charts
- Real-time updates

**Usage**:
```jsx
<ViewResults onMessage={(msg) => handleMessage(msg)} />
```

### MessageDisplay.jsx (Reusable)

**Purpose**: Display status, error, or success messages

**Props**:
```javascript
message: object = null  // Message object: { type, text, timeout }
onClear: function      // Callback when message clears
```

**Message Types**:
```javascript
{
  type: 'success',     // 'success', 'error', 'info', 'warning'
  text: 'Operation completed',
  timeout: 5000        // Auto-clear after 5 seconds
}
```

**Usage**:
```jsx
<MessageDisplay 
  message={message} 
  onClear={() => setMessage(null)} 
/>
```

### PollSelector.jsx (Reusable)

**Purpose**: Dropdown for selecting polls

**Props**:
```javascript
polls: object[]        // Available polls
selectedPollId: string // Currently selected poll
onSelect: function     // Callback on selection
loading: boolean       // Loading state
```

**Features**:
- Poll list display
- Selection handling
- Loading indicator

**Usage**:
```jsx
<PollSelector 
  polls={polls} 
  selectedPollId={selectedId}
  onSelect={(id) => handleSelect(id)}
  loading={loading}
/>
```

### ResultsChart.jsx (Reusable)

**Purpose**: Visualize voting results

**Props**:
```javascript
options: string[]      // Poll options
results: number[]      // Vote counts
totalVotes: number     // Total votes cast
```

**Features**:
- Bar chart visualization
- Percentage calculation
- Responsive design

**Usage**:
```jsx
<ResultsChart 
  options={options} 
  results={results}
  totalVotes={totalVotes}
/>
```

---

## Smart Contract Details

### Polling.sol

**Location**: `contract/contracts/Polling.sol`  
**Purpose**: Manage decentralized polls and votes on Ethereum blockchain  
**Language**: Solidity ^0.8.19  
**License**: MIT  
**Size**: 81 lines of code

### Contract Overview

The Polling contract is a fully decentralized voting system that ensures:
- **Immutable vote storage** on blockchain
- **One vote per address** enforcement
- **Transparent results** accessible to anyone
- **Event-driven architecture** for off-chain monitoring

### Data Structures

```solidity
struct Poll {
    uint256 id;                              // Unique poll identifier
    string question;                         // Poll question text
    string[] options;                        // Array of answer options
    mapping(uint256 => uint256) votes;       // optionIndex → vote count
    mapping(address => bool) hasVoted;       // voter address → voted status
    address creator;                         // Address that created poll
    uint256 createdAt;                       // Block timestamp of creation
    bool isActive;                           // Poll active status (currently always true)
}
```

**Note**: The Poll struct contains nested mappings, which is why it cannot be returned directly from functions. Separate getter functions are provided for different data.

### State Variables

```solidity
mapping(uint256 => Poll) public polls;       // pollId → Poll struct
uint256 public pollCount;                    // Total number of polls created
```

- `polls`: Main storage mapping for all polls
- `pollCount`: Auto-increments to provide unique poll IDs (0, 1, 2, ...)

### Events

```solidity
event PollCreated(
    uint256 indexed pollId,    // Indexed for filtering
    string question,           // Poll question
    address indexed creator    // Indexed for filtering by creator
);

event Voted(
    uint256 indexed pollId,    // Indexed for filtering by poll
    uint256 optionIndex,       // The option that was voted for
    address indexed voter      // Indexed for filtering by voter
);
```

**Events Usage**: These events allow the frontend to listen for real-time updates and maintain a local cache of polls without repeatedly querying the blockchain.

### Functions

#### createPoll()
```solidity
function createPoll(string memory _question, string[] memory _options) 
    public returns (uint256)
```
- **Purpose**: Create a new poll and add it to the blockchain
- **Access**: Public (anyone can create a poll)
- **Parameters**:
  - `_question`: Poll question (string, must not be empty)
  - `_options`: Array of answer options (string[], must have 2-10 items)
- **Returns**: `uint256` - The newly created poll's ID
- **Validation** (with require statements):
  - `require(_options.length >= 2, "Poll must have at least 2 options")`
  - `require(_options.length <= 10, "Poll cannot have more than 10 options")`
  - `require(bytes(_question).length > 0, "Question cannot be empty")`
- **Process**:
  1. Increments `pollCount` to generate new ID
  2. Creates new Poll in storage
  3. Sets poll properties (id, question, options, creator, timestamp)
  4. Sets `isActive` to true
  5. Emits `PollCreated` event
- **Emits**: `PollCreated(pollId, question, msg.sender)`
- **Gas Cost**: ~200,000-300,000 gas (depends on question and options length)

#### vote()
```solidity
function vote(uint256 _pollId, uint256 _optionIndex) public
```
- **Purpose**: Cast a vote in an existing poll
- **Access**: Public (anyone can vote)
- **Parameters**:
  - `_pollId`: ID of the poll to vote in (uint256)
  - `_optionIndex`: Index of the chosen option (uint256, 0-based)
- **Validation** (with require statements):
  - `require(_pollId < pollCount, "Poll does not exist")`
  - `require(poll.isActive, "Poll is not active")`
  - `require(!poll.hasVoted[msg.sender], "You have already voted")`
  - `require(_optionIndex < poll.options.length, "Invalid option")`
- **Process**:
  1. Retrieves poll from storage
  2. Validates all requirements
  3. Increments vote count for selected option
  4. Marks msg.sender as having voted
  5. Emits Voted event
- **Emits**: `Voted(pollId, optionIndex, msg.sender)`
- **Security**: 
  - Double voting prevented by `hasVoted` mapping
  - Once voted, address cannot vote again in same poll
  - No way to change or remove a vote
- **Gas Cost**: ~50,000-70,000 gas

#### getPollDetails()
```solidity
function getPollDetails(uint256 _pollId) 
    public view returns (
        string memory question,
        string[] memory options,
        uint256 createdAt,
        bool isActive,
        address creator
    )
```
- **Purpose**: Retrieve poll metadata (not vote counts)
- **Access**: Public view (read-only, no gas cost when called externally)
- **Parameters**: `_pollId` - Poll ID to query
- **Returns** (tuple):
  - `question`: Poll question text
  - `options`: Array of all option strings
  - `createdAt`: Unix timestamp when poll was created
  - `isActive`: Whether poll is active (currently always true)
  - `creator`: Ethereum address that created the poll
- **Validation**: `require(_pollId < pollCount, "Poll does not exist")`
- **Use Case**: Frontend uses this to display poll information before voting

#### getPollResults()
```solidity
function getPollResults(uint256 _pollId) 
    public view returns (uint256[] memory)
```
- **Purpose**: Get vote counts for all options in a poll
- **Access**: Public view (read-only, no gas cost when called externally)
- **Parameters**: `_pollId` - Poll ID to get results for
- **Returns**: Array of vote counts, where index corresponds to option index
  - Example: `[5, 12, 3]` means option 0 has 5 votes, option 1 has 12, option 2 has 3
- **Validation**: `require(_pollId < pollCount, "Poll does not exist")`
- **Process**:
  1. Creates memory array with length = number of options
  2. Loops through all options and retrieves vote count from mapping
  3. Returns complete results array
- **Use Case**: Frontend uses this to display vote results and calculate percentages

#### hasVoted()
```solidity
function hasVoted(uint256 _pollId, address _voter) 
    public view returns (bool)
```
- **Purpose**: Check if a specific address has already voted in a poll
- **Access**: Public view (read-only, no gas cost when called externally)
- **Parameters**:
  - `_pollId`: Poll ID to check
  - `_voter`: Ethereum address to check voting status for
- **Returns**: `true` if address has voted, `false` if not
- **Validation**: `require(_pollId < pollCount, "Poll does not exist")`
- **Use Case**: 
  - Frontend checks this before allowing user to vote
  - Prevents showing vote interface to users who already voted
  - Can check voting status of any address (not just current user)

### Contract Limitations

1. **No poll deletion**: Once created, polls exist forever on-chain
2. **No vote changes**: Votes are immutable and cannot be changed
3. **No poll closing**: Currently all polls remain active (isActive always true)
4. **No voter anonymity**: All votes are linked to Ethereum addresses
5. **Gas costs**: Creating polls and voting requires gas fees

---

## Usage Guide

### Creating a Poll

1. **Open Application**: Navigate to http://localhost:5173
2. **Go to Create Poll Tab**: Click "Create Poll" tab
3. **Enter Question**: Type your poll question
4. **Add Options**:
   - Type first option
   - Click "Add Option" to add more (minimum 2, maximum 10)
   - Click "Remove" to delete an option
5. **Verify Details**: Ensure question and all options are filled
6. **Click Submit**: Button triggers transaction
7. **MetaMask Confirmation**: A popup appears asking to confirm
8. **Pay Gas Fee**: Review and confirm transaction
9. **Success**: Receive confirmation message with poll ID

### Voting in a Poll

1. **Go to Vote Tab**: Click "Vote in Poll" tab
2. **Select Poll**: Choose poll from dropdown
3. **View Options**: See all available options for selected poll
4. **Check Vote Status**: System checks if you've already voted
   - If yes: Displays message "You already voted"
   - If no: Shows radio buttons to select option
5. **Select Option**: Click radio button for your choice
6. **Submit Vote**: Click "Submit Vote" button
7. **MetaMask Confirmation**: Confirm transaction in popup
8. **Vote Recorded**: Message confirms vote is on blockchain

### Viewing Results

1. **Go to Results Tab**: Click "View Results" tab
2. **Select Poll**: Choose poll from dropdown
3. **View Statistics**:
   - Vote count for each option
   - Percentage for each option
   - Visual bar chart
   - Total votes
4. **Real-Time Updates**: Results refresh automatically

### Checking Vote History

1. **Smart Contract**: Read-only view via Ganache
2. **Blockchain Explorer**: Use Etherscan (for public networks)
3. **Transaction History**: View in MetaMask

---

## Troubleshooting

### Common Issues and Solutions

#### 1. "Please Install MetaMask"
**Problem**: Application shows MetaMask not installed
**Solution**:
```
1. Visit: https://metamask.io/
2. Click "Download"
3. Install extension for your browser
4. Create or import wallet
5. Reload application page
```

#### 2. "Contract Not Found on Current Network"
**Problem**: Application can't find the smart contract
**Solution**:
```
1. Verify Ganache is running: npx ganache
2. Check contract address in .env file
3. Ensure MetaMask connected to Ganache (127.0.0.1:7545)
4. Redeploy contract: npm run reset
5. Update contract address in configuration
```

#### 3. "Invalid Contract ABI"
**Problem**: Smart contract ABI doesn't match deployed contract
**Solution**:
```
1. Recompile contract: npm run compile
2. Redeploy: npm run migrate
3. Copy new ABI from build/contracts/Polling.json
4. Update CONTRACT_ABI in src/utils/app.js
```

#### 4. "Transaction Fails - Out of Gas"
**Problem**: Transaction runs out of gas during execution
**Solution**:
```
// In CreatePoll.jsx or VotePoll.jsx
// Increase gas limit
const gasLimit = web3.utils.toHex(4000000); // Up from 3000000

// Or check if:
1. Account has sufficient ETH (Ganache should provide plenty)
2. Gas price is reasonable
3. No complex operations causing high gas
```

#### 5. "MetaMask Keeps Asking to Connect"
**Problem**: MetaMask connection not persisting
**Solution**:
```
1. Check if app has permission:
   - MetaMask icon > Settings > Permissions
   - Find application URL
   - Click remove, then reconnect
2. Check browser console for errors
3. Clear browser cache and cookies
4. Restart browser and MetaMask
```

#### 6. "Can't See My Accounts in MetaMask"
**Problem**: Ganache accounts not showing in MetaMask
**Solution**:
```
1. In MetaMask, click account circle (top right)
2. Select "Import Account"
3. In Ganache, copy first account's private key
4. Paste in MetaMask import dialog
5. Account should appear with test ETH
```

#### 7. "Application Shows Blank Screen"
**Problem**: React components not rendering
**Solution**:
```
1. Check browser console for errors (F12)
2. Verify npm run dev is running
3. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
4. Check if Ganache is running
5. Clear browser cache
6. Check terminal output for build errors
```

#### 8. "Poll Options Not Showing"
**Problem**: Can't see options when selecting poll
**Solution**:
```
1. Ensure poll was created successfully
2. Wait a moment for blockchain confirmation
3. Try selecting different poll
4. Refresh page after creating poll
5. Check contract has correct options array
```

#### 9. "Vote Already Cast Message When Haven't Voted"
**Problem**: Can't vote in poll (already voted message)
**Solution**:
```
1. Check if using different Ganache accounts
2. Try different poll
3. Create new poll and vote there
4. Reset blockchain: npm run reset
5. Check contract hasVoted mapping (debug)
```

#### 10. "Port 5173 Already in Use"
**Problem**: Development server won't start
**Solution**:
```bash
# Option 1: Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3000

# Option 3: Restart computer
```

### Debug Mode

Enable debug logging:

```javascript
// In src/utils/app.js
const DEBUG = true; // Set to true

// Then check console for detailed logs
console.log('[DEBUG]', message)
```

### Getting Help

1. **Check Documentation**: See relevant section
2. **Review Console Errors**: Browser F12 → Console tab
3. **Check Terminal Output**: Where you ran `npm run dev`
4. **Verify Setup**: Confirm all prerequisites installed
5. **Test Ganache**: Run `npx ganache` and check output

---

## Development Workflow

### Development Environment Setup

```bash
# 1. Install all dependencies
npm install

# 2. Start code editor (if not already open)
code .

# 3. In Terminal 1: Start Ganache
npx ganache

# 4. In Terminal 2: Deploy contract
npm run compile
npm run migrate

# 5. In Terminal 3: Start dev server
npm run dev
```

### Creating New Components

1. **Create Component File**:
   ```bash
   touch src/components/YourComponent.jsx
   ```

2. **Component Template**:
   ```jsx
   import { useState, useEffect } from 'react';
   
   export default function YourComponent({ props }) {
     const [state, setState] = useState(null);
     
     useEffect(() => {
       // Component initialization
     }, []);
     
     return (
       <div className="your-component">
         {/* Component JSX */}
       </div>
     );
   }
   ```

3. **Import in App.jsx**:
   ```jsx
   import YourComponent from './components/YourComponent';
   ```

4. **Add to Appropriate Tab**:
   ```jsx
   {activeTab === 'your-tab' && (
     <YourComponent />
   )}
   ```

### Modifying Smart Contract

1. **Edit Contract**:
   ```bash
   vim contract/contracts/Polling.sol
   ```

2. **Recompile**:
   ```bash
   npm run compile
   ```

3. **Redeploy**:
   ```bash
   npm run reset
   ```

4. **Update ABI in App**:
   - Copy new ABI from `contract/build/contracts/Polling.json`
   - Update in `src/utils/app.js`

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

### Building for Production

```bash
# Create optimized build
npm run build

# Output goes to dist/
# Deploy dist/ folder to hosting service
```

---

## Deployment Guide

### Local Testing (Current Setup)

- **Network**: Ganache (127.0.0.1:7545)
- **Contracts**: Deployed locally
- **Access**: http://localhost:5173

### Testnet Deployment (Sepolia)

1. **Setup Environment Variables**:
   ```env
   VITE_NETWORK=sepolia
   VITE_INFURA_PROJECT_ID=your_infura_key
   ```

2. **Configure Truffle for Sepolia**:
   ```javascript
   // truffle-config.js
   sepolia: {
     provider: () => new HDWalletProvider(
       process.env.MNEMONIC,
       `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
     ),
     network_id: 11155111,
     gas: 5500000,
     gasPrice: 20000000000
   }
   ```

3. **Deploy Contract**:
   ```bash
   npm run compile
   truffle migrate --network sepolia
   ```

4. **Update Contract Address**:
   ```env
   VITE_CONTRACT_ADDRESS=0x...sepolia_address...
   ```

### Mainnet Deployment (Production)

⚠️ **WARNING**: Use mainnet with caution. All transactions cost real ETH.

1. **Review Code**: Audit all smart contract code
2. **External Audit**: Have contract audited by security professionals
3. **Test Extensively**: Use testnet for all testing
4. **Prepare Deployment**:
   ```bash
   npm run build
   ```

5. **Deploy Contract**:
   ```bash
   truffle migrate --network mainnet
   ```

6. **Verify Contract**: Use Etherscan contract verification
7. **Launch Frontend**: Deploy dist/ to hosting service

### Hosting Options

| Provider | Cost | Setup |
|----------|------|-------|
| **Vercel** | Free | Git push |
| **Netlify** | Free | Git push |
| **AWS** | Varies | Manual |
| **GitHub Pages** | Free | Git push |

### Environment Setup for Deployment

Create `.env.production`:
```env
VITE_NETWORK=mainnet
VITE_CONTRACT_ADDRESS=0x...mainnet_address...
VITE_INFURA_PROJECT_ID=your_production_key
NODE_ENV=production
```

---

## Additional Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [Web3.js Docs](https://docs.web3js.org)
- [Solidity Docs](https://docs.soliditylang.org)
- [Truffle Suite Docs](https://trufflesuite.com/docs)
- [MetaMask Docs](https://docs.metamask.io)

### Learning Resources
- **Ethereum Development**: https://ethereum.org/en/developers/docs/
- **Smart Contracts**: https://ethereum.org/en/developers/docs/smart-contracts/
- **Web3.js Tutorial**: https://www.web3js.org/
- **React Hooks**: https://react.dev/reference/react/hooks

### Community & Support
- **Ethereum Stack Exchange**: https://ethereum.stackexchange.com
- **Stack Overflow**: Tag `ethereum` or `web3js`
- **Truffle Community**: https://trufflesuite.com/community/
- **Solidity Forum**: https://forum.soliditylang.org

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Complete end-to-end documentation |
| 0.5 | 2026-01-27 | Enterprise refactoring complete |
| 0.4 | 2026-01-20 | Component restructuring |
| 0.3 | 2026-01-15 | Web3 integration |
| 0.2 | 2026-01-10 | Initial setup |
| 0.1 | 2026-01-01 | Project initialization |

---

## Quick Checklist

Before deployment, verify:

- [ ] All dependencies installed: `npm install`
- [ ] Smart contract compiles: `npm run compile`
- [ ] Contract deploys: `npm run migrate`
- [ ] Development server starts: `npm run dev`
- [ ] MetaMask installed and connected
- [ ] Ganache running with correct settings
- [ ] Contract address updated in configuration
- [ ] Can create polls successfully
- [ ] Can vote in polls successfully
- [ ] Can view results
- [ ] No console errors (F12)
- [ ] Responsive design works on mobile
- [ ] All features tested

---

## Contact & Support

For issues or questions:

1. **Check Documentation**: See relevant sections above
2. **Review Troubleshooting**: Solution to common problems
3. **Check Code Comments**: Inline documentation in source
4. **Debug Console**: Browser F12 for error messages
5. **Check Ganache Output**: Terminal logs for blockchain issues

---

**Last Updated**: January 31, 2026  
**Status**: Complete  
**Version**: 1.0
