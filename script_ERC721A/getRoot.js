const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const root = await myContract.getRoot();
    console.log(`The root is ${root}.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
