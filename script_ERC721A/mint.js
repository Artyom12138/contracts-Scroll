const { ethers } = require("ethers");
const { contractAddress, chainProvider } = require("../config.js");
const fs = require("fs");
require("dotenv").config();

async function main() {

    const privateKey = process.env.PRIVATE_KEY_2;
    const provider = new ethers.providers.JsonRpcProvider(chainProvider);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("./abi/abi_ERC721A.json", "utf8"));
    const myContract = new ethers.Contract(contractAddress, abi, wallet);

    const quantity = 3;
    const proof = ["0x2e505147185fbd84bb3ab959e11b693ed52a3d895200e23f2af5e79c7ae84f33","0xef9341fafd90f3f27424829e862b678f245b9b311a7297fdae721a37690ce2bc","0x8d52f6be0ba5443479c657d2b8ecf14289cd3b87de2a49eff1b7e5714d463b3a"];
    const mintTx = await myContract.mint(quantity, proof);
    await mintTx.wait();
    console.log("NFT minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

