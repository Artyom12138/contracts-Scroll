const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const interfaceId = "0x01ffc9a7";

    const answer = await myContract.supportsInterface(interfaceId);
    console.log(`The answer is ${answer}.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
