# SmartChallenge Smart Contract

## Overview

SmartChallenge is a Solidity smart contract designed to facilitate a competition environment by suggesting a set of challenges spanning coding, math, and security exercises. These challenges are stored off-chain and yield flags upon successful completion. The smart contract, when provided with a player's address and the corresponding flag, updates the competition scoreboard. New challenges can be added to the contract, and their flags can be submitted by players, enhancing the competitive aspect of the platform.

## Smart Contract Features

## Structures

- `Challenge`: This structure represents a challenge with an ID, a hashed flag (solution), and a reward.
- `Player`: This structure represents a player with a registration status, a score, and a record of solved challenges.

## State Variables

- `challenges`: A mapping from challenge IDs to `Challenge` structures.
- `players`: A mapping from player addresses to `Player` structures.
- `playerAddresses`: An array of addresses of all players.
- `owner`: The address of the contract owner.
- `challengeCounter`: A counter for the total number of challenges.

## Events

- `ChallengeCompleted`: Emitted when a player completes a challenge.
- `ChallengeAdded`: Emitted when a new challenge is added.

## Functions

- `submitFlag(uint _challengeId, string memory _flag)`: Allows a player to submit a flag (solution) for a challenge. If the flag is correct, the player's score is increased by the challenge's reward.
- `addChallenge(string memory _flag, uint256 _reward)`: Allows the contract owner to add a new challenge.
- `getScore(address _player)`: Returns the score of a player.
- `getPlayers()`: Returns the addresses of all players.
- `getScores()`: Returns the addresses of all players along with their scores.

## Modifiers

- `onlyOwner`: Ensures that only the contract owner can perform certain operations.

## Deployment

To deploy this contract, you need to have a development environment set up with Truffle or Hardhat, and a connection to an Ethereum network via Infura or a local node. You also need to have an account with enough Ether to deploy the contract. The contract is deployed by sending a transaction to the Ethereum network with the contract's bytecode and constructor arguments. After the transaction is confirmed, the contract is deployed at the resulting address.

## Interaction

To interact with this contract, you can use the Web3.js or Ethers.js libraries in a JavaScript environment, or the `ethers` or `web3` CLI in a shell environment. You need to have the ABI of the contract, the address of the deployed contract, and a connection to an Ethereum network. You can then call the contract's functions with the necessary arguments and the correct amount of gas.

## Testing

To test this contract, you can write tests in JavaScript with the Chai assertion library and the Mocha testing framework, and run them on a local Ethereum network like Ganache. You can test the conditions for the success and failure of each function, the events they emit, and the changes they make to the contract's state.

## Security

This contract does not have any known security issues. However, it is recommended to use tools like Slither or Mythril to analyze the contract for potential vulnerabilities, and to follow the best practices for smart contract development.