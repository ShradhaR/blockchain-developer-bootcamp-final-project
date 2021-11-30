// 1. Define web3 smart contract parameters.
const ContractAddress = '0xc0BDA0Ea2B28186562e76a3eddAf87eb1667e5ce'

const contractABI = [
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
  
// 2. Using the 'load' event listener for Javascript to check if Metamask/window.ethereum is available
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
      mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
    }
  })
  

// 3. Connect to Metamask
var web3 = new Web3(window.ethereum)
const mmEnable = document.getElementById('mm-Connect');
mmEnable.onclick = async () => {
await ethereum.request({ method: 'eth_requestAccounts'})
const SenderAddress = document.getElementById('mm-From');
SenderAddress.value =ethereum.selectedAddress
let mmTransfer = document.getElementById('mm-transfer')
mmTransfer.disabled = false
}

// 4. When user clicks Transfer button, send input parameters to a contract
const btnTransfer = document.getElementById('mm-transfer');
btnTransfer.onclick = async () => {

  // grab value from input
  const ReceiverAddress = document.getElementById('mm-To').value;
  const Amt = document.getElementById('mm-Amt').value; // Amt is in ether
  //convert to wei
  const weiValue = Web3.utils.toWei(Amt, 'ether');
  //log values for troubleshooting
  console.log("User Entered amount: "+Amt)
  console.log("Ehter to wei conversion: "+weiValue)
  console.log("Sender address: "+ethereum.selectedAddress)
  console.log("User Entered Receiver Address: "+ReceiverAddress)
  console.log("Contract Address: "+ContractAddress)
  
  // instantiate smart contract instance
  const contractTippingTransfer = new web3.eth.Contract(contractABI, ContractAddress)
  console.log("Called Tipping contract sucessfully.")
  //const web3= new Web3("http://localhost:9545")
  contractTippingTransfer.setProvider(window.ethereum)

  await contractTippingTransfer.methods.TipTransferInitiated(ReceiverAddress, weiValue).send(
    {from: ethereum.selectedAddress, value:weiValue}
    ,
    function(err, transactionHash) {
      if (err) {
            console.log('Payment failed', err);
            //$('#status').html('Payment failed');
        } else {
            console.log("Payment was successful... data returned is: ", transactionHash);
            
       } }
    ); 

//   const result = await contractTippingTransfer.events.TransferInitiated(ethereum.selectedAddress,ReceiverAddress)
//   .on('data', (event) => {
// 	 contractTippingTransfer.methods.TipTransferInitiated(ReceiverAddress, weiValue).send(
//     {from: ethereum.selectedAddress, value:weiValue});
//     console.log("event"+event);
//  })
    // .on('data', event => console.log(event))
    // .on('changed', changed => console.log(changed))
    // .on('error', err => {throw err})
    //.on('connected', str => console.log(str))
  let mmtransferstatus = document.getElementById('mm-transferstatus')
  mmtransferstatus.innerHTML = 'Processing....'

  // const result1 = await contractTippingTransfer.methods.TipTransferInitiated(ReceiverAddress, weiValue).send(
  //       {from: ethereum.selectedAddress, value:weiValue});
  // const result = await contractTippingTransfer.events.TransferInitiated({from:ethereum.selectedAddress,to:ReceiverAddress},
  // function(err,res){
  //       if(!err)
  //       {
  //        //console.log("has this message:"+ res.args._msg);
  //       }
  //       else
  //       {
  //        console.log(err);
  //       }
  //  });

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
  
  const senderaddress = await contractTippingTransfer.methods.getBalance(ethereum.selectedAddress).call();
  mmtransferstatus.innerHTML = "<br> Transaction Status: "+result_flag
  mmtransferstatus.innerHTML += "<br> Post transction balance : "+ senderaddress

 
}



