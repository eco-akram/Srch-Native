import { create } from "zustand";

interface QuestionStore {
  questions: any[];
  setQuestions: (questions: any[]) => void;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
}));
