require("@nomicfoundation/hardhat-toolbox");
const INFURA_API_KEY = "e6818b52418441d0a861ea0f38a509aa";
const SEPOLIA_KEY = "343cd8d869cb4f001c623edbd16b6d7223f5780afdc2c9bdf571fa98c8f63abb"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks : {
    sepolia : {
      url:`https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts :[SEPOLIA_KEY]
    }
  },
};
