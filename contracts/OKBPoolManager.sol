// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OKBPoolManager is Ownable {
    IERC20 public okbToken;
    uint256 public constant MIGRATION_THRESHOLD = 80 * 10**18; // 80 OKB
    uint256 public constant LOCKED_AMOUNT = 36 * 10**18; // 36 OKB locked
    uint256 public constant DEX_LIQUIDITY = 44 * 10**18; // 44 OKB for liquidity

    mapping(address => uint256) public tokenPools; // OKB collected per token
    mapping(address => bool) public migrated; // Whether token has migrated

    event PoolUpdated(address indexed token, uint256 amount);
    event MigrationTriggered(address indexed token);

    constructor(address _okbToken, address initialOwner) Ownable(initialOwner) {
        okbToken = IERC20(_okbToken);
    }

    // Add OKB to pool for a token
    function addToPool(address token, uint256 amount) external {
        require(okbToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        tokenPools[token] += amount;
        emit PoolUpdated(token, amount);

        if (tokenPools[token] >= MIGRATION_THRESHOLD && !migrated[token]) {
            migrateToDEX(token);
        }
    }

    // Check if token can migrate
    function canMigrate(address token) external view returns (bool) {
        return tokenPools[token] >= MIGRATION_THRESHOLD && !migrated[token];
    }

    // Placeholder for DEX migration
    function migrateToDEX(address token) internal {
        migrated[token] = true;
        // TODO: Implement DEX integration
        // Lock 36 OKB
        // Provide 44 OKB + equivalent tokens to DEX
        emit MigrationTriggered(token);
    }

    // Withdraw locked OKB (only after migration, for liquidity)
    function withdrawForLiquidity(address token) external onlyOwner {
        require(migrated[token], "Not migrated");
        uint256 amount = DEX_LIQUIDITY;
        require(okbToken.transfer(msg.sender, amount), "Transfer failed");
    }
}