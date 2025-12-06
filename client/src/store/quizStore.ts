// src/store/useQuizStore.ts
import { create } from "zustand";
import { getQuiz, getQuizzes, submitQuiz } from "../api/quiz";
import type { IQuiz, ISubmitQuizPayload, IQuizResult } from "../utils/types";
import type { AxiosError } from "axios";

export const extractErrorMessage = (err: unknown): string => {
    if (typeof err === "string") return err;

    if (err instanceof Error) return err.message;

    // Axios error support
    if (typeof err === "object" && err && "message" in err) {
        return String((err as AxiosError).message);
    }

    return "Something went wrong";
};

interface QuizState {
    quizzes: IQuiz[];
    currentQuiz: IQuiz | null;

    loading: boolean;
    error: string | null;

    fetchQuizzes: () => Promise<void>;
    fetchQuizById: (quizId: string) => Promise<void>;
    setCurrentQuiz: (q: IQuiz | null) => void;
    submitQuizAnswers: (quizId: string, payload: ISubmitQuizPayload) => Promise<IQuizResult | null>;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
    quizzes: [],
    currentQuiz: null,

    loading: false,
    error: null,

    // Fetch ALL quizzes once
    fetchQuizzes: async () => {
        const { quizzes } = get();
        if (quizzes.length > 0) return;

        set({ loading: true, error: null });

        try {
            const res = await getQuizzes();
            set({ quizzes: res.data ?? [], loading: false });
        } catch (err: unknown) {
            set({ error: extractErrorMessage(err), loading: false });
        }
    },

    // Fetch 1 quiz by ID
    fetchQuizById: async (quizId: string) => {
        const { currentQuiz } = get();
        if (currentQuiz?._id === quizId) return;

        set({ loading: true, error: null });

        try {
            const res = await getQuiz(quizId);
            set({ currentQuiz: res ?? null, loading: false });
        } catch (err: unknown) {
            set({ error: extractErrorMessage(err), loading: false });
        }
    },

    setCurrentQuiz: (q) => set({ currentQuiz: q }),

    submitQuizAnswers: async (quizId, payload) => {
        set({ loading: true, error: null });

        try {
            const res = await submitQuiz(quizId, payload);
            set({ loading: false });
            return res;
        } catch (err: unknown) {
            set({ error: extractErrorMessage(err), loading: false });
            return null;
        }
    },

    resetQuiz: () => set({ currentQuiz: null })
}));
