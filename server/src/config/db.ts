// src/config/db.ts
import mongoose from "mongoose";
import { logger } from "./logger.js";

export const connectDB = async (mongoUri: string): Promise<void> => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoUri);
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection error", error as Error);
        throw error;
    }
};
