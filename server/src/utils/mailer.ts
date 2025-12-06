// src/utils/mailer.ts
import nodemailer from "nodemailer";
import { config } from "../config/environment.js";

export const sendMail = async (to: string, subject: string, html: string) => {
    if (!config.SMTP.HOST) {
        // skip sending if not configured
        console.warn("SMTP not configured - skipping sendMail");
        return;
    }
    const transporter = nodemailer.createTransport({
        host: config.SMTP.HOST,
        port: config.SMTP.PORT,
        secure: config.SMTP.PORT === 465,
        auth: {
            user: config.SMTP.USER,
            pass: config.SMTP.PASS
        }
    });

    await transporter.sendMail({
        from: config.SMTP.USER,
        to,
        subject,
        html
    });
};
