# API Documentation - MemeVault Pro

This document provides technical details about the smart contract interfaces and frontend API.

## Smart Contract Interfaces

### TokenFactory.sol

Main contract for token creation and trading operations.

#### Constructor
```solidity
constructor(address _okbToken, address _poolManager, address initialOwner)
```

#### Functions

##### createToken
Creates a new meme token with custom parameters.

```solidity
function createToken(
    string memory name,
    string memory symbol,
    string memory description,
    string memory imageUrl
) external returns (address tokenAddress)
```

**Parameters:**
- `name`: Token name (string)
- `symbol`: Token symbol (string)
- `description`: Token description (string)
- `imageUrl`: Token image URL (string)

**Returns:** Token contract address

**Requirements:** Sender must approve 1 OKB for creation fee

##### buyTokens
Buys tokens using bonding curve pricing.

```solidity
function buyTokens(address tokenAddress, uint256 amount) external
```

**Parameters:**
- `tokenAddress`: Address of token to buy
- `amount`: Amount of tokens to purchase

**Requirements:** Sender must approve OKB payment

##### sellTokens
Sells tokens back to the bonding curve.

```solidity
function sellTokens(address tokenAddress, uint256 amount) external
```

**Parameters:**
- `tokenAddress`: Address of token to sell
- `amount`: Amount of tokens to sell

**Requirements:** Sender must have sufficient token balance

##### getAllTokens
Returns list of all created tokens.

```solidity
function getAllTokens() external view returns (address[] memory)
```

**Returns:** Array of token addresses

#### Events

```solidity
event TokenCreated(address indexed token, string name, string symbol)
event TokensBought(address indexed token, address buyer, uint256 amount, uint256 cost)
event TokensSold(address indexed token, address seller, uint256 amount, uint256 proceeds)
```

### MemeToken.sol

ERC-20 token with metadata support.

#### Constructor
```solidity
constructor(
    string memory name_,
    string memory symbol_,
    string memory description_,
    string memory imageUrl_,
    address initialOwner
)
```

#### Additional Functions

##### Metadata Getters
```solidity
function description() external view returns (string memory)
function imageUrl() external view returns (string memory)
```

##### Minting (Owner Only)
```solidity
function mint(address to, uint256 amount) external onlyOwner
```

### BondingCurveLogic.sol

Handles price calculations for bonding curves.

#### Functions

##### getBuyCost
Calculates cost to buy tokens at current supply.

```solidity
function getBuyCost(uint256 currentSupply, uint256 amount) public pure returns (uint256)
```

**Parameters:**
- `currentSupply`: Current token supply
- `amount`: Amount to purchase

**Returns:** Total cost in OKB (wei)

##### getSellProceeds
Calculates proceeds from selling tokens.

```solidity
function getSellProceeds(uint256 currentSupply, uint256 amount) public pure returns (uint256)
```

**Parameters:**
- `currentSupply`: Current token supply
- `amount`: Amount to sell

**Returns:** Total proceeds in OKB (wei)

##### getCurrentPrice
Gets current price per token.

```solidity
function getCurrentPrice(uint256 currentSupply) public pure returns (uint256)
```

**Parameters:**
- `currentSupply`: Current token supply

**Returns:** Price per token in OKB (wei)

### OKBPoolManager.sol

Manages OKB pool accumulation and DEX migration.

#### Constants
```solidity
uint256 constant MIGRATION_THRESHOLD = 80 * 10**18; // 80 OKB
uint256 constant LOCKED_AMOUNT = 36 * 10**18; // 36 OKB locked
uint256 constant DEX_LIQUIDITY = 44 * 10**18; // 44 OKB for liquidity
```

#### Functions

##### addToPool
Adds OKB to the pool for a specific token.

```solidity
function addToPool(address token, uint256 amount) external
```

##### canMigrate
Checks if token can migrate to DEX.

```solidity
function canMigrate(address token) external view returns (bool)
```

##### Pool Data
```solidity
function tokenPools(address token) external view returns (uint256)
function migrated(address token) external view returns (bool)
function MIGRATION_THRESHOLD() external view returns (uint256)
```

### FeeDistributor.sol

Handles fee collection and distribution.

#### Constructor
```solidity
constructor(
    address _okbToken,
    address _platformTreasury,
    address _creatorRewards,
    address _referralRewards,
    address initialOwner
)
```

#### Functions

##### distributeFees
Distributes collected fees according to predefined ratios.

```solidity
function distributeFees(uint256 amount) external
```

**Distribution:**
- 50% Platform treasury
- 30% Creator rewards
- 20% Referral program

## Frontend API

### React Hooks

#### useCreateToken
```typescript
const { createToken, isPending, isSuccess, hash } = useCreateToken()
```

#### useBuyTokens
```typescript
const { buyTokens, isPending, isSuccess, hash } = useBuyTokens()
```

#### useSellTokens
```typescript
const { sellTokens, isPending, isSuccess, hash } = useSellTokens()
```

#### useGetAllTokens
```typescript
const { tokens, isLoading } = useGetAllTokens()
```

#### usePoolData
```typescript
const { poolBalance, isMigrated, migrationThreshold, isLoading } = usePoolData(tokenAddress)
```

### State Management

#### useAppStore
```typescript
const { tokenForm, tradeForm, setTokenForm, setTradeForm } = useAppStore()
```

### Components

#### WalletConnect
```typescript
<WalletConnect />
```

#### PriceChart
```typescript
<PriceChart />
```

#### PoolStatus
```typescript
<PoolStatus tokenAddress={address} />
```

## Network Information

### X Layer Mainnet
- **Chain ID**: 196
- **RPC URLs**: https://rpc.xlayer.tech
- **Block Explorer**: https://www.okx.com/explorer/xlayer
- **Native Currency**: OKB

### X Layer Testnet
- **Chain ID**: 195
- **RPC URLs**: https://testrpc.xlayer.tech
- **Block Explorer**: https://www.okx.com/explorer/xlayer
- **Native Currency**: OKB

## Error Codes

### Contract Errors

- `ERC20InsufficientBalance`: Insufficient token balance
- `ERC20InsufficientAllowance`: Insufficient allowance for transfer
- `AccessControlUnauthorizedAccount`: Unauthorized access
- `ReentrancyGuardReentrantCall`: Reentrant call detected

### Frontend Errors

- `USER_REJECTED_REQUEST`: User rejected transaction
- `INSUFFICIENT_FUNDS`: Insufficient gas funds
- `NETWORK_ERROR`: Network connection error
- `CONTRACT_ERROR`: Smart contract execution error

## Gas Estimates

### Contract Deployment
- TokenFactory: ~2.1M gas
- OKBPoolManager: ~1.8M gas
- FeeDistributor: ~1.2M gas

### Function Calls
- createToken: ~180K gas
- buyTokens: ~95K gas
- sellTokens: ~85K gas
- addToPool: ~65K gas

## Rate Limits

- **IP-based**: 100 requests per minute
- **Wallet-based**: 50 transactions per hour
- **Contract calls**: Limited by gas and network capacity

## Webhooks

Currently no webhooks implemented. Contract events can be monitored via:
- The Graph Protocol
- Direct blockchain monitoring
- OKX Explorer API

## SDK

No official SDK available yet. Integration can be done via:
- Direct contract calls
- Wagmi hooks
- Ethers.js library

## Changelog

### v1.0.0
- Initial release
- Basic token creation and trading
- OKB pool system
- DEX migration logic

### Future Versions
- Multi-chain support
- Advanced trading features
- NFT integration
- Governance system

## Support

For technical support:
- **Discord**: Developer community
- **GitHub Issues**: Bug reports and feature requests
- **Email**: dev@memevaultpro.com

## License

This API documentation is licensed under MIT License.