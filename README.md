# ERC721Enumerable NFT Smart Contract

This repository contains an example implementation of an ERC721 NFT smart contract with the `ERC721Enumerable` extension. The `ERC721Enumerable` extension adds functionalities for enumerating all tokens in the contract and tokens owned by a specific address.

## Features

- **Mint NFTs**: You can mint new NFTs by calling the `mint()` function.
- **Token Enumeration**: Enumerate all tokens in the contract or tokens owned by a particular address.
- **Total Supply**: Retrieve the total number of tokens that have been minted.
- **Query Tokens by Index**: Get a specific token's ID by its index within the contract or within the list of tokens owned by a given address.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Hardhat](https://hardhat.org/) or [Truffle](https://www.trufflesuite.com/) (for deploying contracts)

You will also need an Ethereum wallet such as [MetaMask](https://metamask.io/) for interacting with the smart contract after deployment.

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Itshbhere/ERC721Enumerable.git
cd ERC721Enumerable
npm install
```

## Smart Contract Explanation

The contract is based on OpenZeppelin's `ERC721Enumerable` extension. This adds two key functions to the standard ERC721 token:

- **`totalSupply()`**: Returns the total number of tokens minted.
- **`tokenByIndex(uint256 index)`**: Returns the token ID at a given global index.
- **`tokenOfOwnerByIndex(address owner, uint256 index)`**: Returns the token ID owned by `owner` at a specific index in their token list.


## How to Use

### 1. Compile the Contract

First, compile the contract using Hardhat or Truffle:

**Hardhat:**

```bash
npx hardhat compile
```

### 2. Deploy the Contract

Deploy the contract to a test network or a local blockchain:

**Hardhat (with local network):**

```bash
npx hardhat run scripts/deploy.js --network localhost
```


### 3. Interact with the Contract

Once the contract is deployed, you can interact with it using your frontend or scripts.

#### Example Script to Mint NFTs

Create a script to mint a new NFT:

```javascript
async function mintNFT() {
    const [deployer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("MyEnumerableNFT", contractAddress);
    
    const tx = await contract.mint(deployer.address);
    await tx.wait();

    console.log("Minted new NFT to:", deployer.address);
}
```

#### Example Script to Fetch a Token by Index

Here’s a simple script to fetch a token by its index:

```javascript
async function getTokenByIndex(index) {
    const contract = await ethers.getContractAt("MyEnumerableNFT", contractAddress);
    const tokenId = await contract.tokenByIndex(index);
    console.log(`Token at index ${index}:`, tokenId);
}
```

## Testing

You can write tests using Hardhat or Truffle to ensure your contract works as expected. Example tests can include:

- Checking if a token is minted successfully.
- Fetching the total supply of tokens.
- Retrieving token IDs by their index in the enumeration.

Example Hardhat test:

```javascript
const { expect } = require("chai");

describe("MyEnumerableNFT", function () {
    it("should mint and enumerate tokens correctly", async function () {
        const [owner] = await ethers.getSigners();
        const MyEnumerableNFT = await ethers.getContractFactory("MyEnumerableNFT");
        const nftContract = await MyEnumerableNFT.deploy();
        await nftContract.deployed();

        await nftContract.mint(owner.address);
        expect(await nftContract.totalSupply()).to.equal(1);
        expect(await nftContract.tokenByIndex(0)).to.equal(1);
    });
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Additional Resources

- [OpenZeppelin ERC721Enumerable Documentation](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Enumerable)
- [Ethereum ERC721 Standard](https://eips.ethereum.org/EIPS/eip-721)

---

### Summary

This `ERC721Enumerable` implementation allows you to mint NFTs and easily query the total number of tokens, as well as access individual token IDs by index. It extends the standard ERC721 functionality with enumeration capabilities, which can be useful for applications like NFT marketplaces, galleries, and more.

