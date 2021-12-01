# blockchain-developer-bootcamp-final-project
<H2>Final Project Description</h2>
<p>This is Peer-to-Peer tipping DApp that allows user to tip another person using cryptocurrency. Currently this dapp pays tip using ether.
Few use cases are customer tips waiter or bartender separately than restaurant bill, Github user tip developers who completes task. </p>

<b>Application Workflow</b>
1. User opens the p2p tipping website application. <br>
2. User will initiate connection to Metamask. <br>
3. After connecting to Metamask, Metamask will read user public key and populate on website "To" field automatically. <br>
4. User will manually enter "From" field with public key and "Amount" field in ether. <br>
5. When user clicks on "Transfer" button, the Metmask will initiate smart contract to transfer the ether amount. This tip-transfer-transaction will either result in successful transfer or fail due to certain reasons.

<b>Future use cases: </b>
<p>This DAPP can be further extended to be used on most leading web services such as Coinbase, Facebook, Github, Google Plus, Reddit, Slack, StockTwits, Tumblr, Twitter, and YouTube for tipping users. </p>

<b>Project User Interface Link: </b> https://tippingdapp.netlify.app/
<br><b>Screencast link: </b> https://www.loom.com/share/bb1e78ee44e043ff97bccdfd33ab5c5c
<br><b>Public Ethereum wallet for certification: </b> 0x8106C7CbD178ac2F716E892D67E9C0b8FD39Da4D

<b>Project Folder Structure: </b>
* Clients: Project's Web3 Javascript frontend. 
* contracts: Smart contracts that are deployed in the Ropsten testnet. 
* migrations: Migration files for deploying contracts in contracts directory.
* test: Unit test cases for smart contracts.

<h2>Installation Details</h2>
<p>This project can be run locally or on Ropsten testnet. Truffle.config file has both configurations specified. </p>

<b>Prerequisite: </b>
1. NVM v0.39.0
2. NPM v8.1.0
3. Node LTS v16.13.0 (nvm install --lts)
5. Truffle (npm install -g truffle)
6. Ganache (npm install -g ganache-cli)
8. Live Server Extension (optional)
9. Metamask
10. OpenZeppelin Contracts (v3.1.0) (npm i @openzeppelin/contracts)
11. Truffle/hdwallet-provider (npm install @truffle/hdwallet-provider)
12. dotenv (npm install dotenv)

<b> 1. Local Installation Steps to run unit tests: </b>
1. Truffle-config.js file has localhost settings. Local port number is 9545.
2. truffle compile
3. truffle develop 
4. migrate
5. test


<b> 2. Ropster testnet installation details: </b>
1. If any prerequisite is missing, please refer prerequisite section to install dependencies.
2. truffle migrate --network ropstern (optional:- Contract is already present on Ropstern testnet.

<b> Test Result Screenshot </b>
![image](https://user-images.githubusercontent.com/35179350/144125414-c9b4db16-9bff-4f39-9b7d-4ed277c47a5b.png)
