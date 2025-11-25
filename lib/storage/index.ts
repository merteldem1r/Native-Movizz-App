export * from "./keys";
export * from "./movies";

// Optional: Export a storage utility object
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  // Clear all app data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },

  // Get all keys
  getAllKeys: async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting keys:", error);
      return [];
    }
  },

  // Get multiple items at once
  multiGet: async (keys: string[]) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error("Error getting multiple items:", error);
      return [];
    }
  },
};
