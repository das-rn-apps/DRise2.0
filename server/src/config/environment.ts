// src/config/environment.ts
import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/coachingonline",
    JWT_SECRET: process.env.JWT_SECRET || "change_this_jwt_secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
        API_KEY: process.env.CLOUDINARY_API_KEY || "",
        API_SECRET: process.env.CLOUDINARY_API_SECRET || ""
    },
    SMTP: {
        HOST: process.env.SMTP_HOST,
        PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASS
    }
};
