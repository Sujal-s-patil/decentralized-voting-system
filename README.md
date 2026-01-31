# 🗳️ Blockchain Voting System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![Solidity Version](https://img.shields.io/badge/Solidity-0.8.19-blue)](https://soliditylang.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-4.16.0-orange)](https://web3js.readthedocs.io/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)](https://vitejs.dev)

A decentralized voting system built on blockchain technology, enabling transparent and tamper-proof democratic polling through smart contracts and a modern web interface.

**[Live Demo](#-quick-start) • [Documentation](./Documentation) • [Architecture](./Documentation/ARCHITECTURE.md) • [Contributing](#-contributing)**

---

## ✨ Features

| Feature | Description | Technology |
|---------|-------------|-----------|
| **Decentralized Voting** | Create and participate in polls secured by Ethereum smart contracts | Solidity 0.8.19 |
| **Real-time Results** | View live poll results with vote aggregation | Web3.js 4.16.0 |
| **Wallet Integration** | Seamless MetaMask authentication and account management | MetaMask Extension |
| **Poll Management** | Create polls with 2-10 options, vote once per address | Smart Contract |
| **Responsive UI** | Modern Material Design interface with dark mode support | React 19.2.0, MUI 7.3.7 |
| **Fast Development** | Lightning-fast HMR and optimized build process | Vite 7.2.4 |
| **Multi-Network Support** | Deploy to local Ganache, Sepolia testnet, or Ethereum mainnet | Web3 |
| **Vote Integrity** | Cryptographic verification and one-vote-per-account enforcement | Smart Contract |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│         Frontend (React + Vite)                 │
│   ┌──────────────────────────────────────┐     │
│   │  Components (Create, Vote, Results)  │     │
│   ├──────────────────────────────────────┤     │
│   │  Web3 Integration Layer (app.js)     │     │
│   └──────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
              ↓ Web3.js RPC Calls ↓
┌─────────────────────────────────────────────────┐
│     Ethereum Smart Contract (Solidity)          │
│   ┌──────────────────────────────────────┐     │
│   │  Polling.sol - Vote Management       │     │
│   │  • Poll Creation & Storage           │     │
│   │  • Vote Tracking & Validation        │     │
│   │  • Results Aggregation               │     │
│   └──────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
              ↓ Transaction Processing ↓
┌─────────────────────────────────────────────────┐
│     Ethereum Network (Local/Testnet/Mainnet)    │
│   • Ganache (Development) on 127.0.0.1:7545    │
│   • Sepolia Testnet (Testing)                   │
│   • Ethereum Mainnet (Production)               │
└─────────────────────────────────────────────────┘
```

For detailed architecture, see [ARCHITECTURE.md](./Documentation/ARCHITECTURE.md).

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** 7+ (comes with Node.js)
- **MetaMask** ([Install Extension](https://metamask.io))
- **Ganache** ([Download](https://www.trufflesuite.com/ganache))

### First-Time Setup

#### Step 1: Clone and Install Dependencies
```bash
git clone <repository-url>
cd voting-system-blockchain
npm install
```

#### Step 2: Start Ganache (Local Ethereum Network)
```bash
# In a new terminal
npx ganache
# Or if installed: ganache-cli
```
⚠️ **Keep Ganache running** - it's your local blockchain for development.

**Network Details:**
- RPC URL: `http://127.0.0.1:7545`
- Chain ID: `0x539` (1337 decimal)
- Gas Price: 2 gwei

#### Step 3: Configure MetaMask

1. Open MetaMask extension
2. Click **Settings** → **Networks** → **Add Network**
3. Enter:
   - **Network Name:** Ganache Local
   - **RPC URL:** `http://127.0.0.1:7545`
   - **Chain ID:** `1337`
   - **Currency:** ETH
4. Click **Save**

#### Step 4: Compile Smart Contracts
```bash
npm run compile
```
✅ Generates contract ABIs in `contract/build/contracts/`

#### Step 5: Deploy Smart Contracts
```bash
npm run migrate
```
✅ Deploys `Polling.sol` to Ganache
📝 Contract address and details stored in `contract/build/contracts/Polling.json`

#### Step 6: Start Development Server
```bash
npm run dev
```
✅ Opens browser at `http://localhost:5173`

---

## 🔄 Subsequent Runs

**If you're returning to the project after stopping:**

```bash
# Terminal 1: Start Ganache
npx ganache

# Terminal 2: Start development server
npm run dev
```

**To reset contracts (fresh deployment):**
```bash
npm run reset  # Recompiles and redeploys contracts
npm run dev
```

---

## 📖 Usage Guide

### 1. **Create Poll** Tab
Create a new decentralized poll for community voting.

**Steps:**
1. Enter poll question
2. Add poll options (minimum 2, maximum 10)
3. Click **Create Poll**
4. Approve transaction in MetaMask
5. Poll appears in **Vote Poll** tab after confirmation

**Example:**
```
Question: "Best blockchain framework?"
Options:
  - Ethereum
  - Solana
  - Polkadot
  - Cardano
```

### 2. **Vote Poll** Tab
Participate in existing polls with your voting rights.

**Steps:**
1. Select a poll from dropdown
2. View poll details and available options
3. Select your choice
4. Click **Vote**
5. Confirm transaction in MetaMask
6. Vote recorded on blockchain (one vote per account)

**Features:**
- ✅ Vote integrity: One vote per Ethereum address
- ✅ Real-time vote aggregation
- ✅ Automatic duplicate vote prevention

### 3. **View Results** Tab
Monitor live voting results and statistics.

**Features:**
- 📊 Visual vote distribution chart
- 📈 Real-time result updates
- 💯 Percentage calculations
- 🔍 Poll status and creator info

---

## 🛠️ Development

### Project Structure

```
voting-system-blockchain/
├── contract/                          # Solidity smart contracts
│   ├── contracts/
│   │   └── Polling.sol               # Main voting contract (81 lines)
│   ├── migrations/
│   │   └── 1_deploy_contracts.js     # Deployment script
│   ├── build/
│   │   └── contracts/                # Compiled ABIs
│   └── truffle-config.js             # Truffle configuration
│
├── src/                               # React frontend (Vite)
│   ├── components/
│   │   ├── CreatePoll.jsx            # Poll creation form (148 lines)
│   │   ├── VotePoll.jsx              # Voting interface
│   │   ├── ViewResults.jsx           # Results visualization
│   │   ├── Header.jsx                # App header with wallet info
│   │   └── common/
│   │       ├── PollSelector.jsx      # Dropdown for poll selection
│   │       ├── ResultsChart.jsx      # Chart for vote visualization
│   │       └── MessageDisplay.jsx    # Toast notifications
│   ├── hooks/
│   │   └── useMessage.js             # Custom hook for notifications
│   ├── utils/
│   │   └── app.js                    # Web3 integration layer (517 lines)
│   ├── constants/
│   │   └── tabs.js                   # Tab configuration
│   ├── App.jsx                       # Root component (120 lines)
│   ├── index.css                     # Global styles
│   └── main.jsx                      # React entry point
│
├── Documentation/                     # Comprehensive docs
│   ├── ARCHITECTURE.md               # System architecture (1200+ lines)
│   ├── COMPLETE_GUIDE.md             # Full implementation guide
│   ├── PROJECT_DOCUMENTATION.md      # Detailed project specs
│   ├── SETUP.md                      # Setup instructions
│   └── images/                       # Documentation diagrams
│
├── package.json                       # Dependencies and scripts
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint rules
└── README.md                         # This file
```

### Available npm Scripts

```bash
npm run dev          # Start development server (Vite HMR)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Check code style (ESLint)

# Smart contract commands
npm run compile      # Compile Solidity contracts
npm run migrate      # Deploy contracts to network
npm run reset        # Reset, recompile, and redeploy
```

### Tech Stack

**Frontend:**
- **React** 19.2.0 - UI framework with hooks
- **Vite** 7.2.4 - Build tool and dev server
- **Material-UI** 7.3.7 - Component library with icons
- **Emotion** 11.14.0 - CSS-in-JS styling
- **Web3.js** 4.16.0 - Blockchain interaction

**Smart Contract:**
- **Solidity** 0.8.19 - Smart contract language
- **Truffle** 5.11.5 - Development framework
- **Ganache** 7.9.2 - Local Ethereum blockchain

**Development Tools:**
- **ESLint** 9.39.1 - Code linting
- **Babel** - JavaScript transpiler
- **Node.js** 16+ - Runtime

---

## 🧪 Testing

### Manual Testing Workflow

1. **Start Environment:**
   ```bash
   npx ganache &
   npm run migrate
   npm run dev
   ```

2. **Test Poll Creation:**
   - Navigate to **Create Poll** tab
   - Enter question and 3-5 options
   - Submit and approve MetaMask transaction
   - Verify poll appears in **Vote Poll** dropdown

3. **Test Voting:**
   - Select poll from dropdown
   - Vote for an option
   - Attempt to vote again (should be prevented)
   - Check **View Results** for vote count

4. **Test Results:**
   - View real-time vote aggregation
   - Verify percentages sum to 100%
   - Check creator and timestamp information

### Edge Cases to Verify

- ✅ Poll with 2 options (minimum)
- ✅ Poll with 10 options (maximum)
- ✅ Attempting to create poll with <2 or >10 options
- ✅ Duplicate voting prevention
- ✅ Invalid option selection
- ✅ Network connection failures

For automated testing setup, see [ARCHITECTURE.md - Testing Section](./Documentation/ARCHITECTURE.md#testing-strategy).

---

## 🌐 Deployment

### Local Development (Ganache)
```bash
npx ganache
npm run migrate
npm run dev
# Visit http://localhost:5173
```

### Testnet Deployment (Sepolia)

1. **Configure in `contract/truffle-config.js`:**
   ```javascript
   sepolia: {
     provider: () => new HDWalletProvider(MNEMONIC, SEPOLIA_RPC),
     network_id: 11155111,
     gas: 5500000,
     gasPrice: 20000000000
   }
   ```

2. **Deploy:**
   ```bash
   truffle migrate --network sepolia
   ```

3. **Update Frontend:**
   - Copy new contract address from deployment output
   - Update `.env` with new contract address
   - Restart dev server

### Production Deployment (Ethereum Mainnet)

⚠️ **Security Checklist:**
- [ ] Smart contract audited by security firm
- [ ] All test cases passing
- [ ] Gas optimization reviewed
- [ ] Access controls validated
- [ ] Emergency pause mechanism implemented

See [ARCHITECTURE.md - Deployment Guide](./Documentation/ARCHITECTURE.md#deployment-architecture) for detailed instructions.

---

## 🔐 Security Considerations

### Smart Contract Security
- **One-Vote-Per-Account:** Mapping-based vote tracking prevents duplicate votes
- **Poll Validation:** Creator-restricted poll modifications
- **Access Control:** Only registered voters can participate
- **Event Logging:** All votes emit events for transparency

### Frontend Security
- **MetaMask Integration:** Leverages MetaMask's security model
- **Input Validation:** Form validation prevents malformed data
- **Transaction Confirmation:** User must approve each transaction
- **Environment Variables:** Sensitive data in `.env` (not committed)

For comprehensive security analysis, see [ARCHITECTURE.md - Security Architecture](./Documentation/ARCHITECTURE.md#security-architecture).

---

## 📚 Documentation

Comprehensive guides and references:

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./Documentation/ARCHITECTURE.md) | **System design, patterns, and technical decisions (1200+ lines)** |
| [COMPLETE_GUIDE.md](./Documentation/COMPLETE_GUIDE.md) | **Step-by-step implementation and feature guides** |
| [PROJECT_DOCUMENTATION.md](./Documentation/PROJECT_DOCUMENTATION.md) | **Detailed project specifications and requirements** |
| [SETUP.md](./Documentation/SETUP.md) | **Environment setup and installation** |

---

## 🤝 Contributing

We welcome contributions! This project follows open-source best practices.

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with descriptive commits
4. Follow code style with `npm run lint`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

**Code Standards:**
- Use ES6+ features
- Follow ESLint configuration: `npm run lint`
- Add comments for complex logic
- Write self-documenting code

**Solidity Best Practices:**
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Compile without warnings: `npm run compile`
- Test all functions thoroughly

**Git Workflow:**
- Descriptive commit messages
- One feature per branch
- Keep branches updated with main
- Use meaningful PR titles and descriptions

**Testing Before PR:**
```bash
npm run lint              # Check code style
npm run compile           # Compile contracts
npm run migrate           # Deploy to Ganache
npm run dev              # Test UI manually
```

---

## ❓ Troubleshooting

### MetaMask Issues

**Problem:** MetaMask shows wrong network
- **Solution:** Switch to "Ganache Local" network in MetaMask

**Problem:** Transaction rejected
- **Solution:** 
  1. Ensure Ganache is running
  2. Check account has sufficient ETH in MetaMask
  3. Restart MetaMask and try again

### Ganache Issues

**Problem:** Port 7545 already in use
- **Solution:** 
  ```bash
  # Kill existing process (macOS/Linux)
  lsof -ti:7545 | xargs kill -9
  # Windows: Use Task Manager to stop ganache-cli
  ```

**Problem:** Contracts not deployed
- **Solution:**
  ```bash
  npm run reset    # Recompile and redeploy
  npm run dev      # Restart dev server
  ```

### Development Server Issues

**Problem:** "Cannot find module" errors
- **Solution:**
  ```bash
  rm -rf node_modules
  npm install
  npm run dev
  ```

**Problem:** Vite cache issues
- **Solution:**
  ```bash
  rm -rf .vite
  npm run dev
  ```

For more issues, check [COMPLETE_GUIDE.md](./Documentation/COMPLETE_GUIDE.md#troubleshooting).

---

## 📊 Smart Contract Details

### Polling.sol Overview

**Contract Purpose:** Decentralized poll management with vote tracking

**Key Data Structures:**
```solidity
struct Poll {
    uint id;                           // Poll ID
    string question;                   // Poll question
    string[] options;                  // Vote options
    uint[] votes;                      // Vote counts per option
    mapping(address => bool) hasVoted; // Vote tracking
    address creator;                   // Poll creator
    uint createdAt;                    // Creation timestamp
    bool isActive;                     // Active status
}
```

**Main Functions:**
- `createPoll(string question, string[] options)` - Create new poll
- `vote(uint pollId, uint optionIndex)` - Cast vote
- `getPollDetails(uint pollId)` - Get poll information
- `getPollResults(uint pollId)` - Get vote results
- `hasVoted(uint pollId, address voter)` - Check vote status

**Events:**
- `PollCreated(uint pollId, string question, address creator)`
- `Voted(uint pollId, uint optionIndex, address voter)`

**Validations:**
- Poll must have 2-10 options
- One vote per address per poll
- Poll must be active
- Option index must be valid

See [ARCHITECTURE.md - API Specifications](./Documentation/ARCHITECTURE.md#api-specifications) for complete contract ABI.

---

## 🌟 Key Features Deep Dive

### Decentralized Architecture
- Each poll is an immutable record on the blockchain
- Votes are cryptographically secured
- Results are tamper-proof and verifiable
- No central authority controls polling

### User Experience
- Modern Material Design interface
- Dark mode support with theme persistence
- Real-time vote updates
- Responsive design for all devices
- Clear error messages and validation

### Scalability
- Efficient mapping-based storage
- Optimized contract functions
- Fast Vite development builds
- Production-ready build optimization

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

MIT License permits:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

With conditions:
- 📋 License and copyright notice required

---

## 🙏 Acknowledgments

**Technologies & Frameworks:**
- [Ethereum](https://ethereum.org/) - Blockchain platform
- [Solidity](https://soliditylang.org/) - Smart contract language
- [React](https://react.dev) - UI framework
- [Vite](https://vitejs.dev) - Build tool
- [Web3.js](https://web3js.readthedocs.io/) - Web3 library
- [Material-UI](https://mui.com/) - Component library
- [Truffle Suite](https://www.trufflesuite.com/) - Development framework

**References:**
- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [React Hooks Guide](https://react.dev/reference/react/hooks)

---

## 📞 Support & Community

- 📖 **Documentation:** See [Documentation/](./Documentation/)
- 🐛 **Issues:** Report via GitHub Issues
- 💬 **Discussions:** GitHub Discussions (if enabled)
- 📧 **Email:** Include contact if applicable

---

## 🎯 Roadmap

### Current (v1.0)
- ✅ Basic poll creation and voting
- ✅ Real-time results
- ✅ Web3 integration
- ✅ MetaMask support

### Planned (v1.1)
- 🔄 Poll expiration timestamps
- 🔄 Access control tokens (voting rights)
- 🔄 Multi-signature approval for poll creation

### Future (v2.0)
- 🗓️ Delegation voting
- 🗓️ Weighted voting (token-based)
- 🗓️ Poll categories and search
- 🗓️ Historical analytics

---

**Built with ❤️ using Ethereum & React**

---

*Last Updated: 31-1-2026 | Made for transparent, decentralized decision-making*
