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
  lastQuestionId: string | null;
  setAnswer: (questionId: string, selectedAnswers: string[]) => void;
  getAnswer: (questionId: string) => string[];
  clearAnswers: () => void;
  setLastQuestionId: (id: string) => void;
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

  // Store selected answers for a given question
  setAnswer: (questionId, selectedAnswers) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: selectedAnswers },
    })),

  // Retrieve selected answers for a specific question
  getAnswer: (questionId: string) => {
    return get().answers[questionId] || [];
  },

  // Clear all answers and the recommended product
  clearAnswers: () => {
    console.log("🧹 Clearing all selected answers and recommended product");
    set({ answers: {}, recommendedProduct: null, lastQuestionId: null });
  },

  // Store the last question ID to facilitate back navigation
  setLastQuestionId: (id) => set({ lastQuestionId: id }),

  // Calculate the recommended product based on user's answers
  calculateRecommendation: async () => {
    console.log("🔄 Starting recommendation calculation...");

    const userAnswers = Object.values(get().answers).flat().map(String);
    const { data } = useSync.getState();

    // Extract products from the data
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

    // Retrieve the product-answer mapping
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
    let minRelatedAnswers = Infinity;

    const scores: Record<string, number> = {};

    // Calculate the best matching product based on scores
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

        if (
          score > highestScore ||
          (score === highestScore &&
            (productAnswers[product.name]?.length || 0) < minRelatedAnswers)
        ) {
          highestScore = score;
          minRelatedAnswers = productAnswers[product.name]?.length || 0;
          bestMatch = product;
        }
      });
    } else {
      // Select the product with the fewest associated answers as a fallback
      products.forEach((product: RecommendedProduct) => {
        if (!product.name) return;

        const relatedAnswersCount = productAnswers[product.name]?.length || 0;

        if (relatedAnswersCount < minRelatedAnswers) {
          minRelatedAnswers = relatedAnswersCount;
          bestMatch = product;
        }
      });
    }

    set({ recommendedProduct: bestMatch });
    console.log("🏆 Recommended Product:", bestMatch);
    console.log("📊 Scores for all products:", scores);
  },
}));
