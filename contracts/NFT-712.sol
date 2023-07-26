// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721.sol";

contract NFT712 is ERC721 {
    // EIP712Domain struct
    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }
    
    // EIP712 Domain Separator
    bytes32 private constant EIP712DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );

    bytes32 private immutable DOMAIN_SEPARATOR;

    // Event to track successful minting
    event Minted(address indexed account, uint256 indexed tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        DOMAIN_SEPARATOR = hash(EIP712Domain({
            name: name,
            version: '1',
            chainId: _getChainID(),
            verifyingContract: address(this)
        }));
    }

    // Function to mint NFT tokens, only allowed for whiteListed addresses
    function mint(uint256 tokenId, uint8 v, bytes32 r, bytes32 s) external {
        // Verify signature and whiteList status
        require(verifyWhiteList(msg.sender, v, r, s), "Address is not whitelisted");
        
        // Mint NFT
        _mint(msg.sender, tokenId);
        emit Minted(msg.sender, tokenId);
    }

    // Internal function to get the current chain ID
    function _getChainID() internal view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    // Internal function to calculate the hash of EIP712Domain
    function hash(EIP712Domain memory eip712Domain) internal pure returns (bytes32) {
        return keccak256(abi.encode(
            EIP712DOMAIN_TYPEHASH,
            keccak256(bytes(eip712Domain.name)),
            keccak256(bytes(eip712Domain.version)),
            eip712Domain.chainId,
            eip712Domain.verifyingContract
        ));
    }

    // Function to verify the address is whiteListed using EIP-712 signature
    function verifyWhiteList(address account, uint8 v, bytes32 r, bytes32 s) internal view returns (bool) {
        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(account))
        ));
        return ecrecover(digest, v, r, s) == account;
    }

}
