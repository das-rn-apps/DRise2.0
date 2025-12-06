// src/utils/jwt.ts
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { config } from "../config/environment.js";

const JWT_SECRET = config.JWT_SECRET as string;

export const signJwt = (
    payload: object | JwtPayload,
    expiresIn: string | number = config.JWT_EXPIRES_IN as any
): string => {

    const options: SignOptions = {
        expiresIn: expiresIn as any
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyJwt = <T = JwtPayload>(token: string): T => {
    return jwt.verify(token, JWT_SECRET) as T;
};
