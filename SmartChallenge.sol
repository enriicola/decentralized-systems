// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartChallenge{

    // state variables
    struct Challenge{
        uint challengeId;
        bytes32 flagHash;
        uint256 reward;
    }
    mapping(uint => Challenge) public challenges;
    address owner;
    address[] public players;
    mapping(address => bool) public isPlayer;
    uint256 public challengeCounter;
    mapping(address => uint) public scores;
    mapping(address => mapping(uint => bool)) public solvedChallenges;

    event ChallengeCompleted(address indexed player, uint _challenge);
    event ChallengeAdded(uint256 indexed challengeId, string _flag, uint256 _reward);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this operation");
        _;
    }

    function submitFlag(uint _challengeId, string memory _flag) public {
        require(challenges[_challengeId].challengeId == _challengeId, "Challenge does not exist");
        require(bytes(_flag).length > 0, "Flag cannot be empty");
        require(!solvedChallenges[msg.sender][_challengeId], "Challenge already solved by this player");
        require(challenges[_challengeId].flagHash == keccak256(abi.encodePacked(_flag)), "Incorrect flag");

        solvedChallenges[msg.sender][_challengeId] = true;
        scores[msg.sender] += challenges[_challengeId].reward;
        if (!isPlayer[msg.sender]) {
            players.push(msg.sender);
            isPlayer[msg.sender] = true;
        }
        emit ChallengeCompleted(msg.sender, challenges[_challengeId].challengeId);
    }

    function addChallenge(string memory _flag, uint256 _reward) public onlyOwner {
        challengeCounter++;
        challenges[challengeCounter] = Challenge(challengeCounter, keccak256(abi.encodePacked(_flag)), _reward);
        emit ChallengeAdded(challengeCounter, _flag, _reward);
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getScore(address _player) public view returns (uint) {
        return scores[_player];
    }
}