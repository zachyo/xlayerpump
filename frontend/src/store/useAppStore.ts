import { create } from 'zustand'

interface TokenForm {
  name: string
  symbol: string
  description: string
  imageUrl: string
}

interface TradeForm {
  tokenAddress: string
  amount: string
}

interface AppState {
  tokenForm: TokenForm
  tradeForm: TradeForm
  setTokenForm: (form: Partial<TokenForm>) => void
  setTradeForm: (form: Partial<TradeForm>) => void
  resetTokenForm: () => void
  resetTradeForm: () => void
}

const initialTokenForm: TokenForm = {
  name: '',
  symbol: '',
  description: '',
  imageUrl: '',
}

const initialTradeForm: TradeForm = {
  tokenAddress: '',
  amount: '',
}

export const useAppStore = create<AppState>((set) => ({
  tokenForm: initialTokenForm,
  tradeForm: initialTradeForm,
  setTokenForm: (form) => set((state) => ({
    tokenForm: { ...state.tokenForm, ...form }
  })),
  setTradeForm: (form) => set((state) => ({
    tradeForm: { ...state.tradeForm, ...form }
  })),
  resetTokenForm: () => set({ tokenForm: initialTokenForm }),
  resetTradeForm: () => set({ tradeForm: initialTradeForm }),
}))