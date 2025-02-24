import { create } from "zustand";

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

export const useCategorySelectionStore = create<CategorySelectionStore>(
  (set) => ({
    selectedCategories: new Set<number>(),
    categories: [],

    setCategories: (categories) =>
      set({
        categories,
        selectedCategories: new Set(), // ✅ Ensure fresh state
      }),

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
  }),
);
