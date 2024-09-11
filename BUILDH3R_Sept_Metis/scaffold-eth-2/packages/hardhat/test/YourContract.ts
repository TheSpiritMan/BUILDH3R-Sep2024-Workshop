import { expect } from "chai";
import { ethers } from "hardhat";
import { SandabContract } from "../typechain-types";

describe("SandabContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let SandabContract: SandabContract;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const SandabContractFactory = await ethers.getContractFactory("SandabContract");
    SandabContract = (await SandabContractFactory.deploy(owner.address)) as SandabContract;
    await SandabContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await SandabContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await SandabContract.setGreeting(newGreeting);
      expect(await SandabContract.greeting()).to.equal(newGreeting);
    });
  });
});
