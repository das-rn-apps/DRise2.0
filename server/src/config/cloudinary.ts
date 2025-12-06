// src/config/cloudinary.ts
import cloudinary from "cloudinary";
import { config } from "./environment.js";

cloudinary.v2.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET,
    secure: true
});

export default cloudinary.v2;
