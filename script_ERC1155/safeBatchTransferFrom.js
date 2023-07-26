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
    
    const from = "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4";
    const to = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";
    const ids = [0, 1];
    const amounts = [5, 1];
    const data = "0x";
    
    const Tx = await myContract.safeBatchTransferFrom(from, to, ids, amounts, data);
    await Tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

