import cloudinary from "../config/cloudinary.js";

export const uploadVideo = async (videoBase64: string, opts: { folder?: string } = {}) => {
    if (!videoBase64) return undefined;
    try {
        const uploadResult: any = await cloudinary.uploader.upload_large(videoBase64, {
            resource_type: "video",
            folder: opts.folder || "videos",
            chunk_size: 6000000
        });
        return uploadResult.secure_url || uploadResult.url;
    } catch (err) {
        console.warn("video upload failed", err);
        return undefined;
    }
};
