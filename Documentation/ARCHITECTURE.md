# Component Architecture Diagram

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      App.jsx (Main)                          │
│  - Web3 Initialization                                       │
│  - Tab Management                                            │
│  - Account Info Display                                      │
└─────────────────────────────────────────────────────────────┘
         │
         ├──────────────────┬──────────────────┬──────────────────┐
         ▼                  ▼                  ▼                  ▼
    ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  ┌────────────┐
    │   Header    │  │ CreatePoll   │  │  VotePoll      │  │ViewResults │
    │             │  │              │  │                │  │            │
    │ - Title     │  │ - Question   │  │ - Poll Select  │  │ - Results  │
    │ - Account   │  │ - Options    │  │ - Options      │  │ - Charts   │
    │ - Network   │  │ - Create Btn │  │ - Vote Btn     │  │ - Stats    │
    └─────────────┘  └──────────────┘  └────────────────┘  └────────────┘
         │                  │                  │                  │
         └──────────────────┴──────────────────┴──────────────────┘
                            │
                            ▼
                ┌─────────────────────────────┐
                │   utils/app.js              │
                │  Web3 Functions             │
                │                             │
                │ - initWeb3()                │
                │ - createPoll()              │
                │ - getAllPolls()             │
                │ - submitVote()              │
                │ - getPollResults()          │
                │ - hasVoted()                │
                │ - getAccounts()             │
                └─────────────────────────────┘
                            │
                            ▼
                ┌─────────────────────────────┐
                │   Smart Contract            │
                │   (on Blockchain)           │
                │                             │
                │ - createPoll()              │
                │ - vote()                    │
                │ - getPollDetails()          │
                │ - getPollResults()          │
                │ - hasVoted()                │
                └─────────────────────────────┘
```

## Component Interactions

### Create Poll Flow
```
User Input Form
      │
      ▼
handleSubmit()
      │
      ├─ Validation ─── Error Message
      │
      ▼
createPoll(question, options)
      │
      ▼
Smart Contract ─── Transaction
      │
      ▼
Success/Error Message
      │
      ▼
Form Reset
```

### Vote Flow
```
Poll Selection
      │
      ▼
Check if Voted ─── hasVoted()
      │
      ├─ Already Voted ─── Info Message
      │
      ├─ Not Voted ─── Show Options
      │
      ▼
User Selects Option
      │
      ▼
handleSubmitVote()
      │
      ▼
submitVote(pollId, optionIndex)
      │
      ▼
Smart Contract ─── Transaction
      │
      ▼
Success/Error Message
```

### View Results Flow
```
Poll Selection ─── handlePollSelect()
      │
      ▼
getPollResults(pollId)
      │
      ▼
Get Results from Contract
      │
      ▼
Calculate Percentages
      │
      ▼
Display Results with Charts
```

## State Management

```
App.jsx
├── activeTab (string) - current tab
├── accountInfo (string) - connected account
├── loading (boolean) - initialization state
└── error (string) - error message

CreatePoll.jsx
├── question (string) - poll question
├── options (array) - poll options
├── message (object) - status message
└── loading (boolean) - submission state

VotePoll.jsx
├── polls (array) - all polls
├── selectedPollId (string) - selected poll
├── selectedOption (string) - selected vote option
├── message (object) - status message
├── loading (boolean) - submission state
└── alreadyVoted (boolean) - vote status

ViewResults.jsx
├── polls (array) - all polls
├── selectedPollId (string) - selected poll
├── results (object) - poll results
├── message (object) - status message
└── loading (boolean) - fetch state
```

## Function Call Sequence

### Creating a Poll
```
1. User fills form → handleSubmit()
2. Validation checks
3. Call createPoll(question, options)
4. Web3 sends transaction
5. MetaMask confirms
6. Contract executes createPoll()
7. PollCreated event emitted
8. Return pollId
9. Show success message
10. Reset form
```

### Voting
```
1. User selects poll → handlePollSelect()
2. Check hasVoted(pollId, account)
3. If not voted → show voting form
4. User selects option → handleSubmitVote()
5. Call submitVote(pollId, optionIndex)
6. Web3 sends transaction
7. MetaMask confirms
8. Contract executes vote()
9. Voted event emitted
10. Set alreadyVoted = true
11. Show success message
```

### Getting Results
```
1. User selects poll → handlePollSelect()
2. Call getPollResults(pollId)
3. Get results array from contract
4. Call getPollDetails(pollId) for options
5. Calculate percentages
6. Format for display
7. Render results with charts
```

## Styling System

```
App.css (220+ lines)
├── Global Styles
│   ├── Reset (*, body)
│   └── Container layout
├── Header Styles
│   ├── Title, subtitle
│   └── Account info display
├── Tab Styles
│   ├── Tab buttons
│   └── Active states
├── Form Styles
│   ├── Input fields
│   ├── Textareas
│   └── Select dropdowns
├── Button Styles
│   ├── Primary buttons
│   ├── Remove buttons
│   ├── Add buttons
│   └── Hover/Disabled states
├── Poll Card Styles
│   ├── Card layout
│   ├── Options display
│   └── Hover effects
├── Result Styles
│   ├── Result bars
│   └── Percentage display
├── Message Styles
│   ├── Success messages (green)
│   ├── Error messages (red)
│   ├── Info messages (blue)
│   └── Animations
└── Responsive Styles
    └── Mobile layout (@media)
```

## Web3 Integration Points

```
utils/app.js
├── Web3 Instance
│   └── new Web3(window.ethereum)
├── Contract Instance
│   └── new web3.eth.Contract(ABI, ADDRESS)
├── Account Management
│   ├── eth_requestAccounts
│   └── accountsChanged listener
├── Network Management
│   ├── eth_chainId
│   ├── wallet_switchEthereumChain
│   └── wallet_addEthereumChain
└── Contract Calls
    ├── createPoll (send)
    ├── vote (send)
    ├── getPollDetails (call)
    ├── getPollResults (call)
    ├── hasVoted (call)
    └── pollCount (call)
```

## Error Handling Flow

```
Try Block
├── User Action
├── Validation
├── Async Operation
└── Contract Call
        │
        ▼
Catch Block
├── Get Error Message
├── Format for Display
├── Show to User
└── Log if needed
```

## Message System

```
Message Object
├── text (string) - message content
└── type (string) - success|error|info

Display
├── CSS Classes
│   ├── .message
│   ├── .success (green)
│   ├── .error (red)
│   └── .info (blue)
├── Animation
│   └── slideIn (0.3s)
└── Auto-dismiss (optional)
```

---

This architecture provides:
✅ Clear component separation
✅ Unidirectional data flow
✅ Reusable utility functions
✅ Proper error handling
✅ Responsive design
✅ Easy maintenance and testing
