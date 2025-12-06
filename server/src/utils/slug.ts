// src/utils/slug.ts
import CourseModel from "../models/Course.js";

export const slugify = (text: string) =>
    text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

export const generateSlug = async (title: string) => {
    let base = slugify(title);
    let slug = base;
    let i = 1;
    while (await CourseModel.findOne({ slug })) {
        slug = `${base}-${i++}`;
    }
    return slug;
};
