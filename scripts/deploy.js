const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    
    const Manufacturer = await ethers.getContractFactory("Manufacturer");
    const contract = await Manufacturer.deploy({ gasLimit: 6000000 });
    await contract.deployed();

    //const token = await hre.ethers.deployContract("Manufacturer", 2, deployer.address);
    console.log("Contract address:", contract.address);

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