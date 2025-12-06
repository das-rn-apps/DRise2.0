import { create } from "zustand";
import type { IQuiz } from "../utils/types";

interface QuizState {
    currentQuiz: IQuiz | null;
    setCurrentQuiz: (q: IQuiz | null) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentQuiz: null,
    setCurrentQuiz: (q) => set({ currentQuiz: q })
}));
