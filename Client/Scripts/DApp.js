// 1. Define web3 smart contract parameters.
const ContractAddress = '0x7cED9286B6BD2294bBf322A67578598Fb739CF6e'
//#region ContractABI  
const contractABI =   [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      }
    ],
    "name": "TransferConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "TransferInitiated",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback",
    "payable": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "TipTransferInitiated",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "confirmTransfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tiptransferId",
        "type": "uint256"
      }
    ],
    "name": "getTipAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tiptransferId",
        "type": "uint256"
      }
    ],
    "name": "getSenderAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tiptransferId",
        "type": "uint256"
      }
    ],
    "name": "getReceiverAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tiptransferId",
        "type": "uint256"
      }
    ],
    "name": "getState",
    "outputs": [
      {
        "internalType": "enum Tipping.State",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
//#endregion

// 2. Detects the presence of MetaMask.
window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('window.ethereum is enabled')
      if (window.ethereum.isMetaMask === true) {
        console.log('MetaMask is active')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML += 'MetaMask Is Available!'         
      } else {
        console.log('MetaMask is not available')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML += 'MetaMask Not Available!'
       }
    } else {
      console.log('window.ethereum is not found')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
    }
  })
  
// 3. Connects to Metamask.
var web3 = new Web3(window.ethereum)
const mmEnable = document.getElementById('mm-Connect');
mmEnable.onclick = async () => {
await ethereum.request({ method: 'eth_requestAccounts'})
const SenderAddress = document.getElementById('mm-From');
SenderAddress.value =ethereum.selectedAddress
let mmTransfer = document.getElementById('mm-transfer')
mmTransfer.disabled = false
}

// 4. When user clicks "Transfer" button, it sends input parameters to a contract 
// (Allows a user to submit a transaction to update smart contract state.)
const btnTransfer = document.getElementById('mm-transfer');
btnTransfer.onclick = async () => {

  // grab value from html input
  const ReceiverAddress = document.getElementById('mm-To').value;
  // Amt is in ether
  const Amt = document.getElementById('mm-Amt').value; 
  //convert to wei
  const weiValue = Web3.utils.toWei(Amt, 'ether');
  //Console log values for troubleshooting
  console.log("User Entered amount: "+Amt)
  console.log("Ehter to wei conversion: "+weiValue)
  console.log("Sender address: "+ethereum.selectedAddress)
  console.log("User Entered Receiver Address: "+ReceiverAddress)
  console.log("Contract Address: "+ContractAddress)
  
  // instantiate smart contract instance
  const contractTippingTransfer = new web3.eth.Contract(contractABI, ContractAddress)
  console.log("Initiate Tipping contract calling")
  //const web3= new Web3("http://localhost:9545")
  contractTippingTransfer.setProvider(window.ethereum)
  
  // It will keep track of contract execution state.
  let mmtransferstatus = document.getElementById('mm-transferstatus')
  mmtransferstatus.innerHTML = 'Processing....'

  const result1 = await contractTippingTransfer.methods.TipTransferInitiated(ReceiverAddress, weiValue).send(
        {from: ethereum.selectedAddress, value:weiValue});
  const result = await contractTippingTransfer.events.TransferInitiated({from:ethereum.selectedAddress,to:ReceiverAddress},
  function(err,res){
        if(!err) {
         console.log("Message:"+ res.args._msg); }
        else {
         console.log(err); }
   });

  console.log("method "+result1)
  console.log("event "+result)
  let result_flag = "Success";

  await contractTippingTransfer.events.TransferConfirmed(ethereum.selectedAddress)
  .on('data', (event) => {
	 contractTippingTransfer.methods.confirmTransfer(result).send();
    console.log(event);
  })
  .on('data', event => console.log(event))
  .on('changed', changed => console.log(changed))
  .on('error', err => { result_flag = "Failed."})
  .on('connected', str => console.log(str))
  
  const senderBalance = await contractTippingTransfer.methods.getBalance(ethereum.selectedAddress).call();
  //5. Updates the frontend if the transaction is successful or not.
  mmtransferstatus.innerHTML = "<br> Transaction Status: "+result_flag
  //6. Displays information from your smart contract.
  const etherValue = Web3.utils.fromWei(senderBalance, 'ether');
  mmtransferstatus.innerHTML += "<br> Post transction balance : "+ etherValue +" ETH."
  console.log("Tipping contract execution completed!")

}



