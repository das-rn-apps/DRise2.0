// src/controllers/user.controller.ts
import { Request, Response } from "express";
import UserModel from "../models/User.js";
import EnrollmentModel from "../models/Enrollment.js";

interface AuthenticatedRequest extends Request {
    user?: { id?: string; _id?: string };
}

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    const user = await UserModel.findById(userId).select("-password");
    res.json({ success: true, data: user });
};

export const getAllUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id || req.user?._id;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const users = await UserModel.find().select("-password");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;
    const updates = req.body;
    const user = await UserModel.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    res.json({ success: true, data: user });
};

export const getMyEnrollments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;
    const enrolls = await EnrollmentModel.find({ user: userId }).populate("course");
    res.json({ success: true, data: enrolls });
};
