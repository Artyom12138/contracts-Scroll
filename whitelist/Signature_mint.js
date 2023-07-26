const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();
const generateSignature = require("./signMessage"); // 导入签名函数

async function main() {
    // 使用 PRIVATE_KEY_2 创建钱包（Wallet）对象
    const privateKey = process.env.PRIVATE_KEY_2;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    // 获取合约实例
    const abi = JSON.parse(fs.readFileSync("./abi/abi_newSignature.json", "utf8")); // 读取abi
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    // 调用 generateSignature 生成白名单签名
    const addressToCheck = wallet.address; // 使用钱包对象生成地址
    const tokenId = 0; // NFT的tokenId
    const signature = await generateSignature(addressToCheck, tokenId);

    // 调用 mint 函数
    const mintTx = await myContract.mint(tokenId, signature);
    await mintTx.wait(); // 等待交易被打包并确认
    console.log("NFT minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
