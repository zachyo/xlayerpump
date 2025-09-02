// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeDistributor is Ownable {
    IERC20 public okbToken;

    address public platformTreasury;
    uint256 public platformPercent = 50; // 50%
    address public creatorRewards;
    uint256 public creatorPercent = 30; // 30%
    address public referralRewards;
    uint256 public referralPercent = 20; // 20%

    constructor(address _okbToken, address _platformTreasury, address _creatorRewards, address _referralRewards, address initialOwner) Ownable(initialOwner) {
        okbToken = IERC20(_okbToken);
        platformTreasury = _platformTreasury;
        creatorRewards = _creatorRewards;
        referralRewards = _referralRewards;
    }

    function distributeFees(uint256 amount) external {
        require(okbToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint256 platformAmount = (amount * platformPercent) / 100;
        uint256 creatorAmount = (amount * creatorPercent) / 100;
        uint256 referralAmount = amount - platformAmount - creatorAmount; // Remaining to referral

        if (platformAmount > 0) okbToken.transfer(platformTreasury, platformAmount);
        if (creatorAmount > 0) okbToken.transfer(creatorRewards, creatorAmount);
        if (referralAmount > 0) okbToken.transfer(referralRewards, referralAmount);
    }

    // Admin functions to update recipients and percentages
    function setPlatformTreasury(address _treasury) external onlyOwner {
        platformTreasury = _treasury;
    }

    function setPercentages(uint256 _platform, uint256 _creator, uint256 _referral) external onlyOwner {
        require(_platform + _creator + _referral == 100, "Percentages must sum to 100");
        platformPercent = _platform;
        creatorPercent = _creator;
        referralPercent = _referral;
    }
}