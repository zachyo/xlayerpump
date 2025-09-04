'use client'

import { useAccount } from 'wagmi'
import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESSES, TOKEN_FACTORY_ABI } from '@/lib/contracts'

export default function AdminPage() {
  const { address, isConnected } = useAccount()

  // Only allow specific admin addresses
  const isAdmin = address === '0x37cFF24EAe0629FE7060EB7D260Ab37492D22E1D' // Replace with actual admin address

  const { data: allTokens } = useReadContract({
    address: CONTRACT_ADDRESSES.TokenFactory as `0x${string}`,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getAllTokens',
  })

  // const { writeContract } = useWriteContract()

  if (!isConnected) {
    return <div>Please connect your wallet</div>
  }

  if (!isAdmin) {
    return <div>Access denied. Admin only.</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Platform Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Tokens:</span>
              <span>{allTokens?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users:</span>
              <span>1,234</span>
            </div>
            <div className="flex justify-between">
              <span>Total Volume:</span>
              <span>12,345 OKB</span>
            </div>
          </div>
        </div>

        {/* Contract Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contract Management</h2>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Pause Contracts
            </button>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Resume Contracts
            </button>
            <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Emergency Stop
            </button>
          </div>
        </div>

        {/* Fee Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Fee Management</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Creation Fee:</span>
              <span>1 OKB</span>
            </div>
            <div className="flex justify-between">
              <span>Trading Fee:</span>
              <span>5%</span>
            </div>
            <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Update Fees
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-gray-700 rounded">
              <span>New token created: DOGE</span>
              <span>2 hours ago</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700 rounded">
              <span>Pool migration: SHIB</span>
              <span>4 hours ago</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700 rounded">
              <span>High volume trade: PEPE</span>
              <span>6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}