// src/models/Quiz.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IOption {
    text: string;
    isCorrect?: boolean;
}

export interface IQuestion {
    text: string;
    options: IOption[];
    marks?: number;
}

export interface IQuiz extends Document {
    title: string;
    course: mongoose.Types.ObjectId;
    questions: IQuestion[];
    totalMarks: number;
    passingMarks?: number;
    timeLimitMinutes?: number;
}

const OptionSchema = new Schema<IOption>({ text: String, isCorrect: Boolean }, { _id: false });
const QuestionSchema = new Schema<IQuestion>({ text: String, options: [OptionSchema], marks: Number }, { _id: false });

const QuizSchema = new Schema<IQuiz>(
    {
        title: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        questions: [QuestionSchema],
        totalMarks: { type: Number, default: 0 },
        passingMarks: { type: Number, default: 0 },
        timeLimitMinutes: { type: Number }
    },
    { timestamps: true }
);

const QuizModel = mongoose.model<IQuiz>("Quiz", QuizSchema);
export default QuizModel;
