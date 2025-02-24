import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";
import NetInfo from "@react-native-community/netinfo";
import { useSync } from "@/hooks/useSync"; // Import global sync hook

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
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        console.log("📱 Online: Fetching categories from Supabase...");
        const { data, error } = await supabase.from("Categories").select("*");
        if (error) {
          console.error("❌ Error fetching categories:", error);
        } else {
          console.log("✅ Categories fetched from Supabase:", data);
          set({ categories: data, isLoading: false });
        }
      } else {
        console.log("📴 Offline: Fetching categories from AsyncStorage...");
        const storedData = await AsyncStorage.getItem("sync_Categories");
        if (storedData) {
          set({ categories: JSON.parse(storedData), isLoading: false });
        } else {
          set({ isLoading: false });
        }
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;