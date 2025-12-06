// src/controllers/review.controller.ts
import { Request, Response } from "express";
import ReviewModel from "../models/Review.js";
import CourseModel from "../models/Course.js";

export const addReview = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?._id;
    const { courseId, rating, comment } = req.body;
    if (!userId) { res.status(401).json({ success: false, message: "Unauthorized" }); return; }

    const exists = await ReviewModel.findOne({ user: userId, course: courseId });
    if (exists) { res.status(409).json({ success: false, message: "Already reviewed" }); return; }

    const review = new ReviewModel({ user: userId, course: courseId, rating, comment });
    await review.save();

    // optional: update course average rating
    const agg = await ReviewModel.aggregate([
        { $match: { course: review.course } },
        { $group: { _id: "$course", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    if (agg.length) {
        await CourseModel.findByIdAndUpdate(courseId, { $set: { averageRating: agg[0].avg, reviewsCount: agg[0].count } });
    }

    res.status(201).json({ success: true, data: review });
};

export const getReviewsForCourse = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const reviews = await ReviewModel.find({ course: courseId }).populate("user", "name");
    res.json({ success: true, data: reviews });
};
