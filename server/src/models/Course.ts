// src/models/Course.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
    title: string;
    description?: string;
    instructor: mongoose.Types.ObjectId;
    subscribers: mongoose.Types.ObjectId[];
    price?: number;
    published: boolean;
    slug: string;
}

const CourseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        description: { type: String },
        instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
        subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        published: { type: Boolean, default: false },
        slug: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);
export default CourseModel;
