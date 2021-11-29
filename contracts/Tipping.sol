// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title Tipping Smart Contract
*
* @dev @notice This contract allows :
*               1. Enable tip transfer in the form of ether from one account to another account.
*               2. Keep records for each tip transfer as transferId. transferId is generated by hashing combination of sender address, receiver address, amount, timestamp.
*               3. View account balance for both sender and receiver of the tip transcation.
*
* @author Shradha Rajmane
*
*/
contract Tipping is Ownable 
{
  
  enum State { None, Initiated, Confirmed }

  struct TipTransfer {
        address payable FromAddress;
        address payable ToAddress;
        uint amount;
        State state;
        uint timestamp;
    }
    
  /// @dev The transferId (key) and TipTransfer object (value) are initialized on the mapping (hash table) tiptransfers.
  mapping (bytes32 => TipTransfer) tip_transfers;

  /// @notice Emitted when a user initate the tip transfer.
  /// @param from sender address
  /// @param to receiver's address
  event TransferInitiated(address from, address to);

  /// @notice Emitted when a tip transfer completes.
  /// @param from sender address
  event TransferConfirmed(address from);

  constructor() public payable
  {
    //To = 0x8106C7CbD178ac2F716E892D67E9C0b8FD39Da4D;
    //From = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;

  } 

  /// @notice @dev Initiate Tip transfer on the blockchain
  /// @param _to receiver's address
  /// @param amt Tip amount to transfer in ether
  function TipTransferInitiated(address payable _to, uint amt) public payable onlyOwner 
  {
    require(msg.value >= amt);
    bytes32 transferId = sha256(abi.encodePacked(msg.sender, _to, amt, block.timestamp));
    TipTransfer storage tiptransfer = tip_transfers[transferId];

    if (tiptransfer.state != State.None) return ;

    tiptransfer.FromAddress    = payable(msg.sender);
    tiptransfer.ToAddress      = _to;
    tiptransfer.amount         = amt;
    tiptransfer.state          = State.Initiated;
    tiptransfer.timestamp	     = block.timestamp;

    //balances[msg.sender] -= amt;
    //To = payable(_to);  
          
    tiptransfer.ToAddress.transfer(amt);

    address owner = owner();
    (bool success, ) = owner.call{ value: msg.value }("");
    require(success, "Tipping transaction initialization failed.");
    // Notify the receiver that the transfer is requested
    emit TransferInitiated(msg.sender, _to);
  }

  /// @notice @dev Confirms Tip transfer to the sender.
  /// @param transferId universally-unique identifier (UUID).
  function confirmTransfer(bytes32 transferId) public returns (bool) 
  {
    TipTransfer storage tiptransfer = tip_transfers[transferId];
    if (msg.sender != tiptransfer.ToAddress || tiptransfer.state != State.Initiated) 
      return false;
        
    tiptransfer.state = State.Confirmed;
    emit TransferConfirmed(tiptransfer.FromAddress);       
    return true;
  }

  /// @notice @dev Fallback function - Called if other functions don't match call or sent ether without data.
  fallback () external payable 
  {
    revert("fallback function");
  }
  receive() external payable 
  {
    revert("receive function");
  }

  /// @notice @dev Get the balance of the sender or receiver of this transaction.
  /// @param transferId universally-unique identifier (UUID)
  /// @return amt tip amount in ether 
  function getAmount(bytes32 transferId) public view returns (uint amt) 
  {
    TipTransfer storage tiptransfer = tip_transfers[transferId];
    if (msg.sender != tiptransfer.ToAddress && msg.sender != tiptransfer.FromAddress) 
      return 0;
    return tiptransfer.amount;
  }

  /// @dev get balance of an account
  /// @param account the account address
  /// @return balance account balance in ether
  function getBalance(address account) public view returns (uint256 balance) 
  {
        //return balanceOf(account);
        return account.balance;
  }

}