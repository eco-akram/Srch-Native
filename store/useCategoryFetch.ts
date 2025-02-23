import { create } from "zustand";
import { supabase } from "../utils/supabase";
import { useSync } from "@/hooks/useSync";

interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  refreshFromManager: () => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: true,

  fetchCategories: async () => {
    try {
      // ✅ Fetch from Supabase
      const { data, error } = await supabase
        .from("Categories")
        .select("id, categoryName, categoryDescription");

      if (error) {
        console.error("❌ Supabase Fetch Error:", error);
        set({ isLoading: false });
        return;
      }

      if (data) {
        set({ categories: data, isLoading: false }); // ✅ Set state only
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err instanceof Error ? err.message : "Unknown error");
      set({ isLoading: false });
    }
  },

  // ✅ Fetch latest data from SyncManager
  refreshFromManager: () => {
    const { data } = useSync();
    set({ categories: data["Categories"] || [] });
    console.log("🔄 Categories refreshed from SyncManager.");
  },
}));

// ✅ Subscribe to Supabase real-time changes
supabase
  .channel("realtime:categories")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "Categories" },
    async () => {
      console.log("🔄 Supabase Change Detected - Notifying SyncManager");

      // ✅ Notify SyncManager to update Zustand state
      useCategoryStore.getState().refreshFromManager();
    }
  )
  .subscribe();

export default useCategoryStore;
