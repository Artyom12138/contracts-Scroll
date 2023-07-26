const { contractAddress } = require("../config.js");

async function main() {

    const myContract = await ethers.getContractAt("testERC1155", contractAddress);

    const account = "0x422ae0c6Ac894D2d7DA900a1Bc7e635225363CA4";
    const id = 0;
    

    const amount = await myContract.balanceOf(account, id);
    console.log(`${account} has ${amount}  ${id} tokens.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
