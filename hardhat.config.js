/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const  { INfURA_API_KEY, G_PRIVATE_KEY_1, G_PRIVATE_KEY_2, G_PRIVATE_KEY_3, G_PRIVATE_KEY_4, G_PRIVATE_KEY_5, PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3, PRIVATE_KEY_4, PRIVATE_KEY_5 } = process.env;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "scrollAlpha",
  networks: {
    hardhat: {},
    // 这是本地Ganache的环境
    localnetwork: {
      url: `HTTP://127.0.0.1:7545`,
      accounts: [
        G_PRIVATE_KEY_1,
        G_PRIVATE_KEY_2,
        G_PRIVATE_KEY_3,
        G_PRIVATE_KEY_4,
        G_PRIVATE_KEY_5
      ],
      chainId: 1337
    },
    goerli: {
      // url: `https://goerli.infura.io/v3/${INfURA_API_KEY}`,
      url: `https://weathered-young-dream.ethereum-goerli.discover.quiknode.pro/${INfURA_API_KEY}`,
      accounts: [],
      chainId: 5
    },
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2" || "",
      accounts: [
        PRIVATE_KEY_1,
        PRIVATE_KEY_2,
        PRIVATE_KEY_3,
        PRIVATE_KEY_4,
        PRIVATE_KEY_5
      ],
      chainId: 534353
    },
  },
  etherscan: {
    apiKey: {
      scrollAlpha: 'abc',
    },
    customChains: [
      {
        network: 'scrollAlpha',
        chainId: 534353,
        urls: {
          apiURL: 'https://blockscout.scroll.io/api',

          browserURL: 'https://blockscout.scroll.io/',
        },
      },
    ],
  },
};
