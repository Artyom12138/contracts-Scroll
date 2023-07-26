const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.PRIVATE_KEY_2;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_ERC1155.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);
    
    
    const from = "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4";
    const to = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";
    const id = 0;
    const amount = 5;  
    const data = "0x";
    
    const Tx = await myContract.safeTransferFrom(from, to, id, amount, data);
    await Tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

