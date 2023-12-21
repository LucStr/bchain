// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Manufacturer is IERC20, Ownable {
    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor()
        Ownable(msg.sender) {
        _totalSupply = 1000;
        _balances[msg.sender] = 2;
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account)
        external
        view
        override
        returns (uint256)
    {
        return _balances[account];
    }

    function transfer(address, uint256) external pure override returns (bool) {
        revert("Transfers are not allowed for this token.");
    }

    function allowance(address, address)
        external
        pure
        override
        returns (uint256)
    {
        return 0;
    }

    function approve(address, uint256) external pure override returns (bool) {
        revert("Approvals are not allowed for this token.");
    }

    function transferFrom(
        address,
        address,
        uint256
    ) external pure override returns (bool) {
        revert("Transfers are not allowed for this token.");
    }

    function mintToken(address account, uint256 amount) external onlyOwner{
        require(account != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(_totalSupply + amount >= _totalSupply, "Overflow");

        _totalSupply = _totalSupply + amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function transferToken(address account, uint256 amount)
        external
        onlyOwner
    {
        require(account != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _balances[msg.sender] -= amount;
        _balances[account] += amount;
        emit Transfer(msg.sender, account, amount);
    }

    function retractToken(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(_balances[account] >= amount, "Insufficient balance");

        _balances[account] -= amount;
        _balances[msg.sender] += amount;
        emit Transfer(account, msg.sender, amount);
    }

    function burnToken(uint256 amount) external onlyOwner {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        require(_totalSupply >= amount, "Total supply cannot be negative");

        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}
