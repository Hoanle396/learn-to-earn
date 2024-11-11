import { create } from "zustand";

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: any | null;
}

const initState: Auth = {
  accessToken: "",
  refreshToken: "",
  user: null,
}

export const useAuthStore = create((set) => ({
  auth: initState,
  setAccessToken: (token: string) => set((state: Auth) => state.accessToken = token),
  setRefreshToken: (token: string) => set((state: Auth) => state.refreshToken = token),
  setUser: (user: any | null) => set((state: Auth) => state.user = user),
  logout: () => set((state: Auth) => {
    state.accessToken = "";
    state.refreshToken = "";
    state.user = null
  })
}));
