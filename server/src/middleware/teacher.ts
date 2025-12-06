// src/middleware/teacher.ts
import { Request, Response, NextFunction } from "express";

export const isTeacherOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;
    if (role !== "teacher" && role !== "admin") {
        return res.status(403).json({ success: false, message: "Teacher or Admin only" });
    }
    next();
};
