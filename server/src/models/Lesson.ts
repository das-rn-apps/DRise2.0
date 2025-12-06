// src/models/Lesson.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
    title: string;
    chapter: mongoose.Types.ObjectId;
    videoUrl?: string;
    duration?: number; // seconds
    order?: number;
    content?: string;
    resources?: { title: string; url: string }[];
}

const LessonSchema = new Schema<ILesson>(
    {
        title: { type: String, required: true },
        chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
        videoUrl: { type: String },
        duration: { type: Number },
        order: { type: Number, default: 0 },
        content: { type: String },
        resources: [{ title: String, url: String }]
    },
    { timestamps: true }
);

const LessonModel = mongoose.model<ILesson>("Lesson", LessonSchema);
export default LessonModel;
