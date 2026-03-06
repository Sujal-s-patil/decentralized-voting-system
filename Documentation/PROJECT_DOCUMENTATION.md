# 📘 Project Documentation Structure (FULL MARKS VERSION)

## 1️⃣ Title Page 
---

## 2️⃣ Abstract

**1 page max**

This project designs and develops a **web-based blockchain voting system** that allows users to create polls, cast votes, and view results securely using smart contracts. It targets small organizations, academic elections, and community polls that need transparent, tamper‑resistant voting. The system uses **React (Vite)** for the frontend, **Solidity** smart contracts deployed with **Truffle**, and **Web3** to connect the UI with the blockchain. The outcome is a **decentralized, auditable polling platform** that reduces manual handling, increases trust, and provides real‑time results.

---

## 3️⃣ Problem Statement

* Traditional polling relies on manual counting, which is slow and error‑prone.
* Centralized systems can be altered by administrators or attackers.
* Voters have limited visibility into how results are computed.
* Existing tools often lack transparency, auditability, and tamper resistance.

---

## 4️⃣ Objectives

* Provide secure, tamper‑resistant voting using blockchain.
* Enable poll creation and vote casting through a web UI.
* Prevent double voting using smart‑contract checks.
# Project Documentation (Code-Accurate)

Last updated: 2026-03-06

This document reflects the current implementation in this repository.

## 1) Project Overview

### What the project does
This project is a decentralized polling dApp where:
- admins create polls on-chain,
- wallet users cast one vote per poll,
- users view either live or final results depending on poll settings.

### Main problem it solves
It removes centralized control over vote storage and counting. Poll definitions and vote counts are persisted in the `Polling` smart contract, which enforces vote rules (single vote per address, valid option, active voting window).

### Key use cases
- Transparent community decision polls
- Local/demo governance workflows for Web3 education
- Time-bounded opinion collection with optional live result visibility

## 2) Core Features

### Implemented features and internal behavior
1. **Poll creation with validation**
	- UI in `src/components/CreatePoll.jsx` validates question, option count (2–10), duration (1–8760h), and optional live-results flag.
	- `src/utils/app.js#createPoll` sends a transaction to `Polling.createPoll`.
	- Contract-level validation in `contract/contracts/Polling.sol` enforces the same limits.

2. **Wallet-based voting with duplicate prevention**
	- `src/components/VotePoll.jsx` loads poll details and checks current status.
	- `src/utils/app.js#hasVoted` calls `Polling.hasVoted` before allowing submission.
	- `src/utils/app.js#submitVote` sends `Polling.vote` transaction.
	- Contract blocks repeat voting per address via `mapping(address => bool) hasVoted`.

3. **Time-based voting period**
	- Contract sets `endTime` at creation (`block.timestamp + duration`).
	- `src/utils/timeUtils.js` performs client-side countdown/status display.
	- Contract also enforces end-time checks for vote submission.

4. **Live results vs. delayed results**
	- Poll creator chooses `liveResults` at creation.
	- `src/components/ViewResults.jsx`:
	  - calls `getLiveResults` during active voting only if enabled,
	  - otherwise blocks results view until voting ends,
	  - then calls `getPollResults`.
	- `src/utils/app.js` converts raw counts into total votes + percentages for rendering.

5. **Admin-gated poll creation UI**
	- Admin login flow in `src/components/AdminLogin.jsx` uses hardcoded credentials (`admin` / `admin123`).
	- Auth state stored in `sessionStorage` as `isAdmin`.
	- `src/App.jsx` hides/shows tabs based on this state.

6. **Theme and account-aware UX**
	- Theme toggle in `src/App.jsx` persisted in `localStorage` (`theme`).
	- Connected wallet account displayed by `src/components/Header.jsx`.
	- MetaMask account/chain listeners configured in `src/utils/app.js`.

## 3) System Architecture

See full diagrams and expanded explanation in [ARCHITECTURE.md](./ARCHITECTURE.md).

At a high level:
- **Frontend**: React + Vite single-page app
- **Integration layer**: `src/utils/app.js` (Web3 client + contract wrappers)
- **Blockchain backend**: Solidity contract `Polling.sol` deployed via Truffle
- **Wallet/provider**: MetaMask JSON-RPC bridge to local Ganache network

There is **no traditional REST backend** in the current implementation.

## 4) Folder and File Structure

Repository tree (trimmed to important paths):

```text
.
├── contract/
│   ├── contracts/Polling.sol
│   ├── migrations/1_deploy_contracts.js
│   ├── build/contracts/Polling.json
│   └── truffle-config.js
├── scripts/
│   └── extractAddress.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── components/
│   │   ├── AdminLogin.jsx
│   │   ├── CreatePoll.jsx
│   │   ├── VotePoll.jsx
│   │   ├── ViewResults.jsx
│   │   ├── Header.jsx
│   │   └── common/
│   │       ├── MessageDisplay.jsx
│   │       ├── PollSelector.jsx
│   │       └── ResultsChart.jsx
│   ├── constants/tabs.js
│   ├── hooks/useMessage.js
│   └── utils/
│       ├── app.js
│       ├── auth.js
│       └── timeUtils.js
├── setup.sh
├── package.json
├── vite.config.js
├── eslint.config.js
└── Documentation/
	 ├── README.md
	 ├── PROJECT_DOCUMENTATION.md
	 ├── ARCHITECTURE.md
	 ├── API_REFERENCE.md
	 └── COMPLETE_GUIDE.md
```

### Purpose of important files
- `contract/contracts/Polling.sol`: core business rules and on-chain data storage.
- `src/utils/app.js`: wallet setup, chain checks, contract calls/transactions, response shaping.
- `src/App.jsx`: app bootstrap, admin mode, tab routing, theme, wallet account display.
- `scripts/extractAddress.js`: writes deployed contract address into `.env` as `VITE_CONTRACT_ADDRESS`.
- `setup.sh`: compile → migrate --reset → extract address → run dev server.

## 5) Key Components / Modules

### Smart contract module
- **`Polling.sol`**
  - Stores polls and votes.
  - Exposes read/write functions used by UI.
  - Emits `PollCreated` and `Voted` events.

### Web3 service module
- **`src/utils/app.js`**
  - Initializes Web3 + MetaMask (`initWeb3`).
  - Maintains in-memory `web3`, `contract`, and current `accounts`.
  - Implements all poll/vote/results operations consumed by components.

### UI modules
- **`CreatePoll.jsx`**: create form + validation + transaction submission.
- **`VotePoll.jsx`**: poll selection, vote eligibility checks, vote transaction.
- **`ViewResults.jsx`**: live/final result retrieval logic and rendering trigger.
- **`AdminLogin.jsx`**: session-based admin gate for poll creation tab.

### Shared UX modules
- **`MessageDisplay.jsx`**: portal-based toast notifications.
- **`useMessage.js`**: standard message lifecycle (`showMessage`, auto-clear).
- **`timeUtils.js`**: timestamp comparisons and human-readable time strings.

## 6) Important Workflows

Detailed sequence diagrams are in [ARCHITECTURE.md](./ARCHITECTURE.md).

### A. Create poll workflow
1. Admin logs in and opens Create Poll tab.
2. UI validates form input.
3. `createPoll(...)` in `app.js` sends a MetaMask transaction.
4. Contract stores `Poll` and calculates `endTime`.
5. Transaction receipt event contains `pollId`; UI shows success.

### B. Vote workflow
1. User selects a poll.
2. UI checks whether voting is ended and whether user already voted.
3. User chooses an option and confirms transaction.
4. Contract increments vote counter and marks `hasVoted` for address.
5. UI resets selection and displays confirmation.

### C. Results workflow
1. User selects a poll in Results tab.
2. If voting active:
	- live enabled → call `getLiveResults`,
	- live disabled → show “results unavailable yet” message.
3. If voting ended → call `getPollResults`.
4. Utility layer computes percentages; `ResultsChart` renders bars.

## 7) Technologies Used

### Frameworks and libraries
- React 19
- Vite 7
- Web3.js 4
- MUI icons + Emotion

### Smart contract stack
- Solidity 0.8.19
- Truffle 5
- Ganache 7 (local chain)

### Tooling
- ESLint 9 (flat config)
- Node/npm scripts

### Database/storage
- No off-chain database in this implementation.
- Persistent data is on-chain in `Polling` contract storage.

## 8) Setup and Installation

See operational step-by-step guide in [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md).

Quick essentials:
1. Install dependencies: `npm install`
2. Start Ganache
3. Compile/deploy: `npm run compile` then `npm run migrate`
4. Write `.env`: `node scripts/extractAddress.js` (or run `npm run setup`)
5. Start frontend: `npm run dev`

Required environment variable:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedPollingAddress
```

## 9) API Documentation (Applicable Surface)

There are no HTTP endpoints. The app uses smart-contract calls/transactions as its API.

See [API_REFERENCE.md](./API_REFERENCE.md) for contract + frontend service method reference.

## 10) Data Models / Schema

Primary on-chain entity:
- **Poll** (`Polling.sol`)
  - `id`, `question`, `options[]`, `votes[optionIndex]`, `hasVoted[address]`, `creator`, `createdAt`, `endTime`, `isActive`, `liveResults`.

Relationships:
- One `Poll` has many options.
- One `Poll` has many voter addresses tracked by `hasVoted`.
- One option index has one aggregate count in `votes` mapping.

See model details in [API_REFERENCE.md](./API_REFERENCE.md#data-models).

## 11) Configuration and Environment

### Runtime configuration
- `.env`: `VITE_CONTRACT_ADDRESS`

### Build/lint config
- `vite.config.js`: React plugin + babel react compiler plugin
- `eslint.config.js`: JS + React hooks/refresh rule sets

### Blockchain deployment config
- `contract/truffle-config.js`:
  - development host: `127.0.0.1`
  - development port: `8545`
  - compiler: Solidity `0.8.19`

## 12) Developer Notes

### Important implementation details
- Contract ABI is inlined in `src/utils/app.js` instead of imported from artifact.
- `getAllPolls()` loads polls sequentially by `pollCount` index.
- `MessageDisplay` renders toasts via React portal into `document.body`.

### Design decisions reflected in code
- No centralized backend; contract is the source of truth.
- UI-level admin gating only for poll creation UX.
- Time-based result access combines client-side checks and contract guard conditions.

### Known limitations
- Admin credentials are hardcoded in client code.
- No role-based authorization in smart contract for poll creation.
- Network expectations are Ganache-specific in frontend (`0x539`, RPC `127.0.0.1:7545`).
- Truffle default port (`8545`) may require alignment with Ganache runtime config.
- No automated tests currently present.

## 13) Future Improvements

- Move admin auth to wallet-signature or backend-based secure auth.
- Add contract role management (e.g., owner/admin) for privileged actions.
- Replace sequential poll loading with event indexing/caching.
- Externalize ABI/address source to generated artifact pipeline.
- Add test suites (Solidity + frontend) and CI checks.
- Add support for multiple networks through explicit environment-based config.
