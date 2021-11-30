# blockchain-developer-bootcamp-final-project
<B>Final Project Description</b>
This is Peer-to-Peer tipping DApp that allows user to tip another person using cryptocurruncy. 
Few use cases are customer tips waiter or bartender seperately, Github user tip developers who completes task.

<b>Application Workflow</b>
1. User opens the p2p tipping website application.
2. User will initiate connection to metamask.
3. After connecting to metamask, metamask will read user public key and popluate on website "To" field automatically.
4. User will manually enter "From" field with public key and "Amount" field in ether.
5. When user clicks on send, the metmask will initiate smart contract to transfer the amount. This will redirect user to next page where user can see if transfer is completed or failed due to certain reason.

<b>Future use cases: </b>
This DAPP can be used on most leading web services such as Coinbase, Facebook, Github, Google Plus, Reddit, Slack, StockTwits, Tumblr, Twitter, and YouTube for tipping users. 

<b>Project Frontend Link: </b> <<>>

<b>Public Ethereum wallet for certification: </b> 0x8106C7CbD178ac2F716E892D67E9C0b8FD39Da4D

<b>Project Folder Structure:-</b>
client: Project's Web3 Javascript frontend.
contracts: Smart contracts that are deployed in the Ropsten testnet.
migrations: Migration files for deploying contracts in contracts directory.
test: Tests for smart contracts.

<b>Installation Steps</b>
This project cn be run locally or on ropster testnet. Truffle.config file has both configuration specified.

Prerequsitie:-
1. Truffle
2. Ganache
3. Node.js
4. Live Server Extension
5. Metamask
6. 

<b> 1. Local Installation Steps:- </b>
1. truffle compile
2. truffle develop
3. migrate
4. test


<b> 2. Ropster testnet installation Steps</b>
1. truffle migrate --network ropstern
