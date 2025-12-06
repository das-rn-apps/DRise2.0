import type { ICourse } from "../utils/types";
import client from "./axiosClient";

export const getCourses = async () => {
    const res = await client.get("/courses");
    return res.data;
};

export const getCourseBySlugApi = async (slug: string) => {
    const res = await client.get(`/courses/slug/${slug}`);
    return res.data;
};

export const createCourse = async (payload: ICourse) => {
    const res = await client.post("/courses", payload);
    return res.data;
};

export const getLesson = async (lessonId: string) => {
    const res = await client.get(`/lessons/${lessonId}`);
    return res.data;
};

// ENROLL a course
export const enrollCourseApi = async (courseId: string) => {
    const res = await client.put(`/courses/${courseId}/enroll`);
    return res.data;
};
