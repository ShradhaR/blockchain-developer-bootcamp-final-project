Contract security measures

1. Using Specific Compiler Pragma / SWC-103 (Floating pragma)
Specific compiler pragma 0.8.0 used in contracts to avoid accidental bug inclusion through outdated compiler versions.

2. Proper Use of Require, Assert and Revert 
Require is used in contract in TipTransferInitiated() method to validate owner. Also used revert in fallback function to revert to orignal state in case no functions matches.

3. SWC-105 (Unprotected Ether Withdrawal)
Transfer is protected with OpenZeppelin Ownable's onlyOwner modifier.

4. Pull over push
All functions that modify state are based on receiving calls rather than making contract calls.