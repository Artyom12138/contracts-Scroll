// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract testERC1155 is ERC1155, Ownable {

    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant PLATINUM = 2;

    constructor() ERC1155("https://example.com/api/token/{id}") {
        _mint(msg.sender, GOLD, 100, ""); // 同质化代币
        _mint(msg.sender, SILVER, 10000, ""); // 同质化代币

        _mint(msg.sender, PLATINUM, 1, ""); // 非同质化代币
        _mint(msg.sender, PLATINUM + 1, 1, "");
        _mint(msg.sender, PLATINUM + 2, 1, ""); 
    }

    function mint(address to, uint256 id, uint256 amount) public onlyOwner {
        _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(msg.sender == from || isApprovedForAll(from, msg.sender), "Not approved");
        _burn(from, id, amount);
    }
}