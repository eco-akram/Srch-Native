// store/useAnswerStore.ts
import { create } from 'zustand';

type AnswerStore = {
    answers: Record<string, string[]>; // { questionId: selectedAnswers[] }
    setAnswer: (questionId: string, selectedAnswers: string[]) => void;
    clearAnswers: () => void; // Add this function
  };
  
  export const useAnswerStore = create<AnswerStore>((set) => ({
    answers: {},
    setAnswer: (questionId, selectedAnswers) =>
      set((state) => ({
        answers: { ...state.answers, [questionId]: selectedAnswers },
      })),
    clearAnswers: () => set({ answers: {} }), // Add this function
  }));