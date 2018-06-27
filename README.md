# ICO contracts using OpenZeppelin, Truffle, Ganache CLI & Remix IDE
This guide walks you through creating an ERC20 token and a Mintable, Timed crowdsale for it. It shows you how to deploy and interact with your token in development environment (ganache) through Truffle, then on staging environment (Ethereum Ropsten Network) through Remix IDE. I recommend you to use Metamask as your wallet for deploying to Ropsten.

See live demo of my Token and Crowdsale:
- SRE token: [0x1e3c5ede7fb7089afcd29979bcf5adad0c1e154d](https://ropsten.etherscan.io/address/0x1e3c5ede7fb7089afcd29979bcf5adad0c1e154d)
- Crowdsale: [0x3db92571d8d5827f5d3f1edb38ee05ce32676db5](https://ropsten.etherscan.io/address/0x3db92571d8d5827f5d3f1edb38ee05ce32676db5)

## Note
This tutorial involves no real money. If you find yourself using it somewhere, you're doing something (terribly) wrong. I'm not responsible for any charges you may incur.

# Prerequisites
- Download Metamask Chrome extension
- Get yourself some test Ether from Ropsten faucet

## Commands
```
npm i -g ganache-cli truffle solium
mkdir DummyCoinICO && cd DummyCoinICO

truffle init
npm init
solium --init
[Add contracts/Migrations.sol to .soliumignore]
npm i -E zeppelin-solidity

touch contracts/DummyCoin.sol contracts/DummyCoinCrowdsale.sol
[Add code to contracts/DummyCoin.sol]
[Add code to contracts/DummyCoinCrowdsale.sol]

solium -d contracts/ --fix
[Fix lint issues manually if needed]

touch migrations/2_deploy_contracts.js
[Add deployment code in migrations/2_deploy_contracts.js]
[Add development network configuration in truffle.js]

truffle compile
(In a separate window) ganache-cli
truffle migrate

truffle console
> sale = DummyCoinCrowdsale.at(DummyCoinCrowdsale.address)
> token = DummyCoin.at(DummyCoin.address)
> (Check wallet ETH balance) web3.eth.getBalance(web3.eth.coinbase)
> (Check DummyCoin balance of coinbase/default account to ensure its 0) token.balanceOf(web3.eth.coinbase)
> (Transfer DummyCoin contract's ownership to DummyCoinCrowdsale contract) token.transferOwnership(DummyCoinCrowdsale.address)
> (Buy DummyCoin worth 10 ether) sale.sendTransaction({from: web3.eth.coinbase, value: web3.toWei(10, "ether")})
> (Check DummyCoin balance for coinbase account again to notice the new balance) token.balanceOf(web3.eth.coinbase)
```

Inspired by [this blog](https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6)
