# API Reference

Last updated: 2026-03-06

There are no REST endpoints in this repository. The runtime API consists of:
- Smart contract methods in `Polling.sol`
- Frontend wrapper methods in `src/utils/app.js`

## 1) Smart Contract API (`contract/contracts/Polling.sol`)

### Events

#### `PollCreated(uint256 pollId, string question, address creator)`
Emitted when a poll is created.

#### `Voted(uint256 pollId, uint256 optionIndex, address voter)`
Emitted when a vote is successfully recorded.

### Write functions (transactions)

#### `createPoll(string _question, string[] _options, uint256 _durationInHours, bool _liveResults) returns (uint256 pollId)`
Creates a poll.

Validation rules:
- `_options.length >= 2`
- `_options.length <= 10`
- `_question` cannot be empty
- `_durationInHours > 0`
- `_durationInHours <= 8760`

State changes:
- increments `pollCount`
- initializes `polls[pollId]`
- sets `createdAt`, `endTime`, `liveResults`, `isActive`

#### `vote(uint256 _pollId, uint256 _optionIndex)`
Records one vote for an option.

Validation rules:
- poll must exist
- voting must still be active (`block.timestamp < endTime`)
- sender must not have voted in this poll
- option index must be valid

State changes:
- increments `votes[_optionIndex]`
- sets `hasVoted[msg.sender] = true`

### Read functions (calls)

#### `pollCount() returns (uint256)`
Returns total number of polls created.

#### `polls(uint256 pollId) returns (...)`
Public mapping getter for partial poll fields.

#### `getPollDetails(uint256 _pollId) returns (question, options, createdAt, endTime, isActive, creator, liveResults)`
Returns full metadata required by frontend listing/views.

#### `getPollResults(uint256 _pollId) returns (uint256[] results)`
Returns final vote counts for each option.

Constraint:
- callable only after voting end time.

#### `getLiveResults(uint256 _pollId) returns (uint256[] results)`
Returns current vote counts while voting may still be active.

Constraint:
- poll must have `liveResults = true`.

#### `hasVoted(uint256 _pollId, address _voter) returns (bool)`
Returns whether voter already voted in poll.

## 2) Frontend Service API (`src/utils/app.js`)

### Initialization and state access

#### `initWeb3()`
Initializes MetaMask connection, verifies contract address, and creates contract instance.

Returns:
```js
{ web3, contract, accounts, chainId }
```

Throws when:
- MetaMask missing
- `VITE_CONTRACT_ADDRESS` missing
- no account connected
- contract code not found on active network

#### `getWeb3()`, `getContract()`, `getAccounts()`, `getCurrentAccount()`
Read in-memory initialized instances/account state.

### Poll operations

#### `createPoll(question, options, durationInHours, liveResults = false)`
Sends `createPoll` transaction.

Local validation:
- options count >= 2
- duration > 0 and <= 8760

Returns:
- `pollId` from `PollCreated` event in receipt.

#### `getAllPolls()`
Reads `pollCount`, then fetches poll details for each `pollId` sequentially.

Returns array:
```js
[
  {
    id,
    question,
    options,
    creator,
    createdAt,
    endTime,
    isActive,
    liveResults
  }
]
```

#### `getPollDetails(pollId)`
Fetches one poll detail object in same shape as above.

### Voting operations

#### `hasVoted(pollId, voterAddress = null)`
Checks on-chain voter status. Uses current account when address omitted.

#### `submitVote(pollId, optionIndex)`
Sends `vote` transaction.

### Results operations

#### `getPollResults(pollId)`
Fetches final results and transforms them to:

```js
{
  pollId,
  question,
  totalVotes,
  results: [
    { option, votes, percentage }
  ]
}
```

#### `getLiveResults(pollId)`
Same response shape as `getPollResults`, but sourced from `getLiveResults` contract call.

## 3) Data Models

### On-chain entity: `Poll`

```solidity
struct Poll {
    uint256 id;
    string question;
    string[] options;
    mapping(uint256 => uint256) votes;
    mapping(address => bool) hasVoted;
    address creator;
    uint256 createdAt;
    uint256 endTime;
    bool isActive;
    bool liveResults;
}
```

### Frontend result model

```ts
type PollResult = {
  pollId: number;
  question: string;
  totalVotes: number;
  results: Array<{
    option: string;
    votes: number;
    percentage: number;
  }>;
}
```

### Relationships

- One poll → many options.
- One poll option index → one aggregate vote count.
- One poll + one wallet address → max one vote (`hasVoted`).

## 4) HTTP Endpoint Status

Current implementation has **no Express/Fastify/Nest backend** and therefore no REST endpoints to document.