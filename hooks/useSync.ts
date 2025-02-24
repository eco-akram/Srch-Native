import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";
import useCategoryStore from "@/store/useCategoryFetch"; // Import the Zustand store

interface SyncState {
  data: Record<string, any[]>; // Stores data for multiple tables
  syncTable: (table: string) => Promise<void>;
  loadStoredData: (table: string) => Promise<void>;
  subscribeToRealtimeUpdates: (table: string) => void;
}

export const useSync = create<SyncState>((set) => ({
  data: {},

  // ✅ Fetch latest data from Supabase and update Zustand store
  syncTable: async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (!error && data) {
      set((state) => ({ data: { ...state.data, [table]: data } }));

      // Save to AsyncStorage for offline use
      try {
        await AsyncStorage.setItem(`sync_${table}`, JSON.stringify(data));
      } catch (storageError) {
        console.error(`❌ Error saving ${table} data to AsyncStorage:`, storageError);
      }

      // ✅ Broadcast to Zustand store if it's Categories
      if (table === "Categories") {
        console.log("🔄 Updating Categories Zustand store...");
        useCategoryStore.setState({ categories: data, isLoading: false });
      }
    } else {
      console.error(`❌ Failed to sync ${table} from Supabase:`, error);
    }
  },

  // ✅ Load cached data from AsyncStorage when offline
  loadStoredData: async (table) => {
    try {
      const storedData = await AsyncStorage.getItem(`sync_${table}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        set((state) => ({ data: { ...state.data, [table]: parsedData } }));

        // ✅ Update Zustand store if it's Categories
        if (table === "Categories") {
          useCategoryStore.setState({ categories: parsedData, isLoading: false });
        }
      } else {
        console.warn(`⚠️ No cached data found for ${table}.`);
      }
    } catch (error) {
      console.error(`❌ Error loading stored data for ${table}:`, error);
    }
  },

  // ✅ Global real-time listener
  subscribeToRealtimeUpdates: (table) => {
    const subscription = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: table },
        async () => {
          console.log(`🔄 Detected real-time update in ${table}, syncing...`);
          await useSync.getState().syncTable(table); // Sync data globally
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  },
}));