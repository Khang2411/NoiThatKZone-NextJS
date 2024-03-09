import { create } from 'zustand'

interface BearState {
  increasePopulation: () => void
  count: number
  removeCart: () => void
  removeAllCart: () => void
}

export const useCartStore = create<BearState>((set) => ({
  count: 0,
  increasePopulation: () => set((state: { count: number }) => ({ count: state.count + 1 })),
  removeCart: () => set((state: { count: number }) => ({ count: state.count - 1 })),
  removeAllCart: () => set({ count: 0 })
}))