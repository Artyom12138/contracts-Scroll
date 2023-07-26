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
    
    const proof = ["0x1e46bb01a9886326e686d1a6b2643ed409d51a04f81bd1f11f184066e63b95f3","0x3d01910e62b60657d38acef9e44502144f8c71e90a95fef5147e272d16f01a71"];
    const address = "0x75d5972b1fA9C2942BCa4F9ceEefE4500c993427";
    const amount = 1;
    
    await myContract.verifyMerkleTree(proof, address, amount);
    console.log("OK!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

