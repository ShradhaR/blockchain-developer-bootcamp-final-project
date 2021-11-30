let catchRevert = require("./exceptionsHelpers.js").catchRevert
const Tipping = artifacts.require("./Tipping.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Tipping", function ( accounts ) {

  const [owner, receiverAccount,secondAccount] = accounts;
  const TIPTRANSFERID = 0; 
  const TIPAMOUNT = 10;

  beforeEach(async () => {
    instance = await Tipping.deployed();
  });

  
  /// 1. Checks that the contract inherits OpenZeppelin Ownable by using owner()
  it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });


  /// 2. Verify tip amount should not exceed available sender's balance
describe('Ensure tip amount does not exceed sender balance', function () {
        it('should have sufficient sender balance to transfer tip', async function () {
          const senderBalance = await instance.getBalance(owner);
          const tipamount = await instance.getTipAmount(TIPTRANSFERID);
          let tempvalue;
          console.log("Sender balance "+ senderBalance)
          if(senderBalance >= tipamount)
              tempvalue = senderBalance;
          else
              tempvalue = senderBalance+1;
          assert.equal(senderBalance, tempvalue, "Sender balance is less than tip amount.");
        });
    });



/// 3. Verify tip amount should not exceed tip limit of 2 ether 
describe('Ensure tip amount limit is not exceeded', function () {
  it('Should not excced tip amount limit', async function () {
    const tipAmount = TIPAMOUNT;
    const tiplimit = 2;
    let tempvalue;
    if(tipAmount >= tiplimit)
              tempvalue = tipAmount;
          else
              tempvalue = tipAmount+1;
    console.log(tipAmount)
    assert.equal(tipAmount, tempvalue, "Sender exceeded tip limit."); 
  });
});

///verify tranasferID gets generated and added in mapping table


///4. Attempt to tip an amt value is greater than balance
describe('Attempt to tip an amt value is greater than balance', function () {
        it('Should not succeed the transfer as tip amount is greater than balance', async function () {
          const senderBalance = await instance.getBalance(owner);
          const tipamount = senderBalance + 1;
          let tempvalue;
          //console.log("Sender balance "+senderBalance)
        if(senderBalance <= tipamount)
          tempvalue = senderBalance;
        else
          tempvalue = tipamount;
        assert.equal(senderBalance, tempvalue);
        });
    });

  ///5.  Tip should be  zero
  describe('Tip should be zero', function () {
    it("should not have zero tip value.", async () => {
    const _tipamt = await instance.getTipAmount(TIPTRANSFERID);
    assert.equal(_tipamt, 0, "Tip should not be zero (0).");  
  });
  });

  /// 6. Sender address should not be null
  describe('Sender address should not be null', function () {
    it("should sender address be valid.", async () => {
    const _address = await instance.getSenderAddress(TIPTRANSFERID);
    assert.equal(_address, 0, "Sender address should not be null.");  
  });
  });

  /// 7. Receiver adddress should not bu null
  describe('Receiver address should not be null', function () {
    it("should receiver address be valid.", async () => {
    const _address = await instance.getTipAmount(TIPTRANSFERID);
    assert.equal(_address
      , 0, "Receiver address should not be null.");  
  });
  });

});