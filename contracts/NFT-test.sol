// SPDX-License-Identifier: MIT
// by 0xAA
pragma solidity ^0.8.4;

import "./ERC721.sol";
import "./MerkleTree.sol";
import "../node_modules/hardhat/console.sol";

contract LINK2 is ERC721{
    
    mapping(address => bool) public mintedAddress;   // 记录已经mint的地址
    uint public MAX_LINK = 10000; // 总量

    // 构造函数
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_){
        console.log("name is", name);
        console.log("sender is", msg.sender);

    }
    
    // 铸造函数
    function mint(address to, uint tokenId) external {
        require(!mintedAddress[to], "Already minted!"); // 地址没有mint过
        require(tokenId >= 0 && tokenId < MAX_LINK, "TokenId out of range!");
        mintedAddress[to] = true; // 记录mint过的地址
        _mint(to, tokenId);
    }


}
