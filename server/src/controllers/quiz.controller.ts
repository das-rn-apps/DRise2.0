// src/controllers/quiz.controller.ts
import { Request, Response } from "express";
import QuizModel from "../models/Quiz.js";
import QuizResultModel from "../models/QuizResult.js";

export const createQuiz = async (req: Request, res: Response): Promise<void> => {
    const { title, course, questions, timeLimitMinutes } = req.body;
    const totalMarks = (questions || []).reduce((s: number, q: any) => s + (q.marks || 1), 0);
    const quiz = new QuizModel({ title, course, questions, totalMarks, timeLimitMinutes });
    await quiz.save();
    res.status(201).json({ success: true, data: quiz });
};

export const getQuiz = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const quiz = await QuizModel.findById(id);
    if (!quiz) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, data: quiz });
};

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // quiz id
    const userId = (req as any).user?.id;
    const { answers } = req.body; // answers: [{ questionIndex, selectedOptionIndexes }]
    const quiz = await QuizModel.findById(id);
    if (!quiz) { res.status(404).json({ success: false, message: "Quiz not found" }); return; }

    let score = 0;
    const computedAnswers: any[] = [];

    for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        const submitted = (answers || []).find((a: any) => a.questionIndex === i);
        const selectedIdx = submitted?.selectedOptionIndexes || [];
        const correctIndexes = q.options.map((o: any, idx: number) => (o.isCorrect ? idx : -1)).filter((n: number) => n >= 0);

        // simple grading: full marks if all correct selected and no extras
        const isCorrect = JSON.stringify(correctIndexes.sort()) === JSON.stringify((selectedIdx || []).sort());
        const marksObtained = isCorrect ? (q.marks || 1) : 0;
        score += marksObtained;
        computedAnswers.push({ questionIndex: i, selectedOptionIndexes: selectedIdx, marksObtained });
    }

    const passed = score >= (quiz.passingMarks || 0);
    const result = new QuizResultModel({ user: userId, quiz: quiz._id, score, answers: computedAnswers, passed });
    await result.save();
    res.json({ success: true, data: result });
};
