import { secureStorage } from "@/lib/utils/secureStorage";
import { AuthState } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      patient: null,
      isSignedIn: false,
      isHydrating: true,

      signin: (token, patient) => set({ token, patient, isSignedIn: true }),

      signout: () => {
        set({ token: null, patient: null, isSignedIn: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrating = false;
        }
      },
    }
  )
);
