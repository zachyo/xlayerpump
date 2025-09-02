// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeToken is ERC20, Ownable {
    string public description;
    string public imageUrl;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory description_,
        string memory imageUrl_,
        address initialOwner
    ) ERC20(name_, symbol_) Ownable(initialOwner) {
        description = description_;
        imageUrl = imageUrl_;
    }

    // Function to mint tokens (only by owner, which will be the factory)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Function to burn tokens
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}