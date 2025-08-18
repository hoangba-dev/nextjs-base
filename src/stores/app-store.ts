import { User } from 'next-auth'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

type State = {
  user: User | null
}

type Action = {
  setUser: (user: User | null) => void
  reset: () => void
}

type AppStoreState = State & Action

const initialState: State = {
  user: null
}

export const useAppStore = create<AppStoreState>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        setUser: (user: User | null) =>
          set((state) => {
            state.user = user
          }),
        reset: () => set(() => initialState)
      })),
      {
        name: 'app-store'
      }
    )
  )
)
