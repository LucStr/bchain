// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProductNFT is ERC721, ERC721Burnable, Ownable {
    struct Product {
        string brand;
        string serialNumber;
        string transferLogs;
    }
/**
    struct Transfer {
        address station;
        string name;
    }

    Transfer[] public TransferHistory;
*/
    mapping(uint256 => Product) public products;

    IERC20 public tokenContract;

    function checkTokenBalance(address userAddress)
        public
        view
        returns (uint256)
    {
        return tokenContract.balanceOf(userAddress);
    }

    modifier onlyManufacturer() {
        require(
            checkTokenBalance(msg.sender) >= 2,
            "Not authorized to mint");
        _;
    }

    modifier onlyTransfer() {
        require(
            checkTokenBalance(msg.sender) >= 1,
            "Not authorized to service"
        );
        _;
    }

    constructor(address _tokenContractAddress, address initialOwner) 
        ERC721("Product", "WTK")
        Ownable(msg.sender) {
        tokenContract = IERC20(_tokenContractAddress);
    }

    function mintProduct(
        string memory brand,
        string memory serialNumber
    ) public onlyManufacturer returns (uint256) {
        Product memory newProduct = Product(brand, serialNumber, "");
        uint256 tokenId = uint256(
            keccak256(abi.encode(brand, serialNumber))
        );
        products[tokenId] = newProduct;
        _safeMint(msg.sender, tokenId);
        appendLog(tokenId, "Heute", brand, "Hersteller hat Produkt erstellt.");
        return tokenId;
    }

    function getProductDetails(uint256 tokenId)
        public
        view
        returns (Product memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return products[tokenId];
    }

    function appendLog(uint256 tokenId, string memory date, string memory name, string memory logEntry)
        public
        onlyTransfer
    {
        require(_ownerOf(tokenId) != address(0), "NFT does not exist");
        Product storage product = products[tokenId];

        bytes memory jsonData = bytes(product.transferLogs);

        product.transferLogs = string(abi.encodePacked(jsonData, "//"));

        product.transferLogs = string(
            abi.encodePacked(product.transferLogs, '{"Datum" : "', date, '", "Lieferant" : "', name, '", "Beschreibung" : "', logEntry, '"}')
        );
    }

    // Override the TransferFrom function
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.safeTransferFrom(from, to, tokenId);
        appendLog(tokenId, "Heute", "Transfer", "Von 0x069086eE75c01D9A77138ED9F98D6F39Ac0233f1 nach 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 transferiert.");
    }

    function getLogs(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "NFT does not exist");
        return products[tokenId].transferLogs;
    }
}
