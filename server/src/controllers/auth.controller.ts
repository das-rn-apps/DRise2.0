// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import UserModel from "../models/User.js";
import { signJwt } from "../utils/jwt.js";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;
    // basic validation
    if (!name || !email || !password) {
        res.status(400).json({ success: false, message: "Name, email and password are required" });
        return;
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
        res.status(409).json({ success: false, message: "User already exists" });
        return;
    }

    const user = new UserModel({ name, email, password, role });
    await user.save();

    const token = signJwt({ id: user._id });
    res.status(201).json({
        success: true,
        data: {
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        }
    });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: "Email and password required" });
        return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
    }

    const token = signJwt({ id: user._id });
    res.json({
        success: true,
        data: {
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        }
    });
};
