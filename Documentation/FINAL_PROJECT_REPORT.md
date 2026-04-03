# Blockchain Voting System
## Comprehensive Academic Project Report

Prepared for: Academic Evaluation and Technical Review  
Project Domain: Decentralized Governance Applications  
Project Type: Ethereum-based Voting dApp  
Repository: voting system based on blockchain  
Date: April 3, 2026  
Version: 2.0

---

## INDEX

| CH. NO. | TOPIC NAME | PAGE NO. |
|---|---|---|
|  | LIST OF FIGURES | I |
|  | LIST OF TABLES | II |
|  | LIST OF ABBREVIATIONS | III |
|  | ABSTRACT | IV |
| 1 | INTRODUCTION | 1 |
| 1.1 | Motivation | 2 |
| 1.2 | Objectives | 3 |
| 1.3 | Problem with Existing Systems | 4 |
| 1.4 | Scope | 5 |
| 2 | LITERATURE AND CONCEPTUAL BACKGROUND | 6 |
| 2.1 | Literature Synthesis | 7 |
| 2.2 | Blockchain Concepts Used | 9 |
| 3 | RESEARCH GAP | 11 |
| 4 | RESEARCH OBJECTIVES | 13 |
| 5 | PROPOSED SYSTEM | 15 |
| 5.1 | High-Level Architecture | 16 |
| 5.2 | Use Case View | 18 |
| 6 | SYSTEM REQUIREMENTS | 20 |
| 6.1 | Software Requirements | 20 |
| 6.2 | Hardware Requirements | 21 |
| 6.3 | Technology Stack | 21 |
| 7 | IMPLEMENTATION AND RESULT | 23 |
| 7.1 | Smart Contract Implementation | 24 |
| 7.2 | Frontend and Integration Implementation | 28 |
| 7.3 | Results and Functional Validation | 34 |
| 8 | SECURITY ANALYSIS | 38 |
| 9 | PERFORMANCE AND SCALABILITY ANALYSIS | 42 |
| 10 | TESTING STRATEGY AND VALIDATION | 46 |
| 11 | CHALLENGES AND RESOLUTIONS | 51 |
| 12 | FUTURE ENHANCEMENTS | 54 |
| 13 | CONCLUSION | 57 |
|  | REFERENCES | 59 |
|  | APPENDIX A: PROJECT STRUCTURE | 61 |
|  | APPENDIX B: KEY COMMANDS | 64 |
|  | APPENDIX C: RISK REGISTER | 66 |

---

## LIST OF FIGURES

| Sr. No. | Fig. No. | Figure Name | Page No. |
|---|---|---|---|
| 1 | 5.1 | High-Level System Architecture | 16 |
| 2 | 5.2 | Use Case Diagram (Admin, Voter, Viewer) | 18 |
| 3 | 7.1 | Poll Creation Flow | 25 |
| 4 | 7.2 | Voting Transaction Flow | 29 |
| 5 | 7.3 | Result Retrieval Flow | 33 |
| 6 | 10.1 | Functional Test Coverage Map | 47 |
| 7 | 10.2 | Validation Workflow from Setup to Results | 49 |

Note: Diagrams are represented textually in this report and can be converted into visual architecture diagrams for final submission.

---

## LIST OF TABLES

| Sr. No. | Table No. | Table Name | Page No. |
|---|---|---|---|
| 1 | 2.1 | Literature Summary Matrix | 8 |
| 2 | 6.1 | Software Requirement Matrix | 20 |
| 3 | 6.2 | Technology Stack and Rationale | 22 |
| 4 | 7.1 | Smart Contract API Summary | 27 |
| 5 | 10.1 | Manual Functional Test Cases | 47 |
| 6 | 10.2 | Security Validation Checklist | 50 |
| 7 | C.1 | Risk Register | 66 |

---

## LIST OF ABBREVIATIONS

| Sr. No. | ABBREVIATION | DEFINITION |
|---|---|---|
| 1 | dApp | Decentralized Application |
| 2 | EVM | Ethereum Virtual Machine |
| 3 | RPC | Remote Procedure Call |
| 4 | UI | User Interface |
| 5 | UX | User Experience |
| 6 | ABI | Application Binary Interface |
| 7 | PoA | Proof of Authority |
| 8 | CI | Continuous Integration |

---

## ABSTRACT

The Blockchain Voting System is a decentralized polling platform designed to improve transparency, integrity, and auditability in digital voting workflows. Unlike traditional polling systems that rely on centralized storage and administrator trust, this project stores poll data and vote counts on an Ethereum-compatible blockchain. The solution is implemented as a full-stack decentralized application using Solidity smart contracts, Truffle deployment tooling, Ganache local blockchain simulation, Web3.js integration, MetaMask-based wallet identity, and a React + Vite frontend.

The system supports poll creation with configurable duration, multiple options, one-wallet-one-vote enforcement, and controlled result visibility through either live mode or post-expiry-only mode. The contract-level logic guarantees that voting constraints are enforced independent of client behavior. The frontend provides usability features such as account status display, guided validation messages, poll lifecycle indicators, and result visualizations.

The project demonstrates how decentralized systems can address key weaknesses of conventional polling, including tampering risks, poor transparency, and unverifiable counting. It also documents current limitations such as frontend-only admin authentication, absence of production-grade identity governance, and lack of automated test pipelines. The report concludes with a structured roadmap for evolving the prototype into a production-ready governance platform.

Keywords: blockchain voting, Ethereum, Solidity, Web3.js, decentralized polling, smart contract governance

---

## CHAPTER 1 INTRODUCTION

Voting is one of the most critical processes in collective decision-making, whether in institutions, student councils, communities, teams, or decentralized organizations. In many practical scenarios, current voting systems remain centralized and trust-dependent. Participants often cannot verify whether votes were recorded correctly or whether final results were computed without manipulation.

This project introduces a decentralized voting platform that moves core voting logic from centralized servers to an immutable smart contract. The blockchain acts as a shared, auditable source of truth. Every vote is stored as an on-chain state transition, making it difficult to alter records without network consensus.

The platform is designed as an educational and functional prototype with clear modular boundaries: a contract layer for rule enforcement, a Web3 integration layer for wallet and RPC communication, and a React frontend for user workflows. The system demonstrates how deterministic contract execution can improve trust while preserving usability through modern web interfaces.

### 1.1 Motivation

The motivation for this project emerges from common weaknesses in centralized voting systems:

1. Dependence on privileged administrators to maintain vote integrity.
2. Limited transparency for participants who want to independently verify outcomes.
3. Risk of data tampering in mutable databases.
4. Difficulty enforcing one-participant-one-vote reliably without centralized identity mechanisms.
5. Delays and disputes in result publication due to opaque counting workflows.

Blockchain-based design provides a practical way to reduce trust assumptions by making vote recording and tallying part of public, verifiable computation.

### 1.2 Objectives

The project objectives are as follows:

1. Build a decentralized polling platform using Solidity smart contracts.
2. Enforce one vote per wallet address for each poll.
3. Support poll duration configuration with strict time-based rules.
4. Restrict final result access until poll expiry.
5. Allow optional live result visibility for specific polls.
6. Provide intuitive frontend flows for poll creation, voting, and result viewing.
7. Integrate MetaMask for decentralized account identity.
8. Deliver robust user-facing validation and status messaging.

### 1.3 Problem with Existing Systems

Conventional systems are either manual or centralized-digital. Manual systems are slow and prone to counting errors. Centralized digital systems improve speed but introduce trust concentration. Users are expected to trust platform operators for fairness, duplicate prevention, and final result correctness. In many implementations, the raw vote trail is inaccessible to participants.

The current project addresses this by making the smart contract the authority for:

1. Poll lifecycle state.
2. Vote acceptance and rejection rules.
3. Duplicate vote prevention.
4. Final result eligibility timing.

### 1.4 Scope

In scope:

1. Poll creation with validation checks.
2. Multi-option voting (2 to 10 options).
3. Time-bound voting windows.
4. Optional live-result mode.
5. Final-result retrieval post poll expiry.
6. Local development workflow using Ganache + Truffle + Vite.

Out of scope in current version:

1. National-scale election-level hardening.
2. Biometric identity verification and KYC.
3. Secret-ballot cryptographic protocols.
4. Gas abstraction and account sponsorship.
5. Full production CI/CD governance pipeline.

---

## CHAPTER 2 LITERATURE AND CONCEPTUAL BACKGROUND

Blockchain-based voting has been widely discussed as a trust-minimizing alternative to centralized e-voting systems. Prior studies and prototypes emphasize immutability, verifiability, and audit trails, but also highlight practical concerns such as identity management, coercion resistance, and scalability.

### 2.1 Literature Synthesis

The following literature synthesis captures representative directions from related digital voting and trustworthy computing research.

### Table 2.1: Literature Summary Matrix

| Sr. No. | Topic Area | Working Purpose | Technology Orientation | Typical Limitation |
|---|---|---|---|---|
| 1 | Blockchain in Governance | Improve vote transparency and trust | Smart contracts, distributed ledgers | Identity assurance remains external |
| 2 | e-Voting Security Models | Prevent tampering and duplicate voting | Cryptographic protocols, formal models | Complex to deploy for general users |
| 3 | Decentralized dApp Workflows | Replace backend trust with chain logic | Ethereum stack, wallet auth | High UX dependency on wallet tooling |
| 4 | Auditable Counting Systems | Provide publicly verifiable tallying | Event logs, immutable state | Privacy trade-offs if ballots are public |
| 5 | Usable Web3 Interfaces | Reduce user friction in on-chain actions | React/Web3 integration, guided UI | Error handling across wallets is difficult |

### 2.2 Blockchain Concepts Used

The project applies the following concepts directly:

1. Immutability: vote counters and participation markers are persisted in contract state.
2. Deterministic execution: vote rules are encoded in Solidity modifiers and require checks.
3. Address-based participation: wallet addresses act as pseudonymous voter identities.
4. Event-driven auditability: events provide an immutable history of poll creation and voting.
5. Trust minimization: correctness depends on contract logic, not centralized claim.

---

## CHAPTER 3 RESEARCH GAP

Despite major advances, practical gaps remain between theoretical e-voting proposals and deployable systems used by non-specialists.

Identified research and implementation gaps:

1. Usability gap: many secure systems fail due to poor user workflows and wallet friction.
2. Governance gap: decentralized state does not automatically solve role and permission design.
3. Privacy gap: public chains provide transparency but can expose participation metadata.
4. Scalability gap: naive polling retrieval patterns become inefficient as data volume grows.
5. Assurance gap: prototypes frequently lack automated regression and formal test coverage.

This project addresses parts of the usability and integrity gap while documenting unresolved production-level challenges.

---

## CHAPTER 4 RESEARCH OBJECTIVES

This chapter reframes implementation goals as measurable research objectives:

1. Demonstrate enforceable vote integrity using contract-level one-vote constraints.
2. Verify time-locked result release behavior under active and expired poll states.
3. Evaluate usability of wallet-based participation for typical polling scenarios.
4. Validate modular architecture where frontend checks complement, but do not replace, contract rules.
5. Produce an extensible baseline for future upgrades including role-based access and indexing.

Success indicators:

1. Duplicate voting attempts consistently fail.
2. Vote attempts after end time fail.
3. Result visibility follows live-results configuration.
4. Poll creation constraints prevent invalid payloads.
5. Users receive clear workflow guidance for both success and failure states.

---

## CHAPTER 5 PROPOSED SYSTEM

The proposed system is a three-layer decentralized web application where the smart contract is the source of truth for all polling operations.

### 5.1 High-Level Architecture

Core layers:

1. Frontend Layer (React + Vite)
2. Service/Integration Layer (Web3.js wrappers)
3. Blockchain Layer (Solidity contract on Ganache)

Textual architecture diagram:

Fig. 5.1 High-Level System Architecture

User (Browser + MetaMask)
-> React UI Components
-> Service Utilities (init, read, write wrappers)
-> window.ethereum Provider
-> Ganache JSON-RPC
-> Polling Smart Contract
-> On-chain Poll + Vote State

Design characteristics:

1. No traditional centralized database for vote records.
2. Contract state controls lifecycle and voting legality.
3. Frontend exists for orchestration, display, and transaction initiation.

### 5.2 Use Case View

Primary actors:

1. Admin User (frontend-gated in current version)
2. Voter
3. Viewer/Observer

Primary use cases:

1. Login as admin for poll creation workflow.
2. Create poll with question, options, duration, and live result setting.
3. Browse available polls.
4. Cast vote for one option.
5. View live results (if enabled and active).
6. View final results (after poll expiry).

Fig. 5.2 Use Case Diagram (Textual)

Admin -> Create Poll  
Voter -> Select Poll -> Vote  
Viewer -> Select Poll -> View Results  
Contract -> Enforce Rules for each flow

---

## CHAPTER 6 SYSTEM REQUIREMENTS

### 6.1 Software Requirements

### Table 6.1: Software Requirement Matrix

| Component | Required Version (Recommended) | Purpose |
|---|---|---|
| Node.js | 16+ | JavaScript runtime and package scripts |
| npm | Latest compatible | Dependency management |
| Ganache | 7.9.x | Local Ethereum chain simulation |
| Truffle | 5.11.x | Contract compile and migration tooling |
| MetaMask | Current stable | Wallet integration and transaction signing |
| Browser | Chromium/Firefox | Frontend execution and wallet interaction |

### 6.2 Hardware Requirements

Minimum practical requirements for local development:

1. Dual-core CPU or higher.
2. 4 GB RAM (8 GB recommended for smoother toolchain operation).
3. 2 GB free disk space.
4. Stable local environment capable of running Ganache, browser, and Vite simultaneously.

### 6.3 Technology Stack

### Table 6.2: Technology Stack and Rationale

| Layer | Technology | Rationale |
|---|---|---|
| Smart Contract | Solidity 0.8.19 | Mature tooling, strict typing, EVM compatibility |
| Contract Tooling | Truffle 5.11.5 | Reliable migration and artifact generation |
| Local Chain | Ganache 7.9.2 | Deterministic local blockchain testing |
| Web3 Integration | Web3.js 4.16.0 | Wallet and contract call/transaction APIs |
| Frontend | React 19.2.0 | Component-driven UI and state management |
| Build Tool | Vite 7.2.4 | Fast dev server and modern bundling |
| UI Toolkit | Material UI + Emotion | Consistent components and styling primitives |
| Code Quality | ESLint 9.39.1 | Lint checks and coding standard enforcement |

---

## CHAPTER 7 IMPLEMENTATION AND RESULT

This chapter presents contract implementation, frontend integration, and observed functional outcomes.

### 7.1 Smart Contract Implementation

Contract file: contract/contracts/Polling.sol

Key data model:

1. Poll identifier and question.
2. Dynamic options array.
3. Per-option vote counters.
4. Address-to-boolean participation mapping.
5. Creator, creation time, end time.
6. Activity flag and live-results flag.

Validation constants and constraints:

1. Minimum options: 2
2. Maximum options: 10
3. Maximum duration: 8760 hours

Critical modifiers:

1. pollExists
2. votingActive
3. votingEnded

Write-path logic summary:

1. createPoll validates question/options/duration and initializes struct.
2. vote validates option index and one-vote rule, then increments selected count.

Read-path logic summary:

1. getPollDetails returns metadata for frontend display.
2. getLiveResults enforces visibility restrictions.
3. getPollResults returns final tally post-expiry.
4. hasVoted enables voter eligibility check before transaction attempts.

Fig. 7.1 Poll Creation Flow (Textual)

Input Validation -> Transaction Submission -> Contract Require Checks -> Poll Stored -> PollCreated Event

### Table 7.1: Smart Contract API Summary

| Category | Function | Purpose |
|---|---|---|
| Write | createPoll(question, options, duration, liveResults) | Create validated poll |
| Write | vote(pollId, optionIndex) | Cast one vote for an option |
| Read | pollCount() | Return total number of polls |
| Read | getPollDetails(pollId) | Return poll metadata |
| Read | getPollResults(pollId) | Return final results after expiry |
| Read | getLiveResults(pollId) | Return in-progress results if enabled |
| Read | hasVoted(pollId, voter) | Check duplicate-vote status |

### 7.2 Frontend and Integration Implementation

Important frontend modules:

1. src/App.jsx - initialization, tab routing, session/theme state.
2. src/utils/app.js - provider setup, contract wrappers, poll and vote APIs.
3. src/components/CreatePoll.jsx - poll creation form and validation.
4. src/components/VotePoll.jsx - poll selection and vote casting.
5. src/components/ViewResults.jsx - result retrieval logic by poll state.
6. src/utils/timeUtils.js - lifecycle calculations and user-facing time text.

Initialization flow:

1. Detect injected provider.
2. Request account access through wallet.
3. Confirm chain assumptions and contract address availability.
4. Create contract instance from ABI + deployed address.
5. Store runtime references for subsequent calls and transactions.

Voting flow:

1. User selects poll and option.
2. Frontend checks current status and hasVoted.
3. Valid request triggers signed transaction.
4. On confirmation, UI refreshes relevant state and shows success message.

Result flow:

1. If poll is active and live disabled: show wait state.
2. If poll is active and live enabled: show interim counts.
3. If poll has ended: show final result object and chart data.

Fig. 7.2 Voting Transaction Flow (Textual)

Select Poll -> Select Option -> Eligibility Check -> MetaMask Confirm -> Contract vote() -> State Update -> Success Message

Fig. 7.3 Result Retrieval Flow (Textual)

Select Poll -> Check End Time + liveResults -> choose getLiveResults OR getPollResults -> Render chart/table

### 7.3 Results and Functional Validation

Observed implementation outcomes:

1. Polls are created with enforced option and duration limits.
2. Duplicate voting attempts are rejected by contract logic.
3. Voting after poll end is rejected.
4. Live-result visibility honors poll configuration.
5. Final results become accessible after expiry.
6. User messages provide understandable transaction and status feedback.

Qualitative UI outcomes:

1. Poll creation form guides valid input entry.
2. Voting workflow is concise for first-time users familiar with MetaMask.
3. Results view makes active versus final state distinctions clear.

---

## CHAPTER 8 SECURITY ANALYSIS

Security strengths in current design:

1. On-chain vote recording prevents silent database tampering.
2. Contract-level one-vote check prevents duplicate participation.
3. Time-bound modifiers prevent invalid late voting.
4. Deterministic require checks produce consistent enforcement.

Security risks and limitations:

1. Admin login is implemented only in frontend session logic.
2. Contract does not currently restrict poll creation by role.
3. Wallet-based identity is pseudonymous and not equivalent to verified personhood.
4. User-side phishing/social engineering risk remains outside contract control.

Recommended hardening roadmap:

1. Add Ownable/AccessControl role checks in contract for poll creation.
2. Replace static admin credentials with signature-based authentication.
3. Add automated contract unit tests for all revert paths.
4. Integrate lint + test gates in CI for regression prevention.
5. Introduce event monitoring and anomaly alerting for production deployment.

---

## CHAPTER 9 PERFORMANCE AND SCALABILITY ANALYSIS

Current performance profile:

1. Poll retrieval is sequential from index 0 to pollCount - 1.
2. Result percentage computation is lightweight and frontend-side.
3. For educational and moderate-scale usage, responsiveness is acceptable.

Scalability constraints:

1. Sequential reads become slower as poll count increases significantly.
2. RPC latency impacts perceived responsiveness on large histories.
3. Lack of off-chain indexing reduces query flexibility.

Optimization directions:

1. Add indexed event-driven caching layer.
2. Introduce pagination or lazy loading for polls.
3. Batch and parallelize read calls where possible.
4. Add optimistic UI states for transaction pending/confirmed phases.
5. Consider migration to indexer frameworks for higher-volume analytics.

---

## CHAPTER 10 TESTING STRATEGY AND VALIDATION

Testing strategy in this phase is manual-functional with clear scenario coverage. Automated tests are recommended as next milestone.

### Table 10.1: Manual Functional Test Cases

| Test ID | Scenario | Expected Outcome | Status |
|---|---|---|---|
| T01 | Create poll with valid inputs | Poll created and event emitted | Pass |
| T02 | Create poll with fewer than 2 options | Transaction rejected | Pass |
| T03 | Create poll with empty question | Transaction rejected | Pass |
| T04 | Vote once in active poll | Vote accepted and count incremented | Pass |
| T05 | Attempt duplicate vote | Transaction rejected | Pass |
| T06 | Vote after end time | Transaction rejected | Pass |
| T07 | Access live results when disabled | Access blocked with message | Pass |
| T08 | Access final results before end | Access blocked | Pass |
| T09 | Access final results after end | Final tallies displayed | Pass |
| T10 | Wallet/chain mismatch handling | User guidance shown | Pass |

### Table 10.2: Security Validation Checklist

| Control | Validation Method | Observation |
|---|---|---|
| One vote per address | Repeated vote attempts | Reverted as expected |
| Time lock on voting | Vote post-expiry | Reverted as expected |
| Result release policy | Query timing checks | Enforced by state and flags |
| Input bounds | Invalid options/duration | Reverted as expected |
| Frontend messaging | UX error/success checks | Clear but improvable |

Fig. 10.1 Functional Test Coverage Map (Textual)

Poll Creation + Voting + Results + Error Paths + Wallet State Checks

Fig. 10.2 Validation Workflow (Textual)

Setup Chain -> Deploy Contract -> Sync Address -> Launch UI -> Execute Test Scenarios -> Compare Expected and Actual

Automation recommendations:

1. Solidity tests for all require constraints and state transitions.
2. Service-layer integration tests for app.js wrappers.
3. UI tests for main flows with mocked provider.
4. CI execution on pull requests with lint/build/test checks.

---

## CHAPTER 11 CHALLENGES AND RESOLUTIONS

### Challenge 1: Time-bound voting and controlled result access

Resolution:

1. Added endTime in poll state.
2. Added votingActive and votingEnded checks.
3. Added UI helpers to communicate time remaining and availability.

### Challenge 2: Address synchronization between deployment and frontend

Resolution:

1. Added script to extract deployed contract address.
2. Synced output into frontend environment usage.

### Challenge 3: Consistent user messaging across components

Resolution:

1. Introduced reusable message display components and hooks.
2. Standardized success/error handling flows.

### Challenge 4: Bridging blockchain complexity for first-time users

Resolution:

1. Added guided messages for wallet and network checks.
2. Structured tabs for focused workflows: create, vote, results.

---

## CHAPTER 12 FUTURE ENHANCEMENTS

Planned improvements for production readiness:

1. Role-based smart contract authorization for poll creation.
2. Wallet-signature-based admin flow replacing static credentials.
3. Privacy-preserving vote mechanisms for secret ballots.
4. Off-chain indexing for scalable querying and analytics.
5. Advanced dashboard with participation trends and exports.
6. Multi-network support with environment profiles.
7. End-to-end automated quality and security pipeline.
8. Formal threat modeling and audit-ready documentation.

---

## CHAPTER 13 CONCLUSION

The Blockchain Voting System demonstrates a practical, modular, and auditable approach to digital polling using decentralized infrastructure. By encoding voting constraints directly in a smart contract, the platform provides stronger integrity guarantees than traditional centralized polling implementations. Core features including one-vote enforcement, time-bound lifecycle management, and conditional result visibility are implemented and functionally validated.

The solution is suitable for educational use, prototypes, and controlled governance experiments. It is not yet a fully hardened election-grade platform, primarily due to role governance, identity assurance, and automation gaps. Nevertheless, the architecture establishes a strong foundation for progressive enhancement toward production-grade decentralized governance systems.

---

## REFERENCES

1. Ethereum Solidity Documentation
2. Web3.js Documentation
3. React Documentation
4. Vite Documentation
5. Truffle Suite Documentation
6. Ganache Documentation
7. MetaMask Developer Documentation
8. Project source code and supporting documentation in repository

---

## APPENDIX A: PROJECT STRUCTURE

```text
.
|-- DEPLOYMENT_QUICK_START.md
|-- README.md
|-- setup.sh
|-- TIME_BASED_VOTING_IMPLEMENTATION.md
|-- contract/
|   |-- truffle-config.js
|   |-- build/contracts/Polling.json
|   |-- contracts/Polling.sol
|   |-- migrations/1_deploy_contracts.js
|-- Documentation/
|   |-- API_REFERENCE.md
|   |-- ARCHITECTURE.md
|   |-- COMPLETE_GUIDE.md
|   |-- PROJECT_DOCUMENTATION.md
|   |-- FINAL_PROJECT_REPORT.md
|   |-- reference_report.md
|-- scripts/
|   |-- extractAddress.js
|-- src/
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   |-- main.jsx
|   |-- components/
|   |   |-- AdminLogin.css
|   |   |-- AdminLogin.jsx
|   |   |-- CreatePoll.jsx
|   |   |-- Header.jsx
|   |   |-- ViewResults.jsx
|   |   |-- VotePoll.jsx
|   |   |-- common/
|   |       |-- MessageDisplay.jsx
|   |       |-- PollSelector.jsx
|   |       |-- ResultsChart.jsx
|   |-- constants/
|   |   |-- tabs.js
|   |-- hooks/
|   |   |-- useMessage.js
|   |-- utils/
|       |-- app.js
|       |-- auth.js
|       |-- timeUtils.js
```

---

## APPENDIX B: KEY COMMANDS

```bash
npm install
npx ganache
npm run compile
npm run migrate
node scripts/extractAddress.js
npm run dev
npm run build
npm run lint
npm run reset
npm run setup
```

---

## APPENDIX C: RISK REGISTER

### Table C.1: Risk Register

| Risk ID | Risk Description | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | Frontend-only admin authentication bypass | High | High | Move role checks on-chain |
| R2 | Chain/network mismatch in user environment | Medium | Medium | Add startup diagnostics and guided prompts |
| R3 | Lack of automated tests causes regressions | High | Medium | Add contract, integration, and UI test suites |
| R4 | Sequential poll fetch degrades UX at scale | Medium | Medium | Introduce indexing and pagination |
| R5 | Pseudonymous wallets not equal to verified identity | High | Medium | Integrate identity/attestation framework |

---

End of Report.
