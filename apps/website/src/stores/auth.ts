import { Storage } from '@/libs/constants';
import { getLocalStore } from '@/libs/utils';
import { create } from 'zustand';

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: any | null;
};

const initState: Auth = {
  accessToken: getLocalStore(Storage.ACCESS_TOKEN) || '',
  refreshToken: getLocalStore(Storage.REFRESH_TOKEN) || '',
  user: null,
};

export const useAuthStore = create<any>((set) => ({
  auth: initState,
  setAccessToken: (token: string) => set((state: any) => ({ ...state, auth: { ...state.auth, accessToken: token } })),
  setRefreshToken: (token: string) => set((state: any) => ({ ...state, auth: { ...state.auth, refreshToken: token } })),
  setUser: (user: any | null) => set((state: any) => ({ ...state, auth: { ...state.auth, user } })),
  logout: () =>
    set((state: any) => ({
      ...state,
      auth: initState,
    })),
}));
