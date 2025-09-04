'use client'

import { motion } from 'framer-motion'
import { WalletConnect } from "@/components/wallet-connect"
import {
  Zap,
  Shield,
  TrendingUp,
  // Users,
  Coins,
  ArrowRight,
  // CheckCircle,
  Star,
  Globe,
  // Lock,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Token Creation",
      description: "Launch your meme token in seconds with just 1 OKB. No complex setup required."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Fair Bonding Curves",
      description: "Mathematical price discovery ensures fair token distribution and prevents dumps."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Audited",
      description: "Built with OpenZeppelin standards and ready for professional security audit."
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "OKB Integration",
      description: "Native OKB support with automatic pool accumulation and DEX migration."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "X Layer Optimized",
      description: "Built specifically for X Layer's fast, low-cost transactions and OKB ecosystem."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Live price charts, pool monitoring, and trading volume analytics."
    }
  ]

  const stats = [
    { value: "50+", label: "Tokens Launched" },
    { value: "$100K+", label: "Trading Volume" },
    { value: "500+", label: "Active Users" },
    { value: "10+", label: "DEX Migrations" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            MemeVault Pro
          </motion.div>
          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              App
            </Link>
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-green-300 bg-clip-text text-transparent leading-tight">
                Launch Meme Tokens
                <br />
                <span className="text-green-400">On X Layer</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The premier platform for creating and trading meme tokens with bonding curve mechanics,
                powered by OKB on X Layer blockchain.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/app"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <Coins className="w-5 h-5" />
                Launch App
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/app"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                View Marketplace
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose MemeVault Pro?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of meme token platforms with cutting-edge features
              and unparalleled user experience.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-green-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Token",
                description: "Pay 1 OKB to launch your meme token with custom parameters and branding."
              },
              {
                step: "02",
                title: "Fair Trading",
                description: "Users buy and sell through bonding curves, accumulating fees in the OKB pool."
              },
              {
                step: "03",
                title: "DEX Migration",
                description: "When pool reaches 80 OKB, token automatically migrates to OkieSwap with liquidity."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-green-400/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Launch Your Token?
            </h2>
            <p className="text-xl text-gray-300">
              Join hundreds of creators who have successfully launched their meme tokens
              on the most innovative platform in Web3.
            </p>
            <motion.a
              href="/app"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg items-center gap-3 mx-auto inline-flex"
            >
              <Star className="w-6 h-6" />
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                MemeVault Pro
              </div>
              <p className="text-gray-400 text-sm">
                The future of meme token creation and trading on X Layer.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Create Token</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 MemeVault Pro. Built on X Layer.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
