// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Polling {
    struct Poll {
        uint256 id;
        string question;
        string[] options;
        mapping(uint256 => uint256) votes;
        mapping(address => bool) hasVoted;
        address creator;
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;
    
    event PollCreated(uint256 indexed pollId, string question, address indexed creator);
    event Voted(uint256 indexed pollId, uint256 optionIndex, address indexed voter);
    
    function createPoll(string memory _question, string[] memory _options) public returns (uint256) {
        require(_options.length >= 2, "Poll must have at least 2 options");
        require(_options.length <= 10, "Poll cannot have more than 10 options");
        require(bytes(_question).length > 0, "Question cannot be empty");
        
        uint256 pollId = pollCount++;
        Poll storage newPoll = polls[pollId];
        newPoll.id = pollId;
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.creator = msg.sender;
        newPoll.createdAt = block.timestamp;
        newPoll.isActive = true;
        
        emit PollCreated(pollId, _question, msg.sender);
        return pollId;
    }
    
    function vote(uint256 _pollId, uint256 _optionIndex) public {
        require(_pollId < pollCount, "Poll does not exist");
        Poll storage poll = polls[_pollId];
        require(poll.isActive, "Poll is not active");
        require(!poll.hasVoted[msg.sender], "You have already voted");
        require(_optionIndex < poll.options.length, "Invalid option");
        
        poll.votes[_optionIndex]++;
        poll.hasVoted[msg.sender] = true;
        
        emit Voted(_pollId, _optionIndex, msg.sender);
    }
    
    function getPollDetails(uint256 _pollId) public view returns (
        string memory question,
        string[] memory options,
        uint256 createdAt,
        bool isActive,
        address creator
    ) {
        require(_pollId < pollCount, "Poll does not exist");
        Poll storage poll = polls[_pollId];
        return (poll.question, poll.options, poll.createdAt, poll.isActive, poll.creator);
    }
    
    function getPollResults(uint256 _pollId) public view returns (uint256[] memory) {
        require(_pollId < pollCount, "Poll does not exist");
        Poll storage poll = polls[_pollId];
        uint256[] memory results = new uint256[](poll.options.length);
        
        for (uint256 i = 0; i < poll.options.length; i++) {
            results[i] = poll.votes[i];
        }
        
        return results;
    }
    
    function hasVoted(uint256 _pollId, address _voter) public view returns (bool) {
        require(_pollId < pollCount, "Poll does not exist");
        return polls[_pollId].hasVoted[_voter];
    }
}
