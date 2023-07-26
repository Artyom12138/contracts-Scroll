const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.PRIVATE_KEY_1;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_ERC1155.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    const to = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";
    const id = 1;
    const amount = 10;
    const mintTx = await myContract.mint(to, id, amount);
    await mintTx.wait();
    console.log("NFT minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

