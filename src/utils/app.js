import Web3 from 'web3';

// ===== CONFIGURATION =====
const GANACHE_CHAIN_IDS = ["0x539"]; // 1337 (0x539)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS; // From .env file

const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "pollId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "PollCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "pollId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "optionIndex",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_question",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			}
		],
		"name": "createPoll",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			}
		],
		"name": "getPollDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "options",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			}
		],
		"name": "getPollResults",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pollCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "polls",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_optionIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; // Update after deployment

// ===== WEB3 STATE =====
let web3 = null;
let contract = null;
let accounts = [];

// ===== EXPORTED FUNCTIONS =====

/**
 * Initialize Web3 and connect to MetaMask
 * @returns {Promise<Object>} Object with web3, contract, and accounts
 */
export async function initWeb3() {
	if (typeof window.ethereum === 'undefined') {
		throw new Error('Please install MetaMask to use this application!');
	}

	if (!CONTRACT_ADDRESS) {
		throw new Error('Contract address not configured. Set VITE_CONTRACT_ADDRESS in your .env file.');
	}

	try {
		web3 = new Web3(window.ethereum);

		// Request accounts
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts = await web3.eth.getAccounts();

		if (!accounts || accounts.length === 0) {
			throw new Error('No accounts found. Please connect MetaMask.');
		}

		// Ensure we are on Ganache
		let chainId = await window.ethereum.request({ method: 'eth_chainId' });
		if (!GANACHE_CHAIN_IDS.includes(chainId)) {
			// Try switch to 5777 first, then 1337
			for (const target of GANACHE_CHAIN_IDS) {
				try {
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: target }],
					});
					chainId = target;
					break;
				} catch (switchErr) {
					// If the chain is not added, attempt to add it
					if (switchErr.code === 4902) {
						const is5777 = target === '0x1691';
						const is1337 = target === '0x539';
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{
								chainId: target,
								chainName: is5777 ? 'Ganache (5777)' : 'Ganache (1337)',
								nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
								rpcUrls: ['http://127.0.0.1:7545'],
								blockExplorerUrls: [],
							}],
						});
					}
				}
			}
		}

		// Instantiate contract
		contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

		// Verify contract exists on this network
		const code = await web3.eth.getCode(CONTRACT_ADDRESS);
		if (!code || code === '0x') {
			throw new Error('Contract not found on current network. Switch MetaMask to your Ganache network used for deployment.');
		}

		// Setup event listeners
		window.ethereum.on('accountsChanged', async (newAccounts) => {
			accounts = newAccounts;
		});
		window.ethereum.on('chainChanged', () => {
			// Reload to re-init contract on the new chain
			window.location.reload();
		});

		return { web3, contract, accounts, chainId };
	} catch (error) {
		throw new Error('Error connecting to MetaMask: ' + error.message);
	}
}

/**
 * Get the current web3 instance
 * @returns {Web3 | null}
 */
export function getWeb3() {
	return web3;
}

/**
 * Get the contract instance
 * @returns {Object | null}
 */
export function getContract() {
	return contract;
}

/**
 * Get connected accounts
 * @returns {Array}
 */
export function getAccounts() {
	return accounts;
}

/**
 * Get the current connected account
 * @returns {string}
 */
export function getCurrentAccount() {
	return accounts[0] || null;
}

/**
 * Create a new poll
 * @param {string} question - Poll question
 * @param {Array<string>} options - Array of poll options
 * @returns {Promise<string>} Poll ID
 */
export async function createPoll(question, options) {
	if (!contract || !accounts[0]) {
		throw new Error('Web3 not initialized or no account connected');
	}

	if (options.length < 2) {
		throw new Error('Please provide at least 2 options');
	}

	try {
		const result = await contract.methods.createPoll(question, options).send({
			from: accounts[0],
			gas: 3000000,
		});

		return result.events.PollCreated.returnValues.pollId;
	} catch (error) {
		throw new Error('Error creating poll: ' + error.message);
	}
}

/**
 * Get all polls
 * @returns {Promise<Array>} Array of poll objects
 */
export async function getAllPolls() {
	if (!contract) {
		throw new Error('Web3 not initialized');
	}

	try {
		const pollCount = await contract.methods.pollCount().call();
		const polls = [];

		for (let i = 0; i < pollCount; i++) {
			const poll = await contract.methods.getPollDetails(i).call();
			polls.push({
				id: i,
				question: poll.question,
				options: poll.options,
				creator: poll.creator,
				createdAt: poll.createdAt,
				isActive: poll.isActive,
			});
		}

		return polls;
	} catch (error) {
		throw new Error('Error loading polls: ' + error.message);
	}
}

/**
 * Get details for a specific poll
 * @param {number} pollId - Poll ID
 * @returns {Promise<Object>} Poll details
 */
export async function getPollDetails(pollId) {
	if (!contract) {
		throw new Error('Web3 not initialized');
	}

	try {
		const poll = await contract.methods.getPollDetails(pollId).call();
		return {
			id: pollId,
			question: poll.question,
			options: poll.options,
			creator: poll.creator,
			createdAt: poll.createdAt,
			isActive: poll.isActive,
		};
	} catch (error) {
		throw new Error('Error loading poll details: ' + error.message);
	}
}

/**
 * Check if user has voted in a poll
 * @param {number} pollId - Poll ID
 * @param {string} voterAddress - Voter address (optional, uses current account if not provided)
 * @returns {Promise<boolean>}
 */
export async function hasVoted(pollId, voterAddress = null) {
	if (!contract) {
		throw new Error('Web3 not initialized');
	}

	const voter = voterAddress || accounts[0];
	if (!voter) {
		throw new Error('No account connected');
	}

	try {
		return await contract.methods.hasVoted(pollId, voter).call();
	} catch (error) {
		throw new Error('Error checking vote status: ' + error.message);
	}
}

/**
 * Submit a vote for a poll option
 * @param {number} pollId - Poll ID
 * @param {number} optionIndex - Option index to vote for
 * @returns {Promise<Object>} Transaction receipt
 */
export async function submitVote(pollId, optionIndex) {
	if (!contract || !accounts[0]) {
		throw new Error('Web3 not initialized or no account connected');
	}

	try {
		return await contract.methods.vote(pollId, optionIndex).send({
			from: accounts[0],
			gas: 300000,
		});
	} catch (error) {
		throw new Error('Error submitting vote: ' + error.message);
	}
}

/**
 * Get poll results
 * @param {number} pollId - Poll ID
 * @returns {Promise<Object>} Results with options and vote counts
 */
export async function getPollResults(pollId) {
	if (!contract) {
		throw new Error('Web3 not initialized');
	}

	try {
		const poll = await contract.methods.getPollDetails(pollId).call();
		const results = await contract.methods.getPollResults(pollId).call();
		const totalVotes = results.reduce((sum, votes) => sum + BigInt(votes), 0n);

		const parsedResults = poll.options.map((option, index) => {
			const votes = BigInt(results[index]);
			const percentage = totalVotes > 0 ? (Number(votes) / Number(totalVotes)) * 100 : 0;
			return {
				option,
				votes: Number(votes),
				percentage: parseFloat(percentage.toFixed(2)),
			};
		});

		return {
			pollId,
			question: poll.question,
			totalVotes: Number(totalVotes),
			results: parsedResults,
		};
	} catch (error) {
		throw new Error('Error loading results: ' + error.message);
	}
}
