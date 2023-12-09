require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const WALLET_KEY = process.env.WALLET_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [WALLET_KEY],
    },
    basegoerli: {
      url: "https://goerli.base.org",
      chainId: 84531,
      accounts: [WALLET_KEY],
      gasPrice: 1000000000,
      verify: {
        etherscan: {
          apiUrl: "https://api-goerli.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
        },
      },
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
      accounts: [WALLET_KEY],
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [WALLET_KEY],
      chainId: 44787,
    }
  },
  etherscan: {
    apiKey: {
      "basegoerli": "PLACEHOLDER_STRING",
      "scrollSepolia" : "KJA7FGB7RD8T2534HBHIVM2ITGYQVGE7PZ"
    },
    customChains: [
      {
        network: "basegoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      }
    ],
  },
};
