// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureWhitelist is ERC721Enumerable, Ownable {
    using ECDSA for bytes32;

    address private _systemAddress;

    constructor(
        string memory name,
        string memory symbol,
        address systemAddress
    ) ERC721(name, symbol) {
        _systemAddress = systemAddress;
    }

    modifier onlySystem() {
        require(msg.sender == _systemAddress, "uncheked!");
        _;
    }

    function mint(
        uint256 tokenId,
        bytes memory signature
    ) external {
        bytes32 mintingRequestHash = hashTransaction(msg.sender, tokenId);
        require(matchSigner(mintingRequestHash, signature), "Invalid signature!");
        _safeMint(msg.sender, tokenId);
    }

    function matchSigner(bytes32 hash, bytes memory signature)
        public
        view
        returns (bool)
    {
        return
            _systemAddress == hash.toEthSignedMessageHash().recover(signature);
    }

    function hashTransaction(address sender, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, tokenId));
    }

    function setSystemAddress(address systemAddress) external onlyOwner {
        _systemAddress = systemAddress;
    }

}
