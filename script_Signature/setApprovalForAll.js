const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.PRIVATE_KEY_1;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_newSignature.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    const operator = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";
    const approved = true;
    const Tx = await myContract.setApprovalForAll(operator, approved);
    await Tx.wait();
    console.log("Appove successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

