// src/models/Chapter.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IChapter extends Document {
    title: string;
    course: mongoose.Types.ObjectId;
    order: number;
    description?: string;
}

const ChapterSchema = new Schema<IChapter>(
    {
        title: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        order: { type: Number, default: 0 },
        description: { type: String }
    },
    { timestamps: true }
);

const ChapterModel = mongoose.model<IChapter>("Chapter", ChapterSchema);
export default ChapterModel;
