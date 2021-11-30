# Contract security measures

## Using Specific Compiler Pragma / SWC-103 (Floating pragma)

Specific compiler pragma '0.8.10' has used in contract to avoid accidental bug inclusion through outdated compiler versions.

## Proper Use of Require, Assert and Revert 

`onlyOwner` modifier is used in a contract in TipTransferInitiated() method to verify owner. Also, used revert in fallback function to revert to orignal state in case no functions matches.

## SWC-105 (Unprotected Ether Withdrawal)

Tip transfer is protected with OpenZeppelin Ownable's onlyOwner modifier.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.


