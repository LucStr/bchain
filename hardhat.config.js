require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const INFURA_API_KEY = "2970dee166d44e9eb92fdf859016a224";
const SEPOLIA_PRIVATE_KEY = "c48d88704edbd4222a298b1b3a1bc2a63f9353c67a3c61e00a5dd3f514f89742";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.9",
        settings: {},
      },
    ],
  },
  networks: {
      sepolia: {
        url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
        accounts: [SEPOLIA_PRIVATE_KEY]
      },
      /*hardhat: {
           gas: 100000000000000,
           blockGasLimit: 0x1ffffffffffff,
           allowUnlimitedContractSize: true
      },*/
  }
};
