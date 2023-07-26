const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("CHAINLINK", contractAddress);

    const owner = "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4";
    const operator = "0xdd9aCd81F2f560C467Ad66a15CB41b69dcBcC458"; 

    const approved = await myContract.isApprovedForAll(owner, operator);
    console.log(`The answer is ${approved}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
