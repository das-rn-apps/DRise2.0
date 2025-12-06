// src/controllers/live.controller.ts
import { Request, Response } from "express";
import LiveClassModel from "../models/LiveClass.js";
import { createZoomMeeting } from "../services/zoom.service.js";

export const scheduleLiveClass = async (req: Request, res: Response): Promise<void> => {
    const { title, course, startAt, endAt, description } = req.body;
    const instructor = (req as any).user?.id;
    const meeting = await createZoomMeeting({ topic: title, startAt, durationMinutes: Math.ceil((new Date(endAt).getTime() - new Date(startAt).getTime()) / 60000) });
    const live = new LiveClassModel({
        title,
        course,
        instructor,
        startAt,
        endAt,
        description,
        zoomMeetingId: meeting.id,
        joinUrl: meeting.joinUrl
    });
    await live.save();
    res.status(201).json({ success: true, data: live });
};

export const getUpcoming = async (req: Request, res: Response): Promise<void> => {
    const classes = await LiveClassModel.find({ startAt: { $gte: new Date() } }).populate("instructor", "name");
    res.json({ success: true, data: classes });
};
