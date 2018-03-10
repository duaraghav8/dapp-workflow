/**
 * This script walks you through
 * 1. Programmatically compiling your solidity smart contract
 * 2. Deploying it through an Ethereum Node (Ganache CLI for development)
 * 3. Reading State Variable from the deployed Contract
 * 4. Modifying the state of the contracts by making a transaction to change the state variable's value
 * 5. Re-reading the variable to see the reflected changes
 *
 * Before running this script, run "ganache-cli --unlock 0" on another terminal
 * The coinbase account is the default primary local account on an Ethereum node. This is not to be confused with coinbase website.
 */


"use strict";

const web3 = require("web3"),
    solc = require("solc"), { question: wait } = require("readline-sync");

const Log = console.log,
    ETHEREUM_NODE_ADDRESS = "http://localhost:8545/", CONTRACT_NAME = "HelloWorld";

const transactionDefaults = {
    GAS: 4712388,
    GAS_PRICE: 100000000000
};

const contractCode = require("fs").readFileSync("./hello-world-contract.sol", "utf8");

const compiled = solc.compile(contractCode),
    byteCode = compiled.contracts[`:${CONTRACT_NAME}`].bytecode,
    abi = JSON.parse(compiled.contracts[`:${CONTRACT_NAME}`].interface);

const Eth = new web3(ETHEREUM_NODE_ADDRESS).eth;


wait(`Address of Ethereum Node is ${ETHEREUM_NODE_ADDRESS}`);
wait(`All transactions will be created using GAS ${transactionDefaults.GAS} and GAS PRICE ${transactionDefaults.GAS_PRICE}`);
wait(`The following contract will be deployed on the blockchain:\n${"-".repeat(80)}\n${contractCode}\n${"-".repeat(80)}`);
wait(`\nContract bytecode is:\n\n${byteCode}\n\nAnd its ABI (Application Binary Interface) is:\n${JSON.stringify(abi, null, 2)}`);

Eth.getCoinbase().then(accountAddress => {

    wait(`The coinbase Account address is ${accountAddress}`);
    wait("Press ENTER to deploy the contract...");

    const sendOptions = {
        from: accountAddress,
        gas: transactionDefaults.GAS,
        gasPrice: transactionDefaults.GAS_PRICE
    };

    new Eth.Contract(abi).deploy({ data: byteCode }).send(sendOptions).then(Contract => {

        wait(`Contract was deployed successfully at Ethereum address: ${Contract._address}`);
        wait("Press ENTER to read myStateVariable's value from the blockchain. This doesn't cost anything!");

        Contract.methods.myStateVariable().call().then(value => {

            wait(`Value of myStateVariable is ${value}`);

            const newValue = wait("Enter the new value for myStateVariable >");

            Contract.methods.modifyVariable(newValue).send(sendOptions).then(receipt => {

                wait(`Transaction was successful. Here is the receipt:\n${JSON.stringify(receipt, null, 4)}`);
                Log("Reading the new value of myStateVariable from the blockchain...");

                Contract.methods.myStateVariable().call().then(value => {
                    wait(`The new value of myStateVariable is ${value}`);
                    Log("That's the end of the workflow!");
                }).catch(error => {
                    Log(`An error occured while fetching the new value of myStateVariable:\n\n${error}`);
                });

            }).catch(error => {
                Log(`An error occured while creating transaction to change value of myStateVariable:\n\n${error}`);
            });

        }).catch(error => {
            Log(`An error occured while fetching the value of myStateVariable:\n\n${error}`);
        });

    }).catch(error => {
        Log(`An error occured while deploying the contract:\n\n${error}`);
    });

}).catch(error => {
    Log(`An error occured while fetching the coinbase account address:\n\n${error}`);
});
