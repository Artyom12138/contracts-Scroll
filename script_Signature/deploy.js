const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    
    const myContract = await hre.ethers.getContractFactory("SignatureWhitelist");
    const myContractDeployed = await myContract.deploy("SignatureWhitelist", "LINK", "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4");
    
    await myContractDeployed.deployed();
    console.log("Deployed my contract to:", myContractDeployed.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// 0xC52cfEc098f5e10eAA5C41D88b92cC0EE34B25bF
