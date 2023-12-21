const { expect } = require("chai");
const { BigNumber } = require("ethers");
const {ethers} = require("hardhat");
const keccak256 = require('keccak256')

describe("DApp Tests", function () {
  var _manuContract;
  var _prodContract;
  var _deployer;
  var _otherAcc;
  var _prodToken;

  it("A new Manufacturer Token should be created", async function (){
    [_deployer, _otherAcc] = await ethers.getSigners();


    console.log("Deploying contracts with the account:", _deployer.address);

    const manuFactory = await ethers.getContractFactory("Manufacturer");
    _manuContract = await manuFactory.deploy({ gasLimit: 6000000 });
    console.log("Contract address:", _manuContract.address);

    expect(await _manuContract.totalSupply() == 1000);  
  });

  it("A new Product should be created", async function () {
    const productToken = await ethers.getContractFactory("ProductNFT");
    _prodContract = await productToken.deploy(_manuContract.address);
    console.log("Product Contract address:", _prodContract.address);

    expect(await _prodContract.checkTokenBalance(_deployer.address) == 1);
  });

  it("Mint new Manufacturer", async function (){
    const initTotal = await _manuContract.totalSupply();
    const initBalance = await _manuContract.balanceOf(_otherAcc.address);

    const amount = 1;

    await _manuContract.mintToken(_otherAcc.address, amount);

    expect(
      await _manuContract.totalSupply() == initTotal + amount
      &&
      await _manuContract.balanceOf(_deployer.address) == initBalance + amount
    );
  });

  it("Mint new Product", async function (){
    const txResponse = await _prodContract.mintProduct("HP", "ZZ4465Z123");
      const txReceipt = await txResponse.wait();
      const [tokenMinted] = txReceipt.events;
      const { tokenId } = tokenMinted.args;
      console.log(tokenId);
      
      _prodToken = tokenId;

    expect(_prodContract.getProductDetails(tokenId).brand == "HP");
  });

  it("Transfer Token", async function (){
    console.log(_prodToken);
    await _prodContract.transferFrom(_deployer.address, _otherAcc.address, _prodToken);

    expect(1==1);
  });

});