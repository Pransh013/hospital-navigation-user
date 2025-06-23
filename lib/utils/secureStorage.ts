import * as SecureStore from "expo-secure-store";

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore setItem error:", err);
    }
  },
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("SecureStore getItem error:", err);
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error("SecureStore removeItem error:", err);
    }
  },
};
