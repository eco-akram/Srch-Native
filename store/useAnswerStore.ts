import { create } from "zustand";
import { useSync } from "@/hooks/useSync";

// Define the structure of the recommended product
type RecommendedProduct = {
  productId: number;
  name: string;
  description: string;
};

// Define the store's state and actions
type AnswerStore = {
  answers: Record<string, string[]>;
  recommendedProduct: RecommendedProduct | null;
  setAnswer: (questionId: string, selectedAnswers: string[]) => void;
  clearAnswers: () => void;
  calculateRecommendation: () => Promise<void>;
};

// Utility function for binary search with attempt counter
const binarySearch = (
  sortedArray: string[],
  target: string,
  attemptCounter: { count: number }
): boolean => {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    attemptCounter.count++; // Increment attempt counter
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

  setAnswer: (questionId, selectedAnswers) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: selectedAnswers },
    })),

  clearAnswers: () => {
    console.log("🧹 Clearing all answers and recommended product");
    set({ answers: {}, recommendedProduct: null });
  },

  calculateRecommendation: async () => {
    const userAnswers = Object.values(get().answers).flat().map(String);
    const { data } = useSync.getState();

    const products: RecommendedProduct[] = Array.isArray(data["Products"])
      ? data["Products"].map((product: any): RecommendedProduct => ({
          productId: product.id ?? 0,
          name: product.productName ?? "Unknown Product",
          description: product.productDescription ?? "No description available",
        }))
      : [];

    if (products.length === 0) {
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
    let highestScore = 0;
    const scores: Record<string, number> = {};
    set({ answers: {} });

    if (userAnswers.length > 0) {
      products.forEach((product: RecommendedProduct) => {
        if (!product.name) return;

        const matchingAnswers = (productAnswers[product.name] || []).sort();
        const attemptCounter = { count: 0 };

        const matchedAnswers = userAnswers.filter((answer) =>
          binarySearch(matchingAnswers, answer, attemptCounter)
        );

        const score = matchedAnswers.length;
        scores[product.name] = score;

        if (score > highestScore) {
          highestScore = score;
          bestMatch = product;
        }
      });
    }

    set({ recommendedProduct: bestMatch });
    console.log("🏆 Recommended Product:", bestMatch);
    console.log("📊 Scores for all products:", scores);
  },
}));
