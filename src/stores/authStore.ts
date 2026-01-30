import { create } from "zustand";

type AuthState = {
  token: string | null;
  loading: boolean;
  appName: string;
  login: (newToken: string) => void;
  logout: () => void;
  init: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  loading: true,
  appName: "SessionBook",

  init: () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      set({ token: savedToken });
    }
    set({ loading: false });
  },

  login: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    set({ token: null });
  },
}));
