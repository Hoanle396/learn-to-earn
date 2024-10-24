const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SushiPaymentGateway", function () {
  let SushiPaymentGateway;
  let sushiPaymentGateway;
  let owner;
  let addr1;
  let addr2;
  let vault;
  let token;

  beforeEach(async function () {
    // Deploy a mock ERC20 token
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("Test Token", "TST", ethers.parseEther("1000"));
    await token.waitForDeployment();

    // Deploy the SushiPaymentGateway contract
    SushiPaymentGateway = await ethers.getContractFactory("SushiPaymentGateway");
    [owner, addr1, addr2] = await ethers.getSigners();
    sushiPaymentGateway = await SushiPaymentGateway.deploy();
    await sushiPaymentGateway.waitForDeployment();

    // Initialize the contract
    await sushiPaymentGateway.initialize();
  });

  it("Should initialize with the correct owner and vault receipt", async function () {
    expect(await sushiPaymentGateway.vaultReceipt()).to.equal(owner.address);
  });

  it("Should allow owner to set and retrieve the vault receipt", async function () {
    await sushiPaymentGateway.setVaultReceipt(addr1.address);
    expect(await sushiPaymentGateway.vaultReceipt()).to.equal(addr1.address);
  });

  it("Should prevent non-owners from setting the vault receipt", async function () {
    await expect(sushiPaymentGateway.connect(addr1).setVaultReceipt(addr1.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should allow owner to add a token and set its payment amount", async function () {
    const amount = ethers.parseEther("10.0");
    await sushiPaymentGateway.addTokenAddress(token.target, amount);
    expect(await sushiPaymentGateway.getTokenPaymentAmount(token.target)).to.equal(amount);
  });

  it("Should allow owner to update the payment amount for a token", async function () {
    const amount = ethers.parseEther("10.0");
    await sushiPaymentGateway.addTokenAddress(token.target, amount);

    const newAmount = ethers.parseEther("15.0");
    await sushiPaymentGateway.updateTokenPaymentAmount(token.target, newAmount);
    expect(await sushiPaymentGateway.getTokenPaymentAmount(token.target)).to.equal(newAmount);
  });

  it("Should prevent non-owners from adding or updating tokens", async function () {
    const amount = ethers.parseEther("10.0");
    await expect(sushiPaymentGateway.connect(addr1).addTokenAddress(token.target, amount)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );

    await sushiPaymentGateway.addTokenAddress(token.target, amount);
    const newAmount = ethers.parseEther("15.0");
    await expect(
      sushiPaymentGateway.connect(addr1).updateTokenPaymentAmount(token.target, newAmount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow owner to remove a token from the payment options", async function () {
    const amount = ethers.parseEther("10.0");
    await sushiPaymentGateway.addTokenAddress(token.target, amount);
    await sushiPaymentGateway.removeTokenAddress(token.target);

    await expect(sushiPaymentGateway.getTokenPaymentAmount(token.target)).to.be.revertedWith("Token not found");
  });

  it("Should process a payment in native currency", async function () {
    const amount = ethers.parseEther("1.0");
    await sushiPaymentGateway.connect(owner).addTokenAddress(sushiPaymentGateway.NATIVE_TOKEN(), amount);

    // Capture balance before payment
    const balanceBefore = await ethers.provider.getBalance(owner.address);

    // Send payment
    await sushiPaymentGateway.connect(addr1).pay(sushiPaymentGateway.NATIVE_TOKEN(), 0, { value: amount });

    // Capture balance after payment
    const balanceAfter = await ethers.provider.getBalance(owner.address);

    // Check if the funds were transferred
    expect(balanceAfter - balanceBefore).to.equal(amount);
  });

  it("Should revert payment if native currency amount is incorrect", async function () {
    const amount = ethers.parseEther("1.0");

    // Ensure native token is accepted for payment
    await sushiPaymentGateway.connect(owner).addTokenAddress(sushiPaymentGateway.NATIVE_TOKEN(), amount);

    // Attempt to pay with insufficient amount
    await expect(
      sushiPaymentGateway.connect(addr1).pay(sushiPaymentGateway.NATIVE_TOKEN(), 0, { value: ethers.parseEther("0.5") })
    ).to.be.revertedWith("Incorrect native token amount sent");
  });

  it("Should process a payment in ERC20 token", async function () {
    const amount = ethers.parseEther("10.0");
    await token.mint(addr1.address, amount);
    const balanceBefore = await token.balanceOf(owner.address);
    // Approve the contract to spend the tokens
    await token.connect(addr1).approve(sushiPaymentGateway.target, amount);

    // Add token to the payment gateway
    await sushiPaymentGateway.addTokenAddress(token.target, amount);

    // Send payment
    await sushiPaymentGateway.connect(addr1).pay(token.target, 0);

    // Check if the tokens were transferred
    expect(await token.balanceOf(owner.address)).to.equal(balanceBefore + amount);
  });

  it("Should revert payment if ERC20 token is not approved", async function () {
    const amount = ethers.parseEther("10.0");

    // Add token to the payment gateway
    await sushiPaymentGateway.addTokenAddress(token.target, amount);

    // Try to send payment without approval
    await expect(sushiPaymentGateway.connect(addr1).pay(token.target, 0)).to.be.revertedWith(
      "ERC20: insufficient allowance"
    );
  });

  it("Should revert payment if the token is not enabled for payment", async function () {
    const amount = ethers.parseEther("10.0");

    // Try to send payment with an unapproved token
    await expect(sushiPaymentGateway.connect(addr1).pay(token.target, 0)).to.be.revertedWith(
      "This token is not accepted for payment"
    );
  });
});
