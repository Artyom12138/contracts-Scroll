const fs = require("fs");
const { ethers } = require("ethers");
require("dotenv").config();

async function generateSignature(addressToCheck, tokenId) {
  const privateKey = process.env.PRIVATE_KEY_1; // 用于签名的私钥，合约中上有其地址

  // 读取WhiteList.json文件并解析成JSON格式
  const rawdata = fs.readFileSync("./db/WhiteList.json");
  const WhiteList = JSON.parse(rawdata);

  // 判断地址是否在白名单中
  if (WhiteList.includes(addressToCheck)) {

    const messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [addressToCheck, tokenId]
    );

    const wallet = new ethers.Wallet(privateKey);
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    
    return signature;
    
  } else {
    throw new Error("您不是白名单用户！");
  }
}

module.exports = generateSignature;

