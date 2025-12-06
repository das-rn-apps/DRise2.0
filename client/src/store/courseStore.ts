import { create } from "zustand";
import type { ICourse } from "../utils/types";

interface CourseState {
    courses: ICourse[];
    setCourses: (c: ICourse[]) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    setCourses: (c) => set({ courses: c })
}));
