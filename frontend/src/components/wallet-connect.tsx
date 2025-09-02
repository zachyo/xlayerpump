'use client'

import { useConnect, useAccount, useSwitchChain } from 'wagmi'
import { xLayer, xLayerTestnet } from '@/lib/wagmi'

export function WalletConnect() {
  const { connectors, connect, isPending } = useConnect()
  const { address, isConnected, chain } = useAccount()
  const { switchChain } = useSwitchChain()

  const okxConnector = connectors.find(c => c.name === 'OKX Wallet')
  const metaMaskConnector = connectors.find(c => c.name === 'MetaMask')

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        {chain?.id !== xLayer.id && (
          <button
            onClick={() => switchChain({ chainId: xLayer.id })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Switch to X Layer
          </button>
        )}
        <span className="text-sm text-green-500">Connected</span>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {okxConnector && (
        <button
          onClick={() => connect({ connector: okxConnector })}
          disabled={isPending}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Connect OKX Wallet
        </button>
      )}
      {metaMaskConnector && (
        <button
          onClick={() => connect({ connector: metaMaskConnector })}
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  )
}