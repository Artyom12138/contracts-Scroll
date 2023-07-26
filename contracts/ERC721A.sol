// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract CHAINLINK is ERC721A {
    bytes32 private root;
    address private owner;
    mapping (address => bool) private minted;
    event verifyMerkleTreeEvent(
        bytes32[] proof,
        address addr,
        uint256 amount
    );
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        bytes32 _root
    ) ERC721A(name, symbol) {
        root = _root;
        owner = msg.sender;
    }

    function mint(
        uint256 quantity,
        bytes32[] memory proof
    ) external payable {
        require(!minted[msg.sender], "Already minted");
        emit verifyMerkleTreeEvent(proof, msg.sender, quantity);
        verifyMerkleTree(
            proof,
            msg.sender,
            quantity
        );
        _mint(msg.sender, quantity);
        minted[msg.sender] = true;
    }

    function getRoot() public view returns (bytes32) {
        return root;
    }

    function setRoot(bytes32 _root) public onlyOwner{
        root = _root;
    }

    function verifyMerkleTree(
        bytes32[] memory proof,
        address addr,
        uint256 amount
    ) public view {
        bytes32 leaf = keccak256(
            bytes.concat(keccak256(abi.encode(addr, amount)))
        );
        require(MerkleProof.verify(proof, root, leaf), "Invalid proof");
    }
}
