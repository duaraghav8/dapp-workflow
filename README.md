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

## Ropsten
1. Head to Ethereum Remix IDE
2. Create `DummyCoin.sol` and paste its code from local
3. Create `DummyCoinCrowdsale.sol` and paste its code from local
4. Fix the `import`s issue in Remix by simply replacing `openzeppelin-solidity/...` by `https://github.com/OpenZeppelin/openzeppelin-solidity/...` in all import statements
5. Log into your metamask wallet (chrome extension) and **select Ropsten Network** to ensure you don't end up spending real money. Make sure you have ether in your Ropsten account.
5. Under the `Run` tab, select the smart contract to deploy from dropdown menu, specify the constructor arguments (if any required), then click `Deploy`. Remember that **we will first deploy the token contract, then the crowdsale contract**. This is because the crowdsale contract requires us to pass the token contract's blockchain address as an argument in its constructor.
6. Keep in mind that in remix, address arguments are to be enclosed within double quotes.
7. Once both contracts are deployed, call `transferOwnership()` method of the Dummy Coin token you deployed first and provide the crowdsale's address to it. This tells the token contract that it has a new owner and allows the crowdsale to mint the tokens when someone wants to buy it.
8. Add your token's address to your metamask wallet under `tokens`. It will then show you that you currently hold 0 units of this token.
8. Go ahead and buy tokens by calling the `buyTokens()` method from the crowdsale contract. This will deduct test ETH from your Ropsten account and update your token balance. These changes will reflect in your metamask.

### Arguments for the Crowdsale contract
To deploy DummyCoinCrowdsale contract, you'll have to specify several arguments:

- `_openingTime`: The datetime at which the crowdsale will begin. This **must** be greater than the time at which you deploy the contract. Use `web3.eth.getBlock('latest').timestamp + N` to get a timestamp N seconds later than latest block's timestamp.
- `_closingTime`: The datetime at which the crowdsale closes.
- `_rate`: The number of tokens you wish to sell per wei. eg- `_rate = 1000` would mean that an investor who send 1 wei will get 1000 tokens.
- `_wallet`: The ethereum wallet to which all the funds collected from the crowdsale will be forwarded. This should ideally be your wallet so you get all the money collected from crowdsale. Should be enclosed within double quotes in Remix.
- `_token`: Address of the ERC20 token you deployed. Should be enclosed within double quotes in Remix.

Inspired by [this blog](https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6).
