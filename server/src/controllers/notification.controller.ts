// src/controllers/notification.controller.ts
import { Request, Response } from "express";
import NotificationModel from "../models/Notification.js";

export const createNotification = async (req: Request, res: Response): Promise<void> => {
    const { userId, title, body, meta } = req.body;
    const note = new NotificationModel({ user: userId, title, body, meta });
    await note.save();
    res.status(201).json({ success: true, data: note });
};

export const getUserNotifications = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id;
    const notes = await NotificationModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: notes });
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const note = await NotificationModel.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json({ success: true, data: note });
};
