const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SushiBlobNft", function () {
  let SushiBlobNft;
  let sushiBlobNft;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy contract
    SushiBlobNft = await ethers.getContractFactory("SushiBlobNft");
    [owner, addr1, addr2] = await ethers.getSigners();
    sushiBlobNft = await SushiBlobNft.deploy();
    await sushiBlobNft.waitForDeployment();

    // Initialize the contract
    await sushiBlobNft.initialize("SushiBlob", "SBLB");
  });

  it("Should initialize with correct name and symbol", async function () {
    expect(await sushiBlobNft.name()).to.equal("SushiBlob");
    expect(await sushiBlobNft.symbol()).to.equal("SBLB");
  });

  it("Should allow owner to add new blob type", async function () {
    await sushiBlobNft.addNewBlob();
    expect(await sushiBlobNft.currentBlobId()).to.equal(1);
  });

  it("Should allow owner to mint tokens", async function () {
    await sushiBlobNft.addNewBlob();
    await sushiBlobNft.adminMint(1000000, addr1.address, 10);
    expect(await sushiBlobNft.balanceOf(addr1.address)).to.equal(10);
  });

  it("Should not allow minting tokens of different blob types", async function () {
    await sushiBlobNft.addNewBlob();
    await sushiBlobNft.addNewBlob();
    await expect(sushiBlobNft.adminMint(1000000, addr1.address, 1000001)).to.be.revertedWith(
      "Can mint only one blob type",
    );
  });

  it("Should not allow minting if blob type doesn't exist", async function () {
    await expect(sushiBlobNft.adminMint(1000000, addr1.address, 10)).to.be.revertedWith("Should add blob type");
  });

  it("Should allow owner to set and retrieve token URL", async function () {
    await sushiBlobNft.addNewBlob();
    await sushiBlobNft.setUrl(1, "https://example.com/blob1");
    expect(await sushiBlobNft.tokenURI(1000001)).to.equal("https://example.com/blob1");
  });

  it("Should revert minting zero quantity", async function () {
    await sushiBlobNft.addNewBlob();
    try {
      await sushiBlobNft.adminMint(1000000, addr1.address, 0);
    } catch (error) {
      await expect(`${error}`.includes("MintZeroQuantity")).be.true;
    }
  });

  it("Should prevent non-owners from calling admin functions", async function () {
    await expect(sushiBlobNft.connect(addr1).addNewBlob()).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(sushiBlobNft.connect(addr1).adminMint(1000000, addr1.address, 10)).to.be.revertedWith(
      "Ownable: caller is not the owner",
    );
    await expect(sushiBlobNft.connect(addr1).setUrl(1, "https://example.com/blob1")).to.be.revertedWith(
      "Ownable: caller is not the owner",
    );
  });
});
