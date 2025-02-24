import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves data from AsyncStorage
 * @param {string} key - The key under which data is stored.
 * @returns {Promise<any | null>} - The retrieved data or null if not found.
 */
export const getStoredData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error fetching ${key} from AsyncStorage:`, error);
    return null;
  }
};

/**
 * Saves data to AsyncStorage
 * @param {string} key - The key under which data should be stored.
 * @param {any} value - The data to be stored.
 * @returns {Promise<void>}
 */
export const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to AsyncStorage:`, error);
  }
};
