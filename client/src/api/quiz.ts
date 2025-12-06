// src/api/quiz.ts
import client from "./axiosClient";
import type { IQuiz, ISubmitQuizPayload, IQuizResult } from "../utils/types";

// Fetch single quiz
export const getQuiz = async (quizId: string): Promise<IQuiz> => {
    const res = await client.get(`/quizzes/${quizId}`);
    return res.data as IQuiz;
};

// Submit quiz
export const submitQuiz = async (
    quizId: string,
    payload: ISubmitQuizPayload
): Promise<IQuizResult> => {
    const res = await client.post(`/quizzes/${quizId}/submit`, payload);
    return res.data as IQuizResult;
};

export const getQuizzes = async () => {
    const res = await client.get("/quizzes");
    return res.data;
};
