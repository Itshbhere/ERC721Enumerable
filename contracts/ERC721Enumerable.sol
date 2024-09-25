// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    constructor() ERC721("DeathGod", "DTG") Ownable(msg.sender) {}

    // uint256 private tokenId = 1 ;

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        // ++tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 _tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, _tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getOwnedTokenIds() public view returns (uint256[] memory) {
        uint256 totalTokens = balanceOf(msg.sender);
        uint256[] memory ids = new uint256[](totalTokens);
        for (uint256 i = 0; i < totalTokens; ++i) {
            ids[i] = tokenOfOwnerByIndex(msg.sender, i);
        }
        return ids;
    }
}
