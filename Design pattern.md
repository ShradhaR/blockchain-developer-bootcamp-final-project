Design patterns used


1. Inheritance and Interfaces
Tipping contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing users.

2. Access Control Design Patterns
Ownable design pattern used in two functions: TipTransferInitiated() and confirmTransfer(). These functions do not need to be used by anyone else apart from the contract creator, i.e. the user who initated tipping transaction.