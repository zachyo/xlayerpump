// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BondingCurveLogic {
    uint256 public constant BASE_PRICE = 0.0001 ether; // 0.0001 ETH in wei
    uint256 public constant PRICE_INCREMENT = 1000000000; // 10^9 wei per token

    // Calculate the cost to buy 'amount' tokens at current supply
    function getBuyCost(uint256 currentSupply, uint256 amount) public pure returns (uint256) {
        if (amount == 0) return 0;
        uint256 startPrice = BASE_PRICE + (currentSupply * PRICE_INCREMENT);
        uint256 endPrice = BASE_PRICE + ((currentSupply + amount) * PRICE_INCREMENT);
        // Average price * amount
        uint256 averagePrice = (startPrice + endPrice) / 2;
        return averagePrice * amount;
    }

    // Calculate the proceeds from selling 'amount' tokens at current supply
    function getSellProceeds(uint256 currentSupply, uint256 amount) public pure returns (uint256) {
        if (amount == 0 || currentSupply < amount) return 0;
        uint256 startPrice = BASE_PRICE + ((currentSupply - amount) * PRICE_INCREMENT);
        uint256 endPrice = BASE_PRICE + (currentSupply * PRICE_INCREMENT);
        // Average price * amount
        uint256 averagePrice = (startPrice + endPrice) / 2;
        return averagePrice * amount;
    }

    // Get current price per token
    function getCurrentPrice(uint256 currentSupply) public pure returns (uint256) {
        return BASE_PRICE + (currentSupply * PRICE_INCREMENT);
    }
}