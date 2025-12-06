import React, { useEffect } from "react";
import { getCourses } from "../api/course";
import CourseCard from "../components/CourseCard";
import { BookOpen } from "lucide-react";
import { useCourseStore } from "../store/courseStore";

const Courses: React.FC = () => {
    const { courses, setCourses } = useCourseStore();

    useEffect(() => {
        if (courses.length > 0) return;

        (async () => {
            try {
                const res = await getCourses();
                setCourses(res.data || []);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [courses, setCourses]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
                <BookOpen className="text-indigo-600" /> All Courses
            </h2>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.map((c) => (
                    <CourseCard key={c._id} course={c} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
