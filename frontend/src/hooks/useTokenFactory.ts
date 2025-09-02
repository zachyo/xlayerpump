import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESSES, TOKEN_FACTORY_ABI, ERC20_ABI } from '@/lib/contracts'
import { parseEther } from 'viem'

export function useCreateToken() {
  const { writeContract, data: hash, isPending } = useWriteContract()

  const createToken = async (
    name: string,
    symbol: string,
    description: string,
    imageUrl: string
  ) => {
    try {
      // First approve OKB spending
      writeContract({
        address: CONTRACT_ADDRESSES.OKB as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.TokenFactory, parseEther('1')], // 1 OKB
      })

      // Then create token
      writeContract({
        address: CONTRACT_ADDRESSES.TokenFactory as `0x${string}`,
        abi: TOKEN_FACTORY_ABI,
        functionName: 'createToken',
        args: [name, symbol, description, imageUrl],
      })
    } catch (error) {
      console.error('Error creating token:', error)
    }
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  return {
    createToken,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  }
}

export function useBuyTokens() {
  const { writeContract, data: hash, isPending } = useWriteContract()

  const buyTokens = async (tokenAddress: string, amount: string) => {
    try {
      // Calculate cost (this would come from bonding curve)
      const cost = parseEther('0.01') // Mock cost, should be calculated

      // Approve OKB
      writeContract({
        address: CONTRACT_ADDRESSES.OKB as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.TokenFactory, cost],
      })

      // Buy tokens
      writeContract({
        address: CONTRACT_ADDRESSES.TokenFactory as `0x${string}`,
        abi: TOKEN_FACTORY_ABI,
        functionName: 'buyTokens',
        args: [tokenAddress as `0x${string}`, BigInt(amount)],
      })
    } catch (error) {
      console.error('Error buying tokens:', error)
    }
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  return {
    buyTokens,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  }
}

export function useSellTokens() {
  const { writeContract, data: hash, isPending } = useWriteContract()

  const sellTokens = async (tokenAddress: string, amount: string) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESSES.TokenFactory as `0x${string}`,
        abi: TOKEN_FACTORY_ABI,
        functionName: 'sellTokens',
        args: [tokenAddress as `0x${string}`, BigInt(amount)],
      })
    } catch (error) {
      console.error('Error selling tokens:', error)
    }
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  return {
    sellTokens,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  }
}

export function useGetAllTokens() {
  const { data: tokens, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.TokenFactory as `0x${string}`,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getAllTokens',
  })

  return {
    tokens: tokens as string[] | undefined,
    isLoading,
  }
}