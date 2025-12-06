// src/controllers/course.controller.ts
import { Request, Response } from "express";
import CourseModel from "../models/Course.js";
import ChapterModel from "../models/Chapter.js";
import { generateSlug } from "../utils/slug.js";

export const createCourse = async (req: Request, res: Response): Promise<void> => {
    const { title, description, price, published } = req.body;
    const instructor = (req as any).user?._id;
    if (!instructor) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    const slug = await generateSlug(title);
    const course = new CourseModel({ title, description, price, published, slug, instructor });
    await course.save();
    res.status(201).json({ success: true, data: course });
};

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    const courses = await CourseModel.find().populate("instructor", "name email");
    res.json({ success: true, data: courses });
};

export const getCourseBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const course = await CourseModel.findOne({ slug }).populate("instructor", "name email");
    if (!course) {
        res.status(404).json({ success: false, message: "Course not found" });
        return;
    }
    const chapters = await ChapterModel.find({ course: course._id }).sort({ order: 1 });
    res.json({ success: true, data: { course, chapters } });
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    const course = await CourseModel.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, data: course });
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await CourseModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
};
