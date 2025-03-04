// stores/languageStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'lt' | 'en' | 'de' | "ru"; // Define supported languages

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
  loadLanguage: () => Promise<void>;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'lt', // Default language
  setLanguage: async (language) => {
    await AsyncStorage.setItem('language', language); // Save to AsyncStorage
    set({ language }); // Update Zustand state
  },
  loadLanguage: async () => {
    const savedLanguage = await AsyncStorage.getItem('language'); // Load from AsyncStorage
    if (savedLanguage === 'lt' || savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'ru') {
      set({ language: savedLanguage }); // Update Zustand state
    }
  },
}));