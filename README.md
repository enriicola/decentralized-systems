# SmartChallenge Smart Contract

## Overview

SmartChallenge is a Solidity smart contract designed to facilitate a competition environment by suggesting a set of challenges spanning coding, math, and security exercises. These challenges are stored off-chain and yield flags upon successful completion. The smart contract, when provided with a player's address and the corresponding flag, updates the competition scoreboard. New challenges can be added to the contract, and their flags can be submitted by players, enhancing the competitive aspect of the platform.

## Smart Contract Features

### Challenges

Challenges are defined using the `Challenge` struct, which includes a unique `challengeId`, a corresponding `flag` to be submitted by players, and a `reward` representing the score given upon successful completion.

```solidity
struct Challenge {
    uint challengeId;
    string flag;
    uint256 reward;
}
```
