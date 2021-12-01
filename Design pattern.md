# Design patterns used

## 1. Optimizing gas
1. Used Mapping instead array:
In order to save gas, used mapping instead of array to record tip-transfer list(tip_transfer_records).
2. Short circuit: 
Optimally used logical operations in three functions - ConfirmTransfer(), getTipAmount() and getBalance(). Ordered the expression execution to reduce probability of executing second expression.
3. Used Libraries:- Used OpenZappline Owner library to save gas.
4. Secured Ether transfer:- Used transfer() to benefit safe against re-entrancy, because they only forward 2300 gas. This function also reverts automatically in case of any errors.
5. State Machine:- 
Used enum as used-defined data type to define possible stages of tip-transfer process. An instance of that enum used to store the current stage and transition to the next one by assigning it a new stage. Further, used events, to permanantly record these state transitions on blockchain.


## 2. Inheritance and Interfaces

Tipping contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing users.

## 3. Access Control Design Patterns

Ownable design pattern used in smart contract.

