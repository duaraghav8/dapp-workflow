# Ethereum DApp Development Workshop

This repository contains material to teach you Smart Contract development workflow using [Ganache CLI](https://github.com/trufflesuite/ganache-cli), [Web3 v1](https://github.com/ethereum/web3.js/), [SolcJS](https://github.com/ethereum/solc-js) and [Solium](https://github.com/duaraghav8/Solium).

It is slightly more complex than using Truffle for contract deployment. But it is necessary for first-timers so they can grasp the foundational knowledge about various core concepts of Ethereum and how to work with them.

You should already have NodeJS and NPM installed on your machine.

## Steps
1. `git clone` this repository on to your workstation.
2. Run npm commands to install global modules (ganache-cli, solium) and local ones (solc, web3, readline-sync) and create solium config files (`solium --init`). Either do these yourself (recommended) or run `prerequisites.sh`.
3. View `hello-world-contract.sol` once.
4. Lint the contract with Solium for security checks using `solium -f hello-world-contract.sol`. Fix any issues being shown.
5. In a separate window, launch ganache with 1st account unlocked using `ganache-cli --unlock 0`.
6. Run `deployer.js` script. Keep pressing ENTER or giving inputs where asked.
7. See CLI logs & ganache outputs side-by-side to understand the actions being performed.

## Modules

`deployer.js` is an interactive application that walks you through:

1. Programmatically compiling your solidity smart contract
2. Deploying it through an Ethereum Node (Ganache CLI for development)
3. Reading State Variable from the deployed Contract
4. Modifying the state of the contract by making a transaction to change the state variable's value
5. Re-reading the variable to see the reflected changes

This script expects an ethereum node running on `http://localhost:8545/` (so run Ganache before running it).

NOTE: The **coinbase account** is the default primary local account on an Ethereum node. This is not to be confused with coinbase website.


`hello-world-contract.sol` is the Smart Contract we'll be deploying on the ethereum blockchain (simulated by Ganache). (We will first lint this contract for style & security using [Solium](https://github.com/duaraghav8/Solium)).


`prerequisites.sh` is a simple Bash script that installs the necessary NPM dependencies and sets up solium configuration files. It is to be run before running `deployer.js`. We recommend you run all the commands from this file yourselves so you know all the actions being performed prior to deploying a contract to ethereum blockchain.

## ICO tutorial
See the `ico` branch in this repository.
