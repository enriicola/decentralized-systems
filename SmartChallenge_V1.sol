// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartChallenge {

    struct Challenge {
        uint challengeId;
        bytes32 flagHash;
        uint256 reward;
        string hash;
    }

    struct Player {
        bool isRegistered;
        uint256 score;
        mapping(uint => bool) solvedChallenges;
    }

    mapping(uint => Challenge) public challenges;
    mapping(address => Player) public players;
    address[] public playerAddresses;
    address public owner;
    uint256 public challengeCounter;

    event ChallengeCompleted(address indexed player, uint256 _challenge);
    event ChallengeAdded(uint256 indexed challengeId, string _flag, uint256 _reward, string _hash);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this operation");
        _;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function submitFlag(uint _challengeId, string memory _flag) public {
        require(challenges[_challengeId].challengeId == _challengeId, "Challenge does not exist");
        require(bytes(_flag).length > 0, "Flag cannot be empty");
        require(!players[msg.sender].solvedChallenges[_challengeId], "Challenge already solved by this player");
        require(challenges[_challengeId].flagHash == keccak256(abi.encodePacked(_flag)), "Incorrect flag");

        players[msg.sender].solvedChallenges[_challengeId] = true;
        players[msg.sender].score += challenges[_challengeId].reward;

        if (!players[msg.sender].isRegistered) {
            players[msg.sender].isRegistered = true;
            playerAddresses.push(msg.sender);
        }

        emit ChallengeCompleted(msg.sender, challenges[_challengeId].challengeId);
    }

    function addChallenge(string memory _flag, uint256 _reward, string memory _hash) public onlyOwner {
        require(bytes(_flag).length > 0, "Flag cannot be empty");
        challenges[challengeCounter] = Challenge(challengeCounter, keccak256(abi.encodePacked(_flag)), _reward,  _hash);
        challengeCounter++;
        emit ChallengeAdded(challengeCounter, _flag, _reward, _hash);
    }

    function getChallenges() public view returns (Challenge[] memory) {
        Challenge[] memory allChallenges = new Challenge[](challengeCounter);

        for (uint i = 0; i < challengeCounter; i++) {
            allChallenges[i] = challenges[i];
        }

        return allChallenges;
    }

    function getScore(address _player) public view returns (uint) {
        return players[_player].score;
    }

    function getPlayers() public view returns (address[] memory) {
        return playerAddresses;
    }

    function getSolvedChallenge(address playerAddress, uint challengeIndex) public view returns (bool) {
        return players[playerAddress].solvedChallenges[challengeIndex];
    }



    function getScores() public view returns (address[] memory, uint[] memory) {
        uint[] memory playerScores = new uint[](playerAddresses.length);
        for (uint i = 0; i < playerAddresses.length; i++) {
            playerScores[i] = players[playerAddresses[i]].score;
        }
        return (playerAddresses, playerScores);
    }
}