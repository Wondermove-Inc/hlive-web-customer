import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface TokenState {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useTokenStore = create(
  persist<TokenState>(
    (set) => ({
      token: '',
      setToken: (token: string) =>
        set((state) => ({
          ...state,
          token,
        })),
      removeToken: () =>
        set((state) => ({
          ...state,
          token: '',
        })),
    }),
    {
      name: 'token-storage',
    },
  ),
);

export default useTokenStore;
