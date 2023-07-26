const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.PRIVATE_KEY_1;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_ERC721A.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    const from = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";
    const to = "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4";
    const tokenId = 1;
    const Tx = await myContract.transferFrom(from, to, tokenId);
    await Tx.wait();
    console.log("Transfer successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

