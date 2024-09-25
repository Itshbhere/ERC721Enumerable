const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken;
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    myToken = await MyToken.deploy();
    // await myToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await myToken.name()).to.equal("DeathGod");
      expect(await myToken.symbol()).to.equal("DTG");
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint tokens", async function () {
      await myToken.safeMint(addr1.address, 1, "https://example.com/token/1");
      expect(await myToken.ownerOf(1)).to.equal(addr1.address);
      expect(await myToken.tokenURI(1)).to.equal("https://example.com/token/1");
    });

    it("Should not allow non-owners to mint tokens", async function () {
      await expect(
        myToken.connect(addr1).safeMint(addr2.address, 1, "https://example.com/token/1")
      ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("Token URI", function () {
    it("Should return the correct token URI", async function () {
      await myToken.safeMint(addr1.address, 1, "https://example.com/token/1");
      expect(await myToken.tokenURI(1)).to.equal("https://example.com/token/1");
    });

    it("Should revert for non-existent tokens", async function () {
      await expect(myToken.tokenURI(99)).to.be.revertedWithCustomError(myToken, "ERC721NonexistentToken");
    });
  });

  describe("Enumeration", function () {
    beforeEach(async function () {
      await myToken.safeMint(addr1.address, 1, "https://example.com/token/1");
      await myToken.safeMint(addr1.address, 2, "https://example.com/token/2");
      await myToken.safeMint(addr2.address, 3, "https://example.com/token/3");
    });

    it("Should correctly report total supply", async function () {
      expect(await myToken.totalSupply()).to.equal(3);
    });

    it("Should correctly report token by index", async function () {
      expect(await myToken.tokenByIndex(0)).to.equal(1);
      expect(await myToken.tokenByIndex(1)).to.equal(2);
      expect(await myToken.tokenByIndex(2)).to.equal(3);
    });

    it("Should correctly report token of owner by index", async function () {
      expect(await myToken.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(1);
      expect(await myToken.tokenOfOwnerByIndex(addr1.address, 1)).to.equal(2);
      expect(await myToken.tokenOfOwnerByIndex(addr2.address, 0)).to.equal(3);
    });
  });

  describe("CheckAllIds", function () {
    beforeEach(async function () {
      await myToken.safeMint(addr1.address, 1, "https://example.com/token/1");
      await myToken.safeMint(addr1.address, 2, "https://example.com/token/2");
      await myToken.safeMint(addr1.address, 3, "https://example.com/token/3");
    });

    it("Should return all token IDs owned by an address", async function () {
      const ownedIds = await myToken.connect(addr1).getOwnedTokenIds();
      expect(ownedIds.length).to.equal(3);
      expect(ownedIds[0]).to.equal(1);
      expect(ownedIds[1]).to.equal(2);
      expect(ownedIds[2]).to.equal(3);
    });

    it("Should return an empty array for an address with no tokens", async function () {
      const ownedIds = await myToken.connect(addr2).getOwnedTokenIds();
      expect(ownedIds.length).to.equal(0);
    });
  });
});