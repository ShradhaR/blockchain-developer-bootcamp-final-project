# blockchain-developer-bootcamp-final-project
<B>Final Project Description</b>
This is Peer-to-Peer tipping DApp that allows user to tip another person using cryptocurruncy. Curruntly this dapp pays tip using ether.
Few use cases are customer tips waiter or bartender seperately than restaurent bill, Github user tip developers who completes task.

<h2>Application Workflow</h2>
1. User opens the p2p tipping website application.
2. User will initiate connection to Metamask.
3. After connecting to Metamask, Metamask will read user public key and popluate on website "To" field automatically.
4. User will manually enter "From" field with public key and "Amount" field in ether.
5. When user clicks on "Transfer" button, the Metmask will initiate smart contract to transfer the ether amount. This tip-treansfer-transaction will either result in successful transfer or faile due to certain reason.

<b>Future use cases: </b>
This DAPP can be further extended to be used on most leading web services such as Coinbase, Facebook, Github, Google Plus, Reddit, Slack, StockTwits, Tumblr, Twitter, and YouTube for tipping users. 

<b>Project User Interface Link: </b> https://tippingdapp.netlify.app/
<b>Screencast link: </b> https://www.loom.com/share/bb1e78ee44e043ff97bccdfd33ab5c5c
<b>Public Ethereum wallet for certification: </b> 0x8106C7CbD178ac2F716E892D67E9C0b8FD39Da4D

<b>Project Folder Structure: </b>
Clients: Project's Web3 Javascript frontend.
contracts: Smart contracts that are deployed in the Ropsten testnet.
migrations: Migration files for deploying contracts in contracts directory.
test: Unit test cases for smart contracts.

<h2>Installation Details</h2>
This project can be run locally or on Ropsten testnet. Truffle.config file has both configuration specified. 

<b>Prerequsitie: </b>
1. NVM v0.39.0
2. NPM v8.1.0
3. Node v16.13.0
5. Truffle
6. Ganache
8. Live Server Extension (optional)
9. Metamask
10. OpenZeppelin Contracts (v3.1.0)
11. Truffle/hdwallet-provider

<b> 1. Local Installation Steps to run unit tests: </b>
1. Truffle-config.js file has localhost settings. Local port number is 9545.
2. truffle compile
3. truffle develop 
4. migrate
5. test


<b> 2. Ropster testnet installation details: </b>
1. truffle migrate --network ropstern (optional:- Contract is already present on Ropstern testnet.
