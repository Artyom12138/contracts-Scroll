async function main() {
    // 设置构造函数参数
    const name = "chianlink";
    const symbol = "LINK";
    const systemAddress = "0x75d5972b1fA9C2942BCa4F9ceEefE4500c993427"; // 替换为用于签名的地址

    const myContract = await hre.ethers.getContractFactory("SignatureWhitelist");

    // 在 deploy 方法中传递构造函数参数
    const myContractDeployed = await myContract.deploy(name, symbol, systemAddress);
    await myContractDeployed.deployed();
    console.log("Deployed my contract to:", myContractDeployed.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


