# Blockchain Voting System
## Viva-Ready Short Report

Prepared for: Oral Presentation and Viva Review  
Project Type: Ethereum-Based Decentralized Voting Application  
Repository: voting system based on blockchain  
Date: April 3, 2026

---

## 1. Project Summary

The Blockchain Voting System is a decentralized web application for creating polls, casting votes, and viewing results using blockchain technology. The main purpose of the project is to make voting transparent, tamper-resistant, and verifiable. Instead of saving votes in a central database, the system stores poll and vote state in a smart contract deployed on Ethereum-compatible blockchain infrastructure.

The application uses Solidity for the contract, Web3.js for blockchain interaction, MetaMask for wallet-based transaction signing, Ganache for local blockchain development, Truffle for deployment, and React with Vite for the frontend.

---

## 2. What Makes It a Blockchain Project

This project is blockchain-based because the important voting logic runs on a smart contract, not on a normal server.

1. Polls are stored on-chain in the `Polling` smart contract.
2. Votes are recorded as blockchain transactions.
3. The contract enforces one vote per wallet.
4. Final vote counts are taken from contract state.
5. MetaMask signs every transaction, so the wallet is the user identity layer.
6. The blockchain creates an immutable and auditable record of all actions.

In a regular web app, the backend can change stored data. In this project, the contract rules control what is valid, and the blockchain permanently stores the result.

---

## 3. What Happens When a Poll Is Created

When an admin creates a poll:

1. The admin enters the question, options, duration, and live-result setting in the UI.
2. The frontend checks that the data is valid.
3. MetaMask asks the admin to confirm and sign the transaction.
4. The smart contract verifies the rules, such as option count and duration limits.
5. If valid, the poll is written to the blockchain.
6. The contract emits a `PollCreated` event.
7. The UI refreshes and shows the new poll in the list.

Important contract checks during creation:

1. Question cannot be empty.
2. Options must be between 2 and 10.
3. Duration must be within the allowed range.
4. The poll is assigned a unique ID and end time.

---

## 4. What Happens When a Vote Is Cast

When a voter casts a vote:

1. The voter selects an active poll.
2. The voter chooses one option.
3. The frontend checks whether voting is still open.
4. MetaMask signs the vote transaction.
5. The smart contract checks that the poll exists and that the voter has not already voted.
6. If valid, the selected option count increases by one.
7. The voter address is marked as having voted.
8. The contract emits a `Voted` event.
9. The UI updates the results display.

Important vote rules:

1. Only one vote is allowed per wallet per poll.
2. Voting is allowed only before the poll end time.
3. Invalid option indexes are rejected.
4. After voting, the same wallet cannot vote again.

---

## 5. Architecture in One Sentence

User -> React UI -> Web3 helper -> MetaMask -> Ethereum/Ganache -> Smart Contract -> Stored poll and vote state.

This flow matches the project architecture because the frontend is only the interface, while the smart contract is the source of truth.

---

## 6. Main Features

1. Create polls with multiple options.
2. Vote once per wallet.
3. Control voting by time duration.
4. Show live results only when enabled.
5. Show final results after the poll ends.
6. Support wallet-based interaction through MetaMask.

---

## 7. Why Blockchain Is Useful Here

1. It prevents silent tampering with vote data.
2. It keeps a permanent audit trail.
3. It makes the system transparent.
4. It reduces trust in a central administrator.
5. It allows verification of poll outcomes from contract state.

---

## 8. Limitations

1. Admin login is currently frontend-based.
2. Poll creation is not yet role-restricted on-chain.
3. The system is suitable for prototype and academic use.
4. It does not yet include full privacy-preserving voting.
5. It does not yet have a full automated test suite.

---

## 9. Conclusion

The project demonstrates how blockchain can improve trust and auditability in voting. It shows the full flow from poll creation to vote recording and result display using smart contracts and wallet-based transactions. The design is a strong prototype for decentralized governance applications and can be extended further with access control, stronger authentication, and automated testing.

---

## 10. Short Viva Answer Points

1. The project is blockchain-based because votes are stored in a smart contract.
2. MetaMask is used to sign transactions from the user wallet.
3. Ganache is used for local blockchain development and testing.
4. Truffle is used for contract deployment.
5. React provides the user interface.
6. The smart contract enforces one vote per wallet.
7. Polls end based on time, and final results are shown after expiry.

---

## 11. Viva Questions and Answers

### Basic Questions

1. What is the title of your project?
   Answer: Blockchain Voting System.

2. What problem does your project solve?
   Answer: It provides secure, transparent, tamper-resistant voting.

3. Why did you choose a blockchain-based approach?
   Answer: Because the trust-critical vote logic is stored on-chain.

4. What is a decentralized application?
   Answer: An app that uses blockchain instead of a central server for core logic.

5. What is the main purpose of the voting system?
   Answer: To create polls, cast votes, and view results securely.

6. Who are the main users of this system?
   Answer: Admin, voter, and viewer.

7. What technologies did you use in this project?
   Answer: Solidity, React, Web3.js, MetaMask, Ganache, and Truffle.

8. What is the role of React in the project?
   Answer: React builds the user interface.

9. What is the role of Solidity in the project?
   Answer: Solidity implements the smart contract.

10. What is MetaMask used for?
	Answer: MetaMask is used to sign and submit blockchain transactions.

11. What is Ganache used for?
	Answer: Ganache is used as a local Ethereum test network.

12. What is Truffle used for?
	Answer: Truffle is used to compile and deploy the contract.

13. What is the meaning of one vote per wallet?
	Answer: One wallet address can vote only once in a poll.

14. What is a smart contract?
	Answer: A smart contract is self-executing code deployed on blockchain.

15. What is the difference between a normal web app and this project?
	Answer: A normal web app depends on a server database; this project depends on blockchain state.

### Blockchain Fundamentals

16. What makes this project blockchain-based?
	Answer: Poll creation, voting, and result storage happen on-chain.

17. Why is blockchain better than a normal database in this project?
	Answer: It prevents silent data changes and increases trust.

18. What is immutability in blockchain?
	Answer: Stored blockchain data cannot be changed easily after confirmation.

19. How does blockchain improve transparency?
	Answer: Contract state and transaction history can be verified.

20. What is decentralization?
	Answer: No single server controls the voting records.

21. What is a transaction in blockchain?
	Answer: A signed blockchain action that changes or reads contract state.

22. What is a blockchain network?
	Answer: The distributed system that stores and validates transactions.

23. What is the Ethereum Virtual Machine?
	Answer: It executes smart contract code.

24. What is the difference between on-chain and off-chain data?
	Answer: On-chain data is stored in the blockchain; off-chain data is stored outside it.

25. Why is storing votes on-chain important?
	Answer: The blockchain becomes the permanent source of truth for vote counts.

26. What is the role of wallet addresses in your system?
	Answer: They act as the identity used for voting and ownership actions.

27. Can blockchain prevent tampering completely?
	Answer: It prevents tampering with stored contract state, but not all real-world threats.

28. What are the limitations of public blockchain voting?
	Answer: It can expose metadata and is not fully private.

29. Why is blockchain useful for trust-sensitive applications?
	Answer: It reduces dependence on a central authority.

30. What is the role of consensus in your project?
	Answer: Consensus ensures the network agrees on valid transactions and state changes.

### Smart Contract Questions

31. What does the Polling smart contract do?
	Answer: It creates polls, stores votes, and enforces voting rules.

32. What data is stored in each poll?
	Answer: Question, options, vote counts, creator, time data, and live-result setting.

33. How is the poll ID generated?
	Answer: It is assigned by the contract as a unique poll index or identifier.

34. What happens when a poll is created?
	Answer: The contract validates input and stores the poll on-chain.

35. What happens when a vote is cast?
	Answer: The contract checks validity and increases the selected option count.

36. How does the contract prevent duplicate voting?
	Answer: It checks whether the wallet has already voted in that poll.

37. How does the contract check whether voting is active?
	Answer: It compares the current time with the poll end time and status.

38. How does the contract decide when voting ends?
	Answer: Voting ends when the current time crosses the stored end time.

39. Why are require checks important in the contract?
	Answer: They stop invalid actions before state changes happen.

40. What are the main functions in the smart contract?
	Answer: createPoll, vote, getPollDetails, getPollResults, getLiveResults, and hasVoted.

41. What is the use of getPollDetails?
	Answer: It returns poll metadata for the UI.

42. What is the use of getPollResults?
	Answer: It returns final results after the poll has ended.

43. What is the use of getLiveResults?
	Answer: It returns live results only when live mode is enabled.

44. What is the use of hasVoted?
	Answer: It checks whether a wallet has already voted in a poll.

45. What events are emitted by the contract?
	Answer: PollCreated and Voted.

46. Why are events useful in blockchain applications?
	Answer: They help the UI detect actions and keep an audit trail.

47. What is the role of the liveResults flag?
	Answer: It controls whether results can be viewed during voting.

48. Why is question validation needed?
	Answer: To stop invalid or empty poll questions from being stored.

49. Why do you limit the number of options?
	Answer: To keep polls usable and prevent badly designed polls.

50. Why do you limit the duration of the poll?
	Answer: To prevent extremely long polls and keep rules bounded.

### Poll Creation Workflow

51. What happens step by step when an admin creates a poll?
	Answer: The admin enters data, MetaMask confirms the transaction, the contract validates it, and the poll is stored.

52. Why does the frontend validate the poll input before sending it to the contract?
	Answer: To reduce failed transactions and improve user experience.

53. Why does MetaMask ask for transaction confirmation during poll creation?
	Answer: Because poll creation is an on-chain transaction that must be approved by the wallet owner.

54. What happens if the poll question is empty?
	Answer: The contract rejects the creation request.

55. What happens if there are fewer than 2 options?
	Answer: The contract rejects the creation request.

56. What happens if there are more than 10 options?
	Answer: The contract rejects the creation request.

57. What happens if the duration is invalid?
	Answer: The contract rejects the creation request.

58. Where is the poll stored after creation?
	Answer: It is stored in the smart contract state on the blockchain.

59. How does the UI know that a poll was created successfully?
	Answer: Through the PollCreated event and refreshed poll list.

60. Why is the PollCreated event important?
	Answer: It confirms the poll was created successfully on-chain.

### Voting Workflow

61. What happens when a voter opens a poll?
	Answer: The voter selects a poll and checks its status.

62. What happens before a vote transaction is sent?
	Answer: The frontend checks eligibility and voting status before sending the transaction.

63. Why must the voter sign the transaction in MetaMask?
	Answer: Because blockchain transactions must be signed by the wallet owner.

64. What happens if the voter tries to vote twice?
	Answer: The transaction is rejected by the contract.

65. What happens if the voter tries to vote after the poll ends?
	Answer: The transaction is rejected because the poll has ended.

66. What happens if the selected option is invalid?
	Answer: The contract rejects invalid option indexes.

67. How does the system know which option was selected?
	Answer: The selected option index is sent from the UI to the contract.

68. Why is the vote count updated on-chain?
	Answer: Because the blockchain must store the authoritative vote count.

69. How is the vote reflected in the UI after confirmation?
	Answer: The frontend refreshes the data after confirmation.

70. What is the significance of the Voted event?
	Answer: It confirms that a vote was accepted and stored.

### Results and Time-Based Questions

71. When can final results be viewed?
	Answer: Final results can be viewed after the poll end time.

72. When can live results be viewed?
	Answer: Live results can be viewed during the poll only if enabled.

73. What happens if live results are disabled?
	Answer: The system shows a wait message and blocks the result.

74. How does the system know whether the poll has ended?
	Answer: The contract and frontend use the stored end time.

75. What is the role of endTime?
	Answer: It defines when voting stops and final results become available.

76. Why is time-based voting important?
	Answer: It ensures fairness and a clear voting window.

77. What happens to a poll after the end time?
	Answer: The poll becomes closed for voting and eligible for final result viewing.

78. Can results be changed after voting ends?
	Answer: No, the final tally is fixed once the poll ends.

79. What is the difference between live results and final results?
	Answer: Live results are partial and active; final results are complete and post-expiry.

80. Why is result visibility controlled?
	Answer: To control when result information is exposed.

### Frontend and Integration Questions

81. What is the role of the React frontend?
	Answer: It provides the user interface and workflow management.

82. What is the role of src/utils/app.js?
	Answer: It contains blockchain connection and contract helper functions.

83. Why do you need a Web3 helper layer?
	Answer: To isolate wallet and contract logic from the UI.

84. How does the frontend connect to the blockchain?
	Answer: It uses Web3.js and MetaMask to communicate with the contract.

85. What is the purpose of the provider object?
	Answer: It represents the injected blockchain wallet connection.

86. Why do you check the selected account and network?
	Answer: To ensure the app is connected to the correct account and network.

87. What happens if MetaMask is not installed?
	Answer: The app should show an installation or connection message.

88. What happens if the wallet is locked?
	Answer: The user must unlock MetaMask or connect an account.

89. What happens if the contract address is missing?
	Answer: Contract calls will fail or the app will show an initialization error.

90. How does the UI show success and error messages?
	Answer: It shows feedback messages for success, warnings, and errors.

91. Why did you separate the application into components?
	Answer: To keep the code modular and easier to maintain.

92. What is the use of the poll selector component?
	Answer: It helps users select a poll from the available list.

93. What is the use of the results chart component?
	Answer: It visualizes vote counts and percentages.

94. Why is a time utility module needed?
	Answer: To calculate poll timing and format user-friendly status messages.

95. What is the role of session storage in the app?
	Answer: It persists temporary UI state such as login or theme status.

### Security Questions

96. What security advantage does blockchain give this system?
	Answer: It makes vote data tamper-resistant and auditable.

97. Is your admin authentication secure enough for production?
	Answer: No, it is only suitable as a prototype-level admin flow.

98. Why is frontend-only admin control a limitation?
	Answer: Because frontend control can be bypassed if contract roles are missing.

99. Can a malicious user bypass the frontend checks?
	Answer: The frontend can be bypassed, but contract checks still protect the chain state.

100. How does the contract protect against duplicate voting?
	 Answer: By storing a voted status for each wallet and poll.

101. How does the contract protect against voting after expiry?
	 Answer: By checking poll end time before accepting a vote.

102. What are the privacy limitations of wallet-based voting?
	 Answer: Wallet-based voting is pseudonymous, so identity is not fully private or fully verified.

103. How can the system be improved for stronger security?
	 Answer: Add contract roles, stronger authentication, and automated tests.

104. What is role-based access control and why is it needed?
	 Answer: It is a permission system that restricts actions to approved users.

105. Why are automated tests important for security?
	 Answer: They help catch security and logic errors before deployment.

### Testing and Validation Questions

106. How did you test the project?
	 Answer: Through manual workflow testing of poll creation, voting, and result viewing.

107. What are the main manual test cases?
	 Answer: Valid poll creation, duplicate vote rejection, time-based result visibility, and error handling.

108. What happens if poll creation fails?
	 Answer: The contract rejects the transaction and the UI shows an error.

109. What happens if voting fails?
	 Answer: The contract rejects the transaction and the UI shows an error message.

110. How do you validate correct result display?
	 Answer: By comparing displayed results with the contract return values.

111. Why do you need contract-level testing?
	 Answer: To verify contract rules and prevent logic errors at the source.

112. Why do you need frontend-level testing?
	 Answer: To verify user flow, wallet connection, and message handling.

113. What should be tested in a future automated test suite?
	 Answer: Poll creation, voting, expiry checks, and result retrieval.

114. How do you know the system is working correctly?
	 Answer: By checking whether all contract rules and user flows behave as expected.

115. What are the current testing limitations?
	 Answer: The project currently relies mainly on manual validation.

### Advanced and Viva-Tricky Questions

116. How would you scale this system for thousands of polls?
	 Answer: Use indexing, pagination, and batched reads.

117. How would you support national-level voting securely?
	 Answer: Add stronger identity verification, governance, privacy, and scaling layers.

118. How would you make the system privacy-preserving?
	 Answer: Use cryptographic ballot privacy or zero-knowledge-based methods.

119. How would you stop coercion in blockchain voting?
	 Answer: Add identity verification and anti-coercion design, which is difficult in public chains.

120. How would you stop vote-selling or vote manipulation?
	 Answer: Use anonymous ballots, privacy-preserving proofs, and governance controls.

121. How would you add role-based poll creation on-chain?
	 Answer: Add role-based access control in the smart contract.

122. How would you replace the current admin login design?
	 Answer: Replace it with wallet-signature-based authentication.

123. How would you reduce gas cost in your contract?
	 Answer: Reduce storage, optimize reads, and minimize unnecessary writes.

124. How would you improve performance of poll listing?
	 Answer: Use pagination, indexing, and cached event data.

125. How would you add indexing for results and analytics?
	 Answer: Add an event indexer or subgraph-style layer.

126. What if the blockchain network goes down?
	 Answer: The app should fail gracefully and show network error guidance.

127. What if MetaMask signs the wrong account?
	 Answer: The user must switch to the correct wallet account.

128. What if the user changes the network while using the app?
	 Answer: The app should detect the change and reload or warn the user.

129. What if two users try to vote at the same time?
	 Answer: One transaction succeeds first; the other may fail if it violates contract rules.

130. What if a transaction fails after MetaMask confirmation?
	 Answer: The UI should show a failed transaction message and allow retry.

131. Why did you choose a time-based poll instead of manual closing?
	 Answer: Because it gives automatic closing without manual intervention.

132. What is the biggest limitation of your current architecture?
	 Answer: Frontend-only admin control and lack of on-chain role enforcement.

133. If you had more time, what would you improve first?
	 Answer: Add on-chain access control and automated tests first.

### Rapid Revision Questions

134. Define blockchain in one line.
	 Answer: Blockchain is a distributed ledger that stores data immutably.

135. Define smart contract in one line.
	 Answer: A smart contract is code that runs on blockchain and enforces rules.

136. Define dApp in one line.
	 Answer: A dApp is an application whose core logic runs on blockchain.

137. Define MetaMask in one line.
	 Answer: MetaMask is a wallet extension used to sign blockchain transactions.

138. Define Ganache in one line.
	 Answer: Ganache is a local blockchain used for testing Ethereum apps.

139. Define Truffle in one line.
	 Answer: Truffle is a framework for compiling and deploying contracts.

140. Define immutability in one line.
	 Answer: Immutability means blockchain data cannot be changed after confirmation.

141. Define decentralization in one line.
	 Answer: Decentralization means no single authority controls the data.

142. Define one-vote-per-wallet in one line.
	 Answer: One-vote-per-wallet means each wallet can vote only once in a poll.

143. Define live results in one line.
	 Answer: Live results are vote counts shown before the poll ends.

144. Define final results in one line.
	 Answer: Final results are the complete vote counts shown after the poll ends.

