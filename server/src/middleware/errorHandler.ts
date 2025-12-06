// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    logger.error("Unhandled error", err);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        success: false,
        message,
        details: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
