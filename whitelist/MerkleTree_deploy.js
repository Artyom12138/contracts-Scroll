const fs = require('fs').promises;

async function main() {
    // 设置构造函数参数
    const name = "chianlink";
    const symbol = "LINK";
    const data = JSON.parse(await fs.readFile('./db/MerkleTree.json', 'utf-8'));
    const merkleroot = data.root; // 默克尔树根

    const myContract = await hre.ethers.getContractFactory("MerkleTreeWhiteList");

    // 在 deploy 方法中传递构造函数参数
    const myContractDeployed = await myContract.deploy(name, symbol, merkleroot);
    await myContractDeployed.deployed();
    console.log("Deployed my contract to:", myContractDeployed.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
