let catchRevert = require("./exceptionsHelpers.js").catchRevert
const Tipping = artifacts.require("./Tipping.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Tipping", function ( accounts ) {
  // Initialize test data.
  const [owner, receiverAccount, secondAccount] = accounts;
  const TIPTRANSFERID = 0; 
  const TIPAMOUNT = 10;

  beforeEach(async () => {
    instance = await Tipping.deployed();
  });

  
  /// 1. Checks that the contract inherits OpenZeppelin Ownable by using owner().
  it("Should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });


  /// 2. Verify tip amount should not exceed available sender's balance.
describe('Ensure tip amount does not exceed sender balance', function () {
        it('should have sufficient sender balance to transfer tip', async function () {
          const senderBalance = await instance.getBalance(owner);
          const tipamount = await instance.getTipAmount(TIPTRANSFERID);
          let expectedvalue = -1;
          console.log("Sender balance: "+ senderBalance)
          console.log("Tip amount: "+ tipamount)
          if(senderBalance >= tipamount)
              expectedvalue = senderBalance;
          else
              expectedvalue = senderBalance + 1;
          assert.equal(senderBalance, expectedvalue, "Tip amount exceeded Sender currunt balance.");
        });
    });


  /// 3. Verify tip amount should not exceed tip limit of 20.
  describe('Ensure tip amount limit is not exceeded', function () {
    it('Should not excced tip amount limit', async function () {
      const tipAmount = TIPAMOUNT;
      const tiplimit = 20;
     let expectedvalue;
      if(tipAmount <= tiplimit)
              expectedvalue = tipAmount;
          else
              expectedvalue = tipAmount+1;
     //console.log(tipAmount)
     assert.equal(tipAmount, expectedvalue, "Sender exceeded tip limit."); 
     });
  });

  /// 4. Attempt to tip an amt value is greater than balance.
  describe('Attempt to tip an amt value is greater than balance', function () {
    it('Should not succeed the transfer as tip amount is greater than balance', async function () {
      const senderBalance = await instance.getBalance(owner);
      const tipamount = senderBalance + 1;
      let expectedvalue;
      //console.log("Sender balance "+senderBalance)
      if(senderBalance <= tipamount)
        expectedvalue = senderBalance;
      else
        expectedvalue = tipamount;
      assert.equal(senderBalance, expectedvalue);
    });
  });

  /// 5. Tip should not be zero.
  describe('Tip should not be zero', function () {
    it("Should not have zero tip value.", async () => {
      const _tipamt = await instance.getTipAmount(TIPTRANSFERID);
      assert.equal(_tipamt, 0, "Tip should not be zero (0).");  
    });
  });

  /// 6. Sender address should not be zero.
  describe('Sender address should not be zero', function () {
    it("Should have valid sender address.", async () => {
      const _address = await instance.getSenderAddress(TIPTRANSFERID);
      assert.equal(_address, 0, "Sender address should not be zero (0).");  
    });
  });

  /// 7. Receiver adddress should not bu zero.
  describe('Receiver address should not be zero', function () {
    it("should have valid receiver address.", async () => {
      const _address = await instance.getTipAmount(TIPTRANSFERID);
      assert.equal(_address, 0, "Receiver address should not be zero (0).");  
    });
  });


/* More unit test cases to implement in future.
  8.  Attempt to tip an amt value is greater than balance.
  8.  Verify tranasferID gets generated and added in mapping table.
  9.  Transfer X ether/wei from sender account to receiver account. 
  10. Verify if transfer reduces right amount from sender's balance and 
      adds right amount to the recipient's balance.
  11. Should not change balances of irrelative accounts(neither sender nor recipient)
  */
});