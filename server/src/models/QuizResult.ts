// src/models/QuizResult.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IQuizResult extends Document {
    user: mongoose.Types.ObjectId;
    quiz: mongoose.Types.ObjectId;
    score: number;
    answers: { questionIndex: number; selectedOptionIndexes: number[]; marksObtained?: number }[];
    passed: boolean;
    takenAt: Date;
}

const AnswerSchema = new Schema(
    { questionIndex: Number, selectedOptionIndexes: [Number], marksObtained: Number },
    { _id: false }
);

const QuizResultSchema = new Schema<IQuizResult>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
        score: { type: Number, default: 0 },
        answers: [AnswerSchema],
        passed: { type: Boolean, default: false },
        takenAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

QuizResultSchema.index({ user: 1, quiz: 1 });

const QuizResultModel = mongoose.model<IQuizResult>("QuizResult", QuizResultSchema);
export default QuizResultModel;
