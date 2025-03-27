import { create } from "zustand";
import { useEffect } from "react";
import { useSync } from "@/hooks/useSync";
import { isEqual } from "lodash";

interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

interface CategorySelectionStore {
  selectedCategories: Set<number>;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  toggleCategory: (id: number) => void;
  resetSelection: () => void;
}

// Zustand store that manages category selection
export const useCategorySelectionStore = create<CategorySelectionStore>((set) => ({
  selectedCategories: new Set<number>(),
  categories: [],

  setCategories: (categories) => {
    // ⬇Sort by ID 
    const orderedById = [...categories].sort((a, b) => a.id - b.id);
    set({ categories: orderedById, selectedCategories: new Set() });
  },

  toggleCategory: (id) =>
    set((state) => {
      const updatedSelection = new Set(state.selectedCategories);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return { selectedCategories: updatedSelection };
    }),

  resetSelection: () => set({ selectedCategories: new Set<number>() }),
}));

// Automatically syncs categories from `useSync`
export function useSyncCategories() {
  const { data } = useSync();
  const { categories, setCategories } = useCategorySelectionStore();

  useEffect(() => {
    if (data.Categories && data.Categories.length > 0) {
      const sortedIncoming = [...data.Categories].sort((a, b) => a.id - b.id);
      const sortedExisting = [...categories].sort((a, b) => a.id - b.id);

      if (!isEqual(sortedExisting, sortedIncoming)) {
        setCategories(data.Categories); // let store sort it
      }
    }
  }, [data.Categories, categories, setCategories]);
}