'use client'

import { usePoolData } from '@/hooks/usePoolData'
import { formatEther } from 'viem'

interface PoolStatusProps {
  tokenAddress: string
}

export function PoolStatus({ tokenAddress }: PoolStatusProps) {
  const { poolBalance, isMigrated, migrationThreshold, isLoading } = usePoolData(tokenAddress)

  if (!tokenAddress || isLoading) {
    return (
      <div className="bg-gray-700 rounded p-4">
        <p className="text-sm text-gray-400">Loading pool status...</p>
      </div>
    )
  }

  const balance = poolBalance ? Number(formatEther(poolBalance)) : 0
  const threshold = migrationThreshold ? Number(formatEther(migrationThreshold)) : 80
  const progress = (balance / threshold) * 100

  return (
    <div className="bg-gray-700 rounded p-4">
      <h4 className="text-lg font-semibold mb-2 text-green-400">OKB Pool Status</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Pool Balance:</span>
          <span>{balance.toFixed(2)} OKB</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Migration Threshold:</span>
          <span>{threshold} OKB</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{progress.toFixed(1)}% to migration</span>
          <span className={isMigrated ? 'text-green-400' : 'text-yellow-400'}>
            {isMigrated ? 'Migrated' : 'Bonding Curve'}
          </span>
        </div>
      </div>
    </div>
  )
}