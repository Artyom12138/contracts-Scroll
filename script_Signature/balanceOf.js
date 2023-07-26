const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const address = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458";

    const amount = await myContract.balanceOf(address);
    console.log(`${address} has ${amount} tokens.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
