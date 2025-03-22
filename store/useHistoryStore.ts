import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


// 1. Apibrėžiam istorijos įrašo struktūrą
export interface HistoryRecord {
    id: string;
  answers: Record<string, any>;
  recommendedProduct: {
    id: string; 
    productName: string;
  };
  timestamp: number;
}

// 2. Apibrėžiam store'ą
interface HistoryState {
  historyRecords: HistoryRecord[];

  loadHistory: () => Promise<void>;
  addHistoryRecord: (record: Omit<HistoryRecord, 'id'>) => Promise<void>;
}

// 3. Sukuriam Zustand store'ą
export const useHistoryStore = create<HistoryState>((set, get) => ({
  historyRecords: [],

  loadHistory: async () => {
    try {
      const stored = await AsyncStorage.getItem('historyRecords');
      const parsed: HistoryRecord[] = stored ? JSON.parse(stored) : [];
      set({ historyRecords: parsed });
    } catch (error) {
      console.error('❌ Failed to load history:', error);
    }
  },

  addHistoryRecord: async (partialRecord) => {
    try {
      const record: HistoryRecord = {
        id: uuid.v4().toString(),
        ...partialRecord,
      };

      const updated = [record, ...get().historyRecords];
      set({ historyRecords: updated });
      await AsyncStorage.setItem('historyRecords', JSON.stringify(updated));
    } catch (error) {
      console.error('❌ Failed to add history record:', error);
    }
  },
  
}));
