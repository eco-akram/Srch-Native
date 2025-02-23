import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";

interface SyncState {
  data: Record<string, any[]>; // Stores data for multiple tables
  syncTable: (table: string) => Promise<void>;
  loadStoredData: (table: string) => Promise<void>;
}

export const useSync = create<SyncState>((set) => ({
  data: {},

  // ✅ Fetch latest data from Supabase and update Zustand (NO AsyncStorage updates)
  syncTable: async (table) => {
    const { data, error } = await supabase.from(table).select("*");

    if (!error && data) {
      set((state) => ({ data: { ...state.data, [table]: data } }));
    } else {
      console.error(`❌ Failed to sync ${table} from Supabase:`, error);
    }
  },

  // ✅ Load data from AsyncStorage when offline (NO updates to AsyncStorage)
  loadStoredData: async (table) => {
    try {
      const storedData = await AsyncStorage.getItem(`sync_${table}`);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        set((state) => ({ data: { ...state.data, [table]: parsedData } }));
      } else {
        console.warn(`⚠️ No cached data found for ${table}.`);
      }
    } catch (error) {
      console.error(`❌ Error loading stored data for ${table} from AsyncStorage:`, error);
    }
  },
}));
