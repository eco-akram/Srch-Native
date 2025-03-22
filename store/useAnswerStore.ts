import { create } from "zustand";
import { useSync } from "@/hooks/useSync";
import { useCategorySelectionStore } from '@/store/useCategorySelectionStore';

// Define the structure of the recommended product
type RecommendedProduct = {
  productId: number;
  name: string;
  description: string;
};

type AnswerStore = {
  answers: Record<string, string[]>;
  recommendedProduct: RecommendedProduct | null;
  lastQuestionId: string | null;
  setAnswer: (questionId: string, selectedAnswers: string[]) => void;
  getAnswer: (questionId: string) => string[];
  clearAnswers: () => void;
  setLastQuestionId: (id: string) => void;
  calculateRecommendation: () => Promise<void>;
};

const binarySearch = (
  sortedArray: string[],
  target: string,
  attemptCounter: { count: number }
): boolean => {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    attemptCounter.count++;
    const mid = Math.floor((left + right) / 2);
    if (sortedArray[mid] === target) {
      return true;
    } else if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
};

export const useAnswerStore = create<AnswerStore>((set, get) => ({
  answers: {},
  recommendedProduct: null,
  lastQuestionId: null,

  setAnswer: (questionId, selectedAnswers) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: selectedAnswers },
    })),

  getAnswer: (questionId: string) => {
    return get().answers[questionId] || [];
  },

  clearAnswers: () => {
    console.log("🧹 Clearing all selected answers and recommended product");
    set({ answers: {}, recommendedProduct: null, lastQuestionId: null });
  },

  setLastQuestionId: (id) => set({ lastQuestionId: id }),

  calculateRecommendation: async () => {
    console.log("🔄 Starting recommendation calculation...");

    const { data } = useSync.getState();
    const selectedCategories = useCategorySelectionStore.getState().selectedCategories;
    const questions = Array.isArray(data["Questions"]) ? data["Questions"] : [];

    const validQuestionIds = questions
      .filter((q) => selectedCategories.has(q.categoryId))
      .map((q) => q.id.toString());

    console.log("✅ Selected Category IDs:", Array.from(selectedCategories));
    console.log("✅ Valid Question IDs:", validQuestionIds);

    const allAnswers = get().answers;

    const userAnswers = Object.entries(allAnswers)
      .filter(([questionId]) => validQuestionIds.includes(questionId))
      .flatMap(([, selectedAnswers]) => selectedAnswers.map(String));

    console.log("✅ Filtered User Answers:", userAnswers);

    const products: RecommendedProduct[] = Array.isArray(data["Products"])
      ? data["Products"].map((product: any): RecommendedProduct => ({
          productId: product.id ?? 0,
          name:
            product.productName ||
            product.ProductName ||
            product.name ||
            "Unknown Product",
          description:
            product.productDescription ||
            product.description ||
            "No description available",
        }))
      : [];

    if (products.length === 0) {
      console.error("❌ No products available in the data source.");
      set({ recommendedProduct: null });
      return;
    }

    const rawProductAnswers: any[] = Array.isArray(data["Product_Answers"])
      ? data["Product_Answers"]
      : [];

    const productIdToNameMap: Record<number, string> = products.reduce(
      (acc, product) => {
        acc[product.productId] = product.name;
        return acc;
      },
      {} as Record<number, string>
    );

    const productAnswers: Record<string, string[]> = rawProductAnswers.reduce(
      (acc, entry) => {
        const { productId, answerId } = entry;
        if (productId && answerId) {
          const productName = productIdToNameMap[productId];
          if (productName) {
            if (!acc[productName]) acc[productName] = [];
            acc[productName].push(answerId.toString());
          }
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    let bestMatch: RecommendedProduct | null = null;
    let minRelatedAnswers = Infinity;
    let bestScore = 0;

    const eligibleProducts = products.filter((product) => {
      const pAnswers = productAnswers[product.name] || [];
      const hasAll = userAnswers.every((ans) => pAnswers.includes(ans));
      return hasAll;
    });

    console.log("✅ Eligible Products (fully matching user needs):");
    eligibleProducts.forEach((product) => {
      const pAnswers = productAnswers[product.name] || [];
      console.log(`  - ${product.name} (answers: ${pAnswers.length})`);
    });

    const productScores: Record<string, number> = {};

    eligibleProducts.forEach((product) => {
      const pAnswers = productAnswers[product.name] || [];
      const sortedAnswers = [...pAnswers].sort();
      const attemptCounter = { count: 0 };
      const matched = userAnswers.filter(ans => binarySearch(sortedAnswers, ans, attemptCounter));
      const score = matched.length;

      productScores[product.name] = score;

      if (
        score > bestScore ||
        (score === bestScore && pAnswers.length < minRelatedAnswers)
      ) {
        bestScore = score;
        minRelatedAnswers = pAnswers.length;
        bestMatch = product;
      }
    });

    console.log("📊 Product Scores:", productScores);
    set({ recommendedProduct: bestMatch });
    console.log("🏆 Recommended Product:", bestMatch);
  },
}));
