const fs = require("fs");
const { ethers } = require("ethers");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

// 读取原始列表，请注意根路径在当前工作目录
const readRawList = (path) => {
  const rawdata = fs.readFileSync(path);
  const addresses = JSON.parse(rawdata);
  return addresses;
};

const generateMerkleTree = (data) => {
  const leaves = data.map((address) => hashNode(address));

  // 设置 hashLeaves 和 sortPairs 选项为 true
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true }, { hashLeaves: true });
  const merkleRoot = merkleTree.getHexRoot();

  return [merkleRoot, merkleTree];
};

const hashNode = (address) => {
  const hashedAddress = keccak256(address);
  return hashedAddress;
};

async function main() {
  const filepath = "./db/WhiteList.json";
  const outputPath = "./db/MerkleTree.json";

  const rawData = readRawList(filepath);
  const [merkleRoot, merkleTree] = generateMerkleTree(rawData);

  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      root: merkleRoot,
      tree: merkleTree.getHexLeaves(),
    })
  );
  console.log(`成功生成默克尔树到 ${outputPath}。`)

}

main();
