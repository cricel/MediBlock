const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mediblock", function () {
  let mediblock;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Mediblock = await ethers.getContractFactory("Mediblock");
    mediblock = await Mediblock.deploy();
    await mediblock.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await mediblock.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should upload and retrieve data", async function () {
      await mediblock.uploadData("Test Data", ethers.utils.parseEther("1"));
      expect(await mediblock.getData(1)).to.equal("Test Data");
    });

    it("Should allow purchase of data", async function () {
      await mediblock.connect(addr1).uploadData("Test Data", ethers.utils.parseEther("1"));
      await mediblock.connect(addr2).purchaseData(1, { value: ethers.utils.parseEther("1") });
      expect(await mediblock.getData(1)).to.equal("Test Data");
    });
  });
});
