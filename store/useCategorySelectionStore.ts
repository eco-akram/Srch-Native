import { create } from "zustand";
import { useEffect } from "react";
import { useSync } from "@/hooks/useSync";

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
    // Sort categories by categoryName alphabetically
    const sortedCategories = [...categories].sort((a, b) => a.categoryName.localeCompare(b.categoryName));

    set({ categories: sortedCategories, selectedCategories: new Set() });
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
    // Check if categories have changed before calling setCategories
    if (data.Categories && data.Categories.length > 0) {
      const sortedCategories = [...data.Categories].sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      // Compare with current categories to avoid redundant updates
      if (JSON.stringify(categories) !== JSON.stringify(sortedCategories)) {
        setCategories(sortedCategories); // Set categories and sort them alphabetically
      }
    }
  }, [data.Categories, categories, setCategories]); // Include `categories` in the dependency array for comparison
}
