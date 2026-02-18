// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Polling {
    // Constants
    uint256 private constant MIN_OPTIONS = 2;
    uint256 private constant MAX_OPTIONS = 10;
    uint256 private constant MAX_DURATION_HOURS = 8760; // 1 year
    
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
    }
    
    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;
    
    event PollCreated(uint256 indexed pollId, string question, address indexed creator);
    event Voted(uint256 indexed pollId, uint256 optionIndex, address indexed voter);
    
    // Modifiers
    modifier pollExists(uint256 _pollId) {
        require(_pollId < pollCount, "Poll does not exist");
        _;
    }
    
    modifier votingActive(uint256 _pollId) {
        require(polls[_pollId].isActive, "Poll is not active");
        require(block.timestamp < polls[_pollId].endTime, "Voting period has ended");
        _;
    }
    
    modifier votingEnded(uint256 _pollId) {
        require(block.timestamp >= polls[_pollId].endTime, "Results not available until voting period ends");
        _;
    }
    
    /**
     * Create a new poll with question, options, and voting duration
     * @param _question The poll question
     * @param _options Array of answer options
     * @param _durationInHours Voting duration in hours (max 8760 = 1 year)
     * @return pollId The ID of the created poll
     */
    function createPoll(string memory _question, string[] memory _options, uint256 _durationInHours) public returns (uint256) {
        require(_options.length >= MIN_OPTIONS, "Poll must have at least 2 options");
        require(_options.length <= MAX_OPTIONS, "Poll cannot have more than 10 options");
        require(bytes(_question).length > 0, "Question cannot be empty");
        require(_durationInHours > 0, "Duration must be greater than 0");
        require(_durationInHours <= MAX_DURATION_HOURS, "Duration cannot exceed 1 year (8760 hours)");
        
        uint256 pollId = pollCount++;
        Poll storage newPoll = polls[pollId];
        newPoll.id = pollId;
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.creator = msg.sender;
        newPoll.createdAt = block.timestamp;
        newPoll.endTime = block.timestamp + (_durationInHours * 1 hours);
        newPoll.isActive = true;
        
        emit PollCreated(pollId, _question, msg.sender);
        return pollId;
    }
    
    /**
     * Submit a vote for a poll option
     * @param _pollId The poll ID
     * @param _optionIndex The index of the option to vote for
     */
    function vote(uint256 _pollId, uint256 _optionIndex) public pollExists(_pollId) votingActive(_pollId) {
        Poll storage poll = polls[_pollId];
        require(!poll.hasVoted[msg.sender], "You have already voted");
        require(_optionIndex < poll.options.length, "Invalid option");
        
        poll.votes[_optionIndex]++;
        poll.hasVoted[msg.sender] = true;
        
        emit Voted(_pollId, _optionIndex, msg.sender);
    }
    
    /**
     * Get detailed information about a poll
     * @param _pollId The poll ID
     * @return question The poll question
     * @return options Array of poll options
     * @return createdAt Creation timestamp
     * @return endTime Voting end timestamp
     * @return isActive Whether poll is active
     * @return creator Address of poll creator
     */
    function getPollDetails(uint256 _pollId) public view pollExists(_pollId) returns (
        string memory question,
        string[] memory options,
        uint256 createdAt,
        uint256 endTime,
        bool isActive,
        address creator
    ) {
        Poll storage poll = polls[_pollId];
        return (poll.question, poll.options, poll.createdAt, poll.endTime, poll.isActive, poll.creator);
    }
    
    /**
     * Get voting results for a poll (only available after voting ends)
     * @param _pollId The poll ID
     * @return results Array of vote counts for each option
     */
    function getPollResults(uint256 _pollId) public view pollExists(_pollId) votingEnded(_pollId) returns (uint256[] memory) {
        Poll storage poll = polls[_pollId];
        uint256[] memory results = new uint256[](poll.options.length);
        
        for (uint256 i = 0; i < poll.options.length; i++) {
            results[i] = poll.votes[i];
        }
        
        return results;
    }
    
    /**
     * Check if an address has voted in a poll
     * @param _pollId The poll ID
     * @param _voter The voter address
     * @return hasVoted True if the voter has already voted
     */
    function hasVoted(uint256 _pollId, address _voter) public view pollExists(_pollId) returns (bool) {
        return polls[_pollId].hasVoted[_voter];
    }
}
