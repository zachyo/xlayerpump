import { WalletConnect } from "@/components/wallet-connect";
import { PriceChart } from "@/components/price-chart";

export default function Home() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Token Name"
              className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Token Symbol"
              className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
            />
            <input
              type="url"
              placeholder="Image URL"
              className="px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
            />
          </div>
          <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            Create Token (1 OKB)
          </button>
        </div>

        {/* Trading Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-green-400">Trade Tokens</h3>
          <div className="mb-6">
            <PriceChart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">Token Address</label>
              <input
                type="text"
                placeholder="0x..."
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Amount</label>
              <input
                type="number"
                placeholder="100"
                className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                Buy
              </button>
              <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Sell
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
