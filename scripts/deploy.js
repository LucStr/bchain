const hre = require("hardhat");
const { string, int } = require("hardhat/internal/core/params/argumentTypes");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    
    const manuToken = await hre.ethers.getContractFactory("Manufacturer");
    const manuContract = await manuToken.deploy(100, deployer.address);
    console.log("Manu Contract address:", manuContract.address);

    var debugText = await manuContract.mintToken(deployer.address, 20);
    console.log(debugText);

    await new Promise(resolve => setTimeout(resolve, 20000));

    var balance = await manuContract.balanceOf(deployer.address);
    var total = await manuContract.totalSupply();
    console.log("Balance: " + balance.toNumber() + "| Total Tokens: " + total.toNumber());

    const productToken = await hre.ethers.getContractFactory("ProductNFT");
    const productContract = await productToken.deploy(manuContract.address, deployer.address);
    console.log("Product Contract address:", productContract.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});