// src/middleware/admin.ts
import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;
    if (role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin only" });
    }
    next();
};
