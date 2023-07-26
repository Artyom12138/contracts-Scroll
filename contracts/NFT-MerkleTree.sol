// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721.sol";
import "./MerkleTree.sol";

contract MerkleTreeWhiteList is ERC721{
    
    bytes32 immutable public root; // Merkle树的根
    mapping(address => bool) public mintedAddress; // 记录已经mint的地址

    constructor(string memory name_, string memory symbol_, bytes32 merkleroot_) ERC721(name_, symbol_){
        root = merkleroot_;
    }

    //BAYC的baseURI为ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/ 
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }
    
    // 铸造函数
    function mint(address to, uint tokenId, bytes32[] calldata proof) external {
        require(_verify(_leaf(to), proof), "Invalid merkle proof!"); // Merkle检验通过
        require(!mintedAddress[to], "Already minted!"); // 地址没有mint过
        mintedAddress[to] = true; // 记录mint过的地址
        _mint(to, tokenId);
    }

    function _leaf(address account)
    internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    // Merkle树验证，调用MerkleProof库的verify()函数
    function _verify(bytes32 leaf, bytes32[] memory proof)
    internal view returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }

}
