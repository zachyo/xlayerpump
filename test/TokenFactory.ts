import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenFactory, MemeToken, OKBPoolManager, BondingCurveLogic } from "../typechain-types";

describe("TokenFactory", function () {
  let tokenFactory: TokenFactory;
  let okbToken: any; // Mock OKB
  let poolManager: OKBPoolManager;
  let bondingCurve: BondingCurveLogic;
  let owner: any;
  let user: any;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy mock OKB
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    okbToken = await MockERC20.deploy("OKB", "OKB");

    // Deploy PoolManager
    const OKBPoolManager = await ethers.getContractFactory("OKBPoolManager");
    poolManager = await OKBPoolManager.deploy(await okbToken.getAddress(), owner.address);

    // Deploy TokenFactory
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    tokenFactory = await TokenFactory.deploy(await okbToken.getAddress(), await poolManager.getAddress(), owner.address);

    // Mint OKB to users
    await okbToken.mint(owner.address, ethers.parseEther("1000"));
    await okbToken.mint(user.address, ethers.parseEther("1000"));
  });

  it("Should create a token", async function () {
    await okbToken.connect(user).approve(await tokenFactory.getAddress(), ethers.parseEther("1"));
    const tx = await tokenFactory.connect(user).createToken("Test Token", "TEST", "Description", "image.png");
    await tx.wait();

    const tokens = await tokenFactory.getAllTokens();
    expect(tokens.length).to.equal(1);

    const tokenAddr = tokens[0];
    const token = await ethers.getContractAt("MemeToken", tokenAddr);
    expect(await token.name()).to.equal("Test Token");
  });

  it("Should buy tokens", async function () {
    await okbToken.connect(user).approve(await tokenFactory.getAddress(), ethers.parseEther("2"));
    await tokenFactory.connect(user).createToken("Test Token", "TEST", "Description", "image.png");
    const tokens = await tokenFactory.getAllTokens();
    const tokenAddr = tokens[0];

    const buyAmount = 100; // 100 tokens
    const bondingCurveAddr = await tokenFactory.bondingCurve();
    const bondingCurveContract = await ethers.getContractAt("BondingCurveLogic", bondingCurveAddr);
    const cost = await bondingCurveContract.getBuyCost(0, buyAmount);
    await okbToken.connect(user).approve(await tokenFactory.getAddress(), cost);
    await tokenFactory.connect(user).buyTokens(tokenAddr, buyAmount);

    const token = await ethers.getContractAt("MemeToken", tokenAddr);
    expect(await token.balanceOf(user.address)).to.equal(buyAmount);
  });

  // Add more tests for sell, etc.
});