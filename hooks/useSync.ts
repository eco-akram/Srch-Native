import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";

interface SyncState {
  data: Record<string, any[]>; // Stores data for multiple tables
  syncTable: (table: string) => Promise<void>;
  loadStoredData: (table: string) => Promise<void>;
  subscribeToRealtimeUpdates: (table: string) => void;
}

export const useSync = create<SyncState>((set, get) => ({
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
      } else {
        console.warn(`⚠️ No cached data found for ${table}.`);
      }
    } catch (error) {
      console.error(`❌ Error loading stored data for ${table}:`, error);
    }
  },

  // ✅ Real-time listener (Updates state immediately)
  subscribeToRealtimeUpdates: (table) => {
    const subscription = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: table },
        async (payload) => {
          console.log(`🔄 Real-time update in ${table}:`, payload);

          // Get the latest state
          const currentData = get().data[table] || [];

          // Update state based on event type
          let updatedData = [...currentData];

          if (payload.eventType === "INSERT") {
            updatedData.push(payload.new); // Add new item
          } else if (payload.eventType === "UPDATE") {
            updatedData = updatedData.map((item) =>
              item.id === payload.new.id ? payload.new : item
            ); // Update modified item
          } else if (payload.eventType === "DELETE") {
            updatedData = updatedData.filter((item) => item.id !== payload.old.id); 
          }

          // ✅ Update Zustand store -> UI will re-render automatically
          set((state) => ({ data: { ...state.data, [table]: updatedData } }));

          // ✅ Save updated data to AsyncStorage
          try {
            await AsyncStorage.setItem(`sync_${table}`, JSON.stringify(updatedData));
          } catch (storageError) {
            console.error(`❌ Error saving updated ${table} data to AsyncStorage:`, storageError);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  },
}));
