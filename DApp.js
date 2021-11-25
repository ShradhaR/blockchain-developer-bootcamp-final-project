// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

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
        // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
        // mmDetected.appendChild(node)
      }
    } else {
      console.log('window.ethereum is not found')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
    }
  })
  

  // add in web3 here
        var web3 = new Web3(window.ethereum)

        const mmEnable = document.getElementById('mm-Connect');
        mmEnable.onclick = async () => {
        await ethereum.request({ method: 'eth_requestAccounts'})
        // grab mm-current-account
        // and populate it with the current address
        var mmCurrentAccount = document.getElementById('mm-To');
        mmCurrentAccount.value =ethereum.selectedAddress
        let mmTransfer = document.getElementById('mm-transfer')
        mmTransfer.disabled = false
        }
