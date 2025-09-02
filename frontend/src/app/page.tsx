'use client'

import { useState } from 'react'
import { WalletConnect } from "@/components/wallet-connect";
import { PriceChart } from "@/components/price-chart";
import { PoolStatus } from "@/components/pool-status";
import { useCreateToken, useBuyTokens, useSellTokens, useGetAllTokens } from "@/hooks/useTokenFactory";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const { tokenForm, tradeForm, setTokenForm, setTradeForm } = useAppStore()
  const { createToken, isPending: isCreating } = useCreateToken()
  const { buyTokens, isPending: isBuying } = useBuyTokens()
  const { sellTokens, isPending: isSelling } = useSellTokens()
  const { tokens } = useGetAllTokens()

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault()
    await createToken(tokenForm.name, tokenForm.symbol, tokenForm.description, tokenForm.imageUrl)
  }

  const handleBuyTokens = async (e: React.FormEvent) => {
    e.preventDefault()
    await buyTokens(tradeForm.tokenAddress, tradeForm.amount)
  }

  const handleSellTokens = async (e: React.FormEvent) => {
    e.preventDefault()
    await sellTokens(tradeForm.tokenAddress, tradeForm.amount)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">MemeVault Pro</h1>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-green-400">
            Launch Your Meme Token on X Layer
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create and trade meme tokens with bonding curve mechanics on X Layer blockchain.
            Powered by OKB and pump.fun-style trading.
          </p>
        </div>

        {/* Token Creation Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-green-400">Create Token</h3>
          <form onSubmit={handleCreateToken} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Token Name"
                value={tokenForm.name}
                onChange={(e) => setTokenForm({ name: e.target.value })}
                className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Token Symbol"
                value={tokenForm.symbol}
                onChange={(e) => setTokenForm({ symbol: e.target.value })}
                className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={tokenForm.description}
                onChange={(e) => setTokenForm({ description: e.target.value })}
                className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={tokenForm.imageUrl}
                onChange={(e) => setTokenForm({ imageUrl: e.target.value })}
                className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Creating...' : 'Create Token (1 OKB)'}
            </button>
          </form>
        </div>

        {/* Trading Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-green-400">Trade Tokens</h3>
          <div className="mb-6">
            <PriceChart />
          </div>
          {tradeForm.tokenAddress && (
            <div className="mb-6">
              <PoolStatus tokenAddress={tradeForm.tokenAddress} />
            </div>
          )}
          <form onSubmit={handleBuyTokens} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">Token Address</label>
              <select
                value={tradeForm.tokenAddress}
                onChange={(e) => setTradeForm({ tokenAddress: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              >
                <option value="">Select Token</option>
                {tokens?.map((token) => (
                  <option key={token} value={token}>
                    {token.slice(0, 6)}...{token.slice(-4)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Amount</label>
              <input
                type="number"
                placeholder="100"
                value={tradeForm.amount}
                onChange={(e) => setTradeForm({ amount: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-2 items-end">
              <button
                type="submit"
                disabled={isBuying}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isBuying ? 'Buying...' : 'Buy'}
              </button>
            </div>
          </form>
          <form onSubmit={handleSellTokens} className="flex gap-2">
            <button
              type="submit"
              disabled={isSelling}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isSelling ? 'Selling...' : 'Sell Selected Amount'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
