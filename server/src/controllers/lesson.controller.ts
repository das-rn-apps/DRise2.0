// src/controllers/lesson.controller.ts
import { Request, Response } from "express";
import LessonModel from "../models/Lesson.js";
import { uploadVideo } from "../utils/videoUploader.js";

export const createLesson = async (req: Request, res: Response): Promise<void> => {
    const { title, chapter, order, content } = req.body;
    let videoUrl;
    if (req.body.videoBase64) {
        videoUrl = await uploadVideo(req.body.videoBase64, { folder: "lessons" });
    }
    const lesson = new LessonModel({ title, chapter, order, content, videoUrl });
    await lesson.save();
    res.status(201).json({ success: true, data: lesson });
};

export const updateLesson = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    if (updates.videoBase64) {
        updates.videoUrl = await uploadVideo(updates.videoBase64, { folder: "lessons" });
        delete updates.videoBase64;
    }
    const lesson = await LessonModel.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, data: lesson });
};

export const deleteLesson = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await LessonModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
};
