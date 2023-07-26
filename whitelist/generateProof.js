const fs = require("fs");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = require("ethers/lib/utils");

function readMerkleTree(filePath) {
  const rawdata = fs.readFileSync(filePath);
  return JSON.parse(rawdata);
}

function addressToHash(address) {
  return keccak256(address);
}

function generateAddressProof(merkleTreeData, address) {
  const leaves = merkleTreeData.tree;
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const leaf = addressToHash(address);

  const proof = merkleTree.getProof(leaf);
  if (!merkleTree.verify(proof, leaf, merkleTreeData.root, keccak256)) {
    return null;
  }

  const proofHex = proof.map((p) => "0x" + p.data.toString("hex")); // 将每个元素转换为十六进制格式
  return proofHex;
}

async function generateProof(addressToCheck) {
  const WhiteList = JSON.parse(fs.readFileSync("./db/WhiteList.json"));
  if (WhiteList.includes(addressToCheck)) {

    const merkleTreeData = readMerkleTree("./db/MerkleTree.json");
    const proof = generateAddressProof(merkleTreeData, addressToCheck);

    return proof;
    
  } else {
    throw new Error("您不是白名单用户！");
  }
}

module.exports = generateProof;


