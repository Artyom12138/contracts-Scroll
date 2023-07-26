const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const tokenId = 0;

    const owner = await myContract.ownerOf(tokenId);
    console.log(`Owner of tokenId ${tokenId}: ${owner}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
