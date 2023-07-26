const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    
    const myContract = await hre.ethers.getContractFactory("CHAINLINK");
    const myContractDeployed = await myContract.deploy("CHAINLINK", "LINK", "0xbdc3c76429498e537b15b3e6ed46e97b25ab61426a44ca05a2c5eff95e2ed957");
    
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
