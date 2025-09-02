import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESSES, OKB_POOL_MANAGER_ABI } from '@/lib/contracts'

export function usePoolData(tokenAddress: string) {
  const { data: poolBalance, isLoading: isLoadingBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.OKBPoolManager as `0x${string}`,
    abi: OKB_POOL_MANAGER_ABI,
    functionName: 'tokenPools',
    args: [tokenAddress as `0x${string}`],
  })

  const { data: isMigrated, isLoading: isLoadingMigrated } = useReadContract({
    address: CONTRACT_ADDRESSES.OKBPoolManager as `0x${string}`,
    abi: OKB_POOL_MANAGER_ABI,
    functionName: 'migrated',
    args: [tokenAddress as `0x${string}`],
  })

  const { data: migrationThreshold } = useReadContract({
    address: CONTRACT_ADDRESSES.OKBPoolManager as `0x${string}`,
    abi: OKB_POOL_MANAGER_ABI,
    functionName: 'MIGRATION_THRESHOLD',
  })

  return {
    poolBalance: poolBalance as bigint | undefined,
    isMigrated: isMigrated as boolean | undefined,
    migrationThreshold: migrationThreshold as bigint | undefined,
    isLoading: isLoadingBalance || isLoadingMigrated,
  }
}