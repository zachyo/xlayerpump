# Deployment Guide

This guide covers the deployment process for MemeVault Pro on X Layer network.

## Prerequisites

- Node.js 18+
- Hardhat
- Private key with OKB for gas fees
- OKX API key for contract verification

## Environment Setup

1. Create `.env` file in the root directory:
```bash
PRIVATE_KEY=your_private_key_without_0x_prefix
OKX_API_KEY=your_okx_api_key_for_verification
```

2. Install dependencies:
```bash
npm install
```

## Network Configuration

### X Layer Mainnet
- **Chain ID**: 196
- **RPC URL**: https://rpc.xlayer.tech
- **Explorer**: https://www.okx.com/explorer/xlayer
- **Currency**: OKB

### X Layer Testnet
- **Chain ID**: 195
- **RPC URL**: https://testrpc.xlayer.tech
- **Explorer**: https://www.okx.com/explorer/xlayer
- **Currency**: OKB

## Contract Deployment

### 1. Compile Contracts
```bash
npx hardhat compile
```

### 2. Test Contracts
```bash
npm test
```

### 3. Deploy to Testnet
```bash
npm run deploy:testnet
```

### 4. Verify Contracts on Testnet
```bash
npm run verify:contracts
```

### 5. Deploy to Mainnet
```bash
npm run deploy:mainnet
```

### 6. Verify Contracts on Mainnet
```bash
npm run verify:contracts
```

## Deployment Addresses

After deployment, update the following addresses in `frontend/src/lib/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  TokenFactory: '0x...', // Deployed TokenFactory address
  OKBPoolManager: '0x...', // Deployed OKBPoolManager address
  OKB: '0x1234567890123456789012345678901234567891', // OKB token address on X Layer
} as const
```

## OKB Token Address

### Mainnet
```
0x1234567890123456789012345678901234567891
```

### Testnet
```
0x1234567890123456789012345678901234567891
```

## Frontend Deployment

### 1. Build Frontend
```bash
cd frontend
npm run build
```

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### 3. Configure Environment Variables
Set the following environment variables in your hosting platform:

```
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_OKB_POOL_MANAGER_ADDRESS=0x...
NEXT_PUBLIC_OKB_ADDRESS=0x...
```

## Verification Steps

### Contract Verification
1. Wait for deployment transaction to be mined
2. Run verification command:
```bash
npx hardhat verify --network xlayer <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Frontend Verification
1. Test all wallet connections
2. Test token creation flow
3. Test trading functionality
4. Verify OKB pool monitoring

## Troubleshooting

### Common Issues

#### 1. Insufficient Gas
- Ensure you have enough OKB in your wallet
- Check gas price settings in Hardhat config

#### 2. Contract Verification Failed
- Check API key is correct
- Ensure contract is compiled with optimization
- Wait a few minutes after deployment

#### 3. Frontend Not Connecting
- Verify contract addresses are correct
- Check network configuration in Wagmi
- Ensure contracts are deployed and verified

#### 4. Transaction Failures
- Check wallet balance
- Verify network selection
- Confirm contract permissions

### Gas Optimization

The contracts are optimized for gas efficiency:
- Use of `calldata` for function parameters
- Efficient data structures
- Batch operations where possible
- Optimized contract size

### Security Checklist

- [ ] All contracts verified on explorer
- [ ] Private keys secured
- [ ] Admin functions protected
- [ ] Emergency pause functionality tested
- [ ] Access controls verified

## Post-Deployment

1. **Monitor Contracts**: Set up monitoring for contract activity
2. **Update Documentation**: Update addresses in all documentation
3. **Community Communication**: Announce launch on social media
4. **Support Setup**: Prepare for user support queries

## Rollback Plan

In case of critical issues:

1. Pause contracts using emergency functions
2. Deploy patched contracts
3. Migrate users to new contracts
4. Update frontend with new addresses

## Support

For deployment issues:
- Check Hardhat documentation
- Review X Layer network status
- Contact OKX support for network issues