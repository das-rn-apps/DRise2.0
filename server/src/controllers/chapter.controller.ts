// src/controllers/chapter.controller.ts
import { Request, Response } from "express";
import ChapterModel from "../models/Chapter.js";

export const getChapter = async (req: Request, res: Response): Promise<void> => {
    const chapter = await ChapterModel.find().populate("course", "title slug");
    res.json({ success: true, data: chapter });
};
export const createChapter = async (req: Request, res: Response): Promise<void> => {
    const { title, course, order, description } = req.body;
    const chapter = new ChapterModel({ title, course, order, description });
    await chapter.save();
    res.status(201).json({ success: true, data: chapter });
};

export const updateChapter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;
    const chapter = await ChapterModel.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, data: chapter });
};

export const deleteChapter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await ChapterModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted" });
};
