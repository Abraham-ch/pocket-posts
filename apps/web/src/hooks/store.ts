import { create } from 'zustand'

type StoreType = {
  openComments: Set<string>
  toggleComment: (postId: string) => void
}

export const useStore = create<StoreType>((set) => ({
  openComments: new Set(),
  toggleComment: (postId) =>
    set((state) => {
      const next = new Set(state.openComments)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return { openComments: next }
    }),
}))
