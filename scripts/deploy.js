const {ethers} = require("hardhat");
const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    
    const Manufacturer = await ethers.getContractFactory("Manufacturer");
    const manufacturer = await Manufacturer.deploy({ gasLimit: 6000000 });
    await manufacturer.deployed();

    //const token = await hre.ethers.deployContract("Manufacturer", 2, deployer.address);
    console.log("Contract address:", manufacturer.address);

    var debugText = await manufacturer.mintToken(deployer.address, 20);
    console.log(debugText);

    await new Promise(resolve => setTimeout(resolve, 20000));

    var balance = await manufacturer.balanceOf(deployer.address);
    var total = await manufacturer.totalSupply();
    console.log("Balance: " + balance.toNumber() + "| Total Tokens: " + total.toNumber());

    const ProductNFT = await ethers.getContractFactory("ProductNFT");
    const productNFT = await ProductNFT.deploy(manufacturer.address);
    console.log("Product Contract address:", productNFT.address);

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("Token address:", token.address);

    saveFrontendFiles({
      Manufacturer: manufacturer.address,
      ProductNFT: productNFT.address,
      Token: token.address,
    })
  }
  
function saveFrontendFiles(content) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(content, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const ManufacturerArtifact = artifacts.readArtifactSync("Manufacturer");
  const ProductNFTArtifact = artifacts.readArtifactSync("ProductNFT");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Manufacturer.json"),
    JSON.stringify(ManufacturerArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "ProductNFT.json"),
    JSON.stringify(ProductNFTArtifact, null, 2)
  );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});