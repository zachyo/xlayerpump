import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const xLayer = {
  id: 196,
  name: 'X Layer',
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.xlayer.tech'] },
  },
  blockExplorers: {
    default: { name: 'OKX Explorer', url: 'https://www.okx.com/explorer/xlayer' },
  },
} as const

export const xLayerTestnet = {
  id: 195,
  name: 'X Layer Testnet',
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testrpc.xlayer.tech'] },
  },
  blockExplorers: {
    default: { name: 'OKX Explorer', url: 'https://www.okx.com/explorer/xlayer' },
  },
} as const

export const config = createConfig({
  chains: [xLayer, xLayerTestnet, mainnet, sepolia],
  connectors: [
    injected({ target: 'metaMask' }),
    injected({ target: 'okxWallet' }),
  ],
  transports: {
    [xLayer.id]: http(),
    [xLayerTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})