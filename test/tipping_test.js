const Tipping = artifacts.require("./Tipping.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Tipping", function ( accounts ) {

  const [owner, receiverAccount,secondAccount] = accounts;

  beforeEach(async () => {
    instance = await Tipping.deployed();
  });

  
  /// 1. Checks that the contract inherits OpenZeppelin Ownable by using owner()
  it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });


  /// 2. Verify tip amount should not exceed avaiable sender balance
describe('Ensure tip amount does not exceed sender balance', function () {
        it('should have sufficient sender balance to transfer tip', async function () {
          const senderBalance = await instance.getBalance(owner);
          const tipamount = 20000000000000000000000000;
          console.log("Sender balance "+ senderBalance)
          require(senderBalance >= tipamount, "Sender balance is less than tip amount.");
        });
    });

  /// 3. Initalize tip transfer of 1 ether from sender(owner) to receiver.
describe('Initalize tip transfer of 1 ether', function () {
  it("should initalize tip transfer of 1 ether", async () => {
    //const tiptransferId = await instance.TipTransferInitiated
    //(receiverAccount, web3.utils.toBN(100));
    const tiptransferId = setTipTransferId(owner,receiverAccount,10);
    console.log(tiptransferId)
    //await instance.confirmTransfer(tiptransferId);
    }); 
  });

    /// 4. Verify tip amount should not exceed tip limit of 2 ether 
describe('Ensure tip amount limit is not exceeded', function () {
  it('Should not excced tip amount limit', async function () {
    const senderBalance = await instance.getBalance(owner);
    const tiplimit = 20000000000000000000000000;
    console.log("Sender balance "+senderBalance)
    require(senderBalance <= tiplimit, "Sender exceeded tip limit.");
  });
});
///verify tranasferID gets generated and added in mapping table

///Attempt to tip an amt value is greater than balance
describe('Ensure tip amount greater than sender balance', function () {

        it('Sender has sufficient balance to tip', async function () {
          const senderBalance = await instance.getBalance(owner);
          const tipamount = 20000000000000000000000000;
          //console.log("Sender balance "+senderBalance)
        if(senderBalance <= tipamount)
          amt = senderBalance;
        else
          amt = limit;
           assert.equal(senderBalance, amt);
        });
    });


    
///ensure correct ether amount deducted from sender 
describe('Ensure correct tip amount is deducted from sender account', function () {

        const to = receiverAccount;
        const amount = 1;

        it('should deduct correct tip amount from the sender amount', async function () {
          const senderBalancebefore = await instance.getBalance(owner);
          await instance.TipTransferInitiated(receiverAccount, 100);
            //this.transfer(to, amount, {from: owner});
            //const txGas = await calculateGasCost(tx);
            //gasReport.push({msg: 'transfer', ...txGas});

          const senderBalanceafter = await instance.getBalance(owner);
          assert.equal(senderBalanceafter, senderBalancebefore-amount);

            // const recipientBalance = await this.token.balanceOf(to);
            // assert.equal(recipientBalance, amount);

            // const logs = tx.logs;
            // assert.equal(logs.length, 1);
            // assert.equal(logs[0].event, 'Transfer');
            // assert.equal(logs[0].args.from, owner);
            // assert.equal(logs[0].args.to, to);
            // assert(logs[0].args.value.eq(amount));
        });
    });

///ensure correct ether amount deposited to receiver

describe('Ensure correct tip amount is added to receiver account', function () {

        const to = receiverAccount;
        const amount = 1;

        it('transfers the requested amount', async function () {
           const senderBalancebefore = await instance.getBalance(to);
           //console.log(receiverAccount)
           //await instance.TipTransferInitiated(receiverAccount,1)
            //this.transfer(to, amount, {from: owner});
            //const txGas = await calculateGasCost(tx);
            //gasReport.push({msg: 'transfer', ...txGas});

            const senderBalanceafter = await instance.getBalance(owner);
           // assert.equal(senderBalanceafter, senderBalancebefore+amount);

            // const recipientBalance = await this.token.balanceOf(to);
            // assert.equal(recipientBalance, amount);

            // const logs = tx.logs;
            // assert.equal(logs.length, 1);
            // assert.equal(logs[0].event, 'Transfer');
            // assert.equal(logs[0].args.from, owner);
            // assert.equal(logs[0].args.to, to);
            // assert(logs[0].args.value.eq(amount));
        });
    });

    /// Tip should be greater than zero
    it("should have greater than zero tip value.", async () => {
    //const supply = await controller.totalSupply();
    //assert.equal(supply.valueOf(), 0, "initial supply is not 0");  
  });
});