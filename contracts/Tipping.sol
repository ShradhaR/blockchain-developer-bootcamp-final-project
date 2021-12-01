// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title Tipping Smart Contract
*
* @dev @notice This contract allows :
*               1. Enable tip transfer in the form of ether from one account to another account.
*               2. Keep records for each tip transfer as tiptransferId. 
*               3. Share sender's account balance post tip transcation.
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
        uint256 amount;
        State state;
        uint timestamp;
    }
    
  /// @notice Keep records for each tip transfer as tiptransferId. 
  uint tiptransferId;

  /// @dev The tiptransferId (key) and TipTransfer object (value) are initialized on the mapping (hash table).
  mapping (uint => TipTransfer) tip_transfer_records;

  /// @notice Emit when a user initate the tip transfer.
  /// @param from sender address
  /// @param to receiver's address
  event TransferInitiated(address from, address to);

  /// @notice Emit when a tip transfer completes.
  /// @param from sender address
  event TransferConfirmed(address from);

  constructor() public 
  {  tiptransferId = 0; } 

  /// @notice @dev Initiate Tip transfer on the blockchain.
  /// @param _to receiver's address
  /// @param amt Tip amount to transfer in ether
  function TipTransferInitiated(address payable _to, uint256 amt) public payable 
  onlyOwner
  returns(uint)
  {
      
    tip_transfer_records[tiptransferId] = TipTransfer({
    FromAddress    : payable(msg.sender),
    ToAddress      : _to,
    amount         : amt,
    state          : State.Initiated,
    timestamp	     : block.timestamp });
         
    _to.transfer(amt);
  
    // address owner = owner();
    // (bool success, ) = owner.call{ value: msg.value }("");
    // require(success, "Tipping transaction initialization failed.");
    //Notify the receiver that the transfer is requested
    emit TransferInitiated(msg.sender, _to);
    return tiptransferId++;
  }

  /// @notice @dev Confirms tip has transfered to the sender.
  function confirmTransfer() public returns (bool) 
  {
    if (msg.sender != tip_transfer_records[tiptransferId].FromAddress || 
         tip_transfer_records[tiptransferId].state != State.Initiated) 
      return false;
        
    tip_transfer_records[tiptransferId].state = State.Confirmed;
    emit TransferConfirmed(tip_transfer_records[tiptransferId].FromAddress);       
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
  /// @param _tiptransferId unique identifier (UID) of this smart contract.
  /// @return amt tip amount
  function getTipAmount(uint _tiptransferId) public view returns (uint amt) 
  {
    if (msg.sender != tip_transfer_records[_tiptransferId].ToAddress && 
        msg.sender != tip_transfer_records[_tiptransferId].FromAddress) 
      return 0;
    return tip_transfer_records[_tiptransferId].amount;
  }

  /// @dev Get balance of an account.
  /// @param account the account address
  /// @return balance account balance
  function getBalance(address account) public view returns (uint256 balance) 
  {
    if (msg.sender != tip_transfer_records[tiptransferId].ToAddress && 
        msg.sender != tip_transfer_records[tiptransferId].FromAddress) 
      return 0;
    return account.balance;
  }

  /// @notice @dev Get the sender address.
  /// @param _tiptransferId unique identifier (UID)
  /// @return sender address
  function getSenderAddress(uint _tiptransferId) public view returns (address) 
  {
    return tip_transfer_records[_tiptransferId].FromAddress;
  }

  /// @notice @dev Get the receiver address.
  /// @param _tiptransferId unique identifier (UID)
  /// @return receiver address
  function getReceiverAddress(uint _tiptransferId) public view returns (address) 
  {
    return tip_transfer_records[_tiptransferId].ToAddress;
  }

  /// @notice @dev Get the transfer state
  /// @param _tiptransferId unique identifier (UID)
  /// @return transfer transcation state 
  function getState(uint _tiptransferId) public view returns (State) 
  {
    return tip_transfer_records[_tiptransferId].state;
  }
}
