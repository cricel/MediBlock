// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mediblock {
    address public owner;
    
    struct Data {
        string textData;
        address owner;
        uint256 price;
        bool isForSale;
    }

    mapping(uint256 => Data) public dataRecords;
    uint256 public dataCount;

    event DataUploaded(uint256 indexed id, address indexed owner, uint256 price);
    event DataPurchased(uint256 indexed id, address indexed buyer, uint256 price);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function uploadData(string memory _textData, uint256 _price) external {
        dataCount++;
        dataRecords[dataCount] = Data({
            textData: _textData,
            owner: msg.sender,
            price: _price,
            isForSale: true
        });
        emit DataUploaded(dataCount, msg.sender, _price);
    }

    function purchaseData(uint256 _id) external payable {
        require(_id <= dataCount && _id > 0, "Invalid data ID");
        Data storage data = dataRecords[_id];
        require(data.isForSale, "Data is not for sale");
        require(msg.value >= data.price, "Insufficient funds");

        address payable seller = payable(data.owner);
        seller.transfer(msg.value);

        data.isForSale = false;
        emit DataPurchased(_id, msg.sender, data.price);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getData(uint256 _id) external view returns (string memory) {
        require(_id <= dataCount && _id > 0, "Invalid data ID");
        return dataRecords[_id].textData;
    }
}