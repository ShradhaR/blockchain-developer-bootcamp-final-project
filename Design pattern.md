# Design patterns used

## 1. Inheritance and Interfaces

Tipping contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing users.

## 2. Access Control Design Patterns

Ownable design pattern used in a function: 'TipTransferInitiated()'. This function does not need to be used by anyone else apart from the contract creator, i.e. the user who initated tipping transaction.

## 3. Optimizing gas
1. Used Mapping instead array 
In order to save gas, used mapping instead of array to record tip-transfer list.
2. Short circuit: 
Optimally used logical operations in three functions - ConfirmTransfer(), getTipAmount() and getBalance(). Ordered the expression execution to reduce probability of executing second expression.
3. Used Libraries:- Used OpenZappline Owner library to save gas.
4. Fail early and fail loud This pattern checks the condition required for execution as early as possible in the function body and throws an exception if the condition is not met. This reduces unnecessary code execution in the event that an exception will be thrown.

e.g. Checking a user has enough funds before withdraw/issue/transfer.
5. Restricting Access This pattern is useful for allowing only designated users, or other contracts to access administrative methods, such as changing ownership of a contract, implementing an upgrade or stopping the contract. And only designated users, or other contracts to access settlement banks method suching as creating customer mobile number accounts, transfer payment to registered banks, view payment records.

e.g. Restrict function access so that only the owner is permitted to issue and withdraw funds, setting and manage settlement bank accounts

Library used:Ownable OpenZeppelin

