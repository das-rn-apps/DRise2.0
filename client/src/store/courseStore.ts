import { create } from "zustand";
import type { ICourse, ICourseDetailsResponse } from "../utils/types";
import { getCourseBySlugApi, enrollCourseApi } from "../api/course";
import { extractErrorMessage } from "./quizStore";

interface CourseState {
    courses: ICourse[];
    courseDetails: ICourseDetailsResponse | null;

    loading: boolean;
    error: string | null;

    // list controls
    setCourses: (c: ICourse[]) => void;
    addCourse: (c: ICourse) => void;
    updateCourse: (id: string, data: Partial<ICourse>) => void;
    removeCourse: (id: string) => void;
    clearCourses: () => void;

    // getters
    getCourseById: (id: string) => ICourse | undefined;
    getCourseBySlug: (slug: string) => ICourse | undefined;

    // details fetcher
    fetchCourseBySlug: (slug: string) => Promise<void>;

    // enroll
    enrollCourse: (courseId: string) => Promise<boolean>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    courseDetails: null,
    loading: false,
    error: null,

    // ==============================
    // CRUD for courses list
    // ==============================

    setCourses: (c) => set({ courses: c }),

    addCourse: (course) =>
        set((state) => ({
            courses: [...state.courses, course],
        })),

    updateCourse: (id, data) =>
        set((state) => ({
            courses: state.courses.map((c) =>
                c._id === id ? { ...c, ...data } : c
            ),
        })),

    removeCourse: (id) =>
        set((state) => ({
            courses: state.courses.filter((c) => c._id !== id),
        })),

    clearCourses: () => set({ courses: [] }),

    // ==============================
    // GETTERS
    // ==============================

    getCourseById: (id) => {
        return get().courses.find((c) => c._id === id);
    },

    getCourseBySlug: (slug) => {
        return get().courses.find((c) => c.slug === slug);
    },

    // ==============================
    // FETCH COURSE DETAILS
    // ==============================

    fetchCourseBySlug: async (slug: string) => {
        set({ loading: true, error: null });

        try {
            const res = await getCourseBySlugApi(slug);
            set({
                courseDetails: res.data || null,
                loading: false,
            });
        } catch (err: unknown) {
            set({ error: extractErrorMessage(err), loading: false });
        }
    },

    // ==============================
    // ENROLL COURSE
    // ==============================

    enrollCourse: async (courseId: string): Promise<boolean> => {
        try {
            const res = await enrollCourseApi(courseId);
            return !!res.success;
        } catch {
            return false;
        }
    },
}));
