const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();
const generateProof = require("./generateProof"); // 导入默克尔证明

async function main() {
    // 使用 PRIVATE_KEY_2 创建钱包（Wallet）对象
    const privateKey = process.env.PRIVATE_KEY_2;
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    const wallet = new ethers.Wallet(privateKey, provider);

    // 获取合约实例
    const contractAddress = "0x13a6fddBCa7aAeBD93c4FBcF8A37b049155319F3"; // NFT的合约地址
    const abi = JSON.parse(fs.readFileSync("./abi/abi_MerkleTree.json", "utf8")); // 读取abi
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    // 调用 generateProof 生成白名单默克尔证明
    const addressToCheck = wallet.address; // 使用钱包对象生成地址
    const tokenId = 0; // NFT的tokenId
    const proof = await generateProof(addressToCheck);

    // 调用 mint 函数
    const mintTx = await myContract.mint(addressToCheck, tokenId, proof);
    await mintTx.wait(); // 等待交易被打包并确认
    console.log("NFT minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    // [
    //     "0x75d5972b1fA9C2942BCa4F9ceEefE4500c993427",
    //     "0x79aA3D66c92a7F1e8405ae0587E82EBC1b8Abd4e",
    //     "0xf2e0772c91387Af403a67B560C186Bf54c1f57CB",
    //     "0xD1a386fcA2893935c5B011277778854da004cae0"
    //   ]
