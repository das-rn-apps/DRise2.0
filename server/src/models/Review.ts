// src/models/Review.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
}

const ReviewSchema = new Schema<IReview>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String }
    },
    { timestamps: true }
);

ReviewSchema.index({ user: 1, course: 1 }, { unique: true });

const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);
export default ReviewModel;
