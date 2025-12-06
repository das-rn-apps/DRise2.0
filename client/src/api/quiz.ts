import type { IQuizResult } from "../utils/types";
import client from "./axiosClient";

export const getQuiz = async (quizId: string) => {
    const res = await client.get(`/quizzes/${quizId}`);
    return res.data;
};

export const submitQuiz = async (quizId: string, payload: IQuizResult) => {
    const res = await client.post(`/quizzes/${quizId}/submit`, payload);
    return res.data;
};
