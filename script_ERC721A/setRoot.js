const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.G_PRIVATE_KEY_1;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_ERC721A.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    const root = "0x75d5972b1fA9C2942BCa4F9ceEefE4500c993427";
    const Tx = await myContract.setRoot(root);
    await Tx.wait();
    console.log("Set root successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

