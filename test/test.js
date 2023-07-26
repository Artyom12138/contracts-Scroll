const { expect } = require("chai");

describe("LINK2", function() {
    it("Should return correct name and symbol", async function() {

        const LINK2 = await hre.ethers.getContractFactory("LINK2");

        const myContractDeployed = await LINK2.deploy("chainlink", "LINK");

        await myContractDeployed.deployed();

        expect(await myContractDeployed.name()).to.equal("chainlink");
        expect(await myContractDeployed.symbol()).to.equal("LINK");

    });
});