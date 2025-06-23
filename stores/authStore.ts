import { secureStorage } from "@/lib/utils/secureStorage";
import { TokenPayload } from "@/types";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  user: TokenPayload | null;
  isSignedIn: boolean;
  signin: (token: string, user: TokenPayload) => void;
  signout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isSignedIn: false,

      signin: (token, user) => set({ token, user, isSignedIn: true }),

      signout: () => {
        set({ token: null, user: null, isSignedIn: false });
        SecureStore.deleteItemAsync("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isSignedIn: state.isSignedIn,
      }),
    }
  )
);
