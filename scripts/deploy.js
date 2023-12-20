const hre = require("hardhat");
const { string, int } = require("hardhat/internal/core/params/argumentTypes");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    
    const token = await hre.ethers.getContractFactory("Manufacturer");
    const contract = await token.deploy(100, deployer.address);
    //const token = await hre.ethers.deployContract("Manufacturer", 2, deployer.address);
    console.log("Contract address:", contract.address);

    var debugText = await contract.mintToken(deployer.address, 20);
    console.log(debugText);

    await new Promise(resolve => setTimeout(resolve, 20000));

    var balance = await contract.balanceOf(deployer.address);
    var total = await contract.totalSupply();
    console.log("Balance: " + balance.toNumber() + "| Total Tokens: " + total.toNumber());
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});