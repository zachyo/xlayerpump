// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MemeToken.sol";
import "./BondingCurveLogic.sol";
import "./OKBPoolManager.sol";

contract TokenFactory is Ownable {
    IERC20 public okbToken;
    BondingCurveLogic public bondingCurve;
    OKBPoolManager public poolManager;

    uint256 public constant CREATION_FEE = 1 * 10**18; // 1 OKB creation fee
    uint256 public constant FEE_PERCENT = 5; // 5% fee on trades

    mapping(address => bool) public isTokenCreated;
    address[] public allTokens;

    event TokenCreated(address indexed token, string name, string symbol);
    event TokensBought(address indexed token, address buyer, uint256 amount, uint256 cost);
    event TokensSold(address indexed token, address seller, uint256 amount, uint256 proceeds);

    constructor(
        address _okbToken,
        address _poolManager,
        address initialOwner
    ) Ownable(initialOwner) {
        okbToken = IERC20(_okbToken);
        bondingCurve = new BondingCurveLogic();
        poolManager = OKBPoolManager(_poolManager);
    }

    function createToken(
        string memory name,
        string memory symbol,
        string memory description,
        string memory imageUrl
    ) external returns (address) {
        require(okbToken.transferFrom(msg.sender, address(this), CREATION_FEE), "Creation fee transfer failed");

        MemeToken newToken = new MemeToken(name, symbol, description, imageUrl, address(this));
        address tokenAddress = address(newToken);

        isTokenCreated[tokenAddress] = true;
        allTokens.push(tokenAddress);

        // Add creation fee to pool
        okbToken.approve(address(poolManager), CREATION_FEE);
        poolManager.addToPool(tokenAddress, CREATION_FEE);

        emit TokenCreated(tokenAddress, name, symbol);
        return tokenAddress;
    }

    function buyTokens(address tokenAddress, uint256 amount) external {
        require(isTokenCreated[tokenAddress], "Token not created");
        MemeToken token = MemeToken(tokenAddress);

        uint256 currentSupply = token.totalSupply();
        uint256 cost = bondingCurve.getBuyCost(currentSupply, amount);
        require(cost > 0, "Invalid amount");

        // Transfer OKB from buyer
        require(okbToken.transferFrom(msg.sender, address(this), cost), "Payment transfer failed");

        // Mint tokens to buyer
        token.mint(msg.sender, amount);

        // Calculate fee
        uint256 fee = (cost * FEE_PERCENT) / 100;
        uint256 netCost = cost - fee;

        // Add fee to pool
        okbToken.approve(address(poolManager), fee);
        poolManager.addToPool(tokenAddress, fee);

        // The netCost could be used for something, but for now, keep in contract or burn

        emit TokensBought(tokenAddress, msg.sender, amount, cost);
    }

    function sellTokens(address tokenAddress, uint256 amount) external {
        require(isTokenCreated[tokenAddress], "Token not created");
        MemeToken token = MemeToken(tokenAddress);

        uint256 currentSupply = token.totalSupply();
        require(currentSupply >= amount, "Insufficient supply");

        uint256 proceeds = bondingCurve.getSellProceeds(currentSupply, amount);
        require(proceeds > 0, "Invalid amount");

        // Burn tokens from seller
        token.burn(amount);

        // Calculate fee
        uint256 fee = (proceeds * FEE_PERCENT) / 100;
        uint256 netProceeds = proceeds - fee;

        // Add fee to pool
        okbToken.approve(address(poolManager), fee);
        poolManager.addToPool(tokenAddress, fee);

        // Transfer net proceeds to seller
        require(okbToken.transfer(msg.sender, netProceeds), "Proceeds transfer failed");

        emit TokensSold(tokenAddress, msg.sender, amount, netProceeds);
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}