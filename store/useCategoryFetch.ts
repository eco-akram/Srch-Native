import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: true,

  fetchCategories: async () => {
    try {
      console.log("📴 Fetching categories from AsyncStorage...");
      const storedData = await AsyncStorage.getItem("sync_Categories");
      if (storedData) {
        set({ categories: JSON.parse(storedData), isLoading: false });
      } else {
        console.warn("⚠️ No categories found in AsyncStorage.");
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("❌ Error fetching categories from AsyncStorage:", err);
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;
