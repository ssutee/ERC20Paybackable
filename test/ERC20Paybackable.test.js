const { default: BigNumber } = require("bignumber.js");
const { expect } = require("chai").use(require("chai-bignumber")());
const { web3 } = require("hardhat");

const FooToken = artifacts.require("FooToken");
const BarToken = artifacts.require("BarToken");

const toWei = web3.utils.toWei;

describe("ERC20Paybackable", () => {
  let fooToken, barToken;
  let bob, marry;

  before(async () => {
    accounts = await web3.eth.getAccounts();
    bob = accounts[1];
    marry = accounts[2];
  });

  beforeEach(async function () {
    fooToken = await FooToken.new();
    barToken = await BarToken.new();
  });

  describe("test payback if someone sent any tokens to the contract", async () => {
    it("should transfer token back to user", async () => {
      await barToken.mint(bob, toWei("10000"));
      await fooToken.mint(marry, toWei("10000"));

      await barToken.transfer(fooToken.address, toWei("1000"), { from: bob });
      await fooToken.payback(bob, barToken.address, toWei("1000"));
      const bobBalance = BigNumber(await barToken.balanceOf(bob));
      expect(bobBalance).to.be.bignumber.equal(BigNumber(toWei("10000")));

      await fooToken.transfer(fooToken.address, toWei("1000"), { from: marry });
      await fooToken.payback(marry, fooToken.address, toWei("1000"));
      const marryBalance = BigNumber(await fooToken.balanceOf(marry));
      expect(marryBalance).to.be.bignumber.equal(BigNumber(toWei("10000")));
    });
  });
});
