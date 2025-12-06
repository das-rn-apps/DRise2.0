// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel, { IUser } from "../models/User.js";
import { config } from "../config/environment.js";

export interface AuthRequest extends Request {
    user?: Partial<IUser>;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Auth Header:", authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, config.JWT_SECRET) as { id: string; iat: number; exp: number };
        const user = await UserModel.findById(payload.id).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = user.toObject();
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};
