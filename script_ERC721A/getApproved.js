const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const tokenId = 1;

    const approved = await myContract.getApproved(tokenId);
    console.log(`The address is approved for token ${tokenId}: ${approved}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
