import React, { useEffect } from "react";
import { getCourses } from "../api/course";
import CourseCard from "../components/CourseCard";
import { Star } from "lucide-react";
import { useCourseStore } from "../store/courseStore";

const Home: React.FC = () => {
    const { courses, setCourses } = useCourseStore();

    useEffect(() => {
        if (courses.length > 0) return; // fetch only if not already stored

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
        <div className="space-y-12">
            {/* ================== HERO SECTION ================== */}
            <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-12 text-center shadow-lg text-white">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Learn from the Best
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100">
                        High-quality video lessons, quizzes, live classes and certificates.
                    </p>
                    <div className="flex justify-center mt-4 gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} size={20} className="text-yellow-400 animate-pulse" />
                        ))}
                    </div>
                </div>
            </header>

            {/* ================== COURSES SECTION ================== */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
                    <Star className="text-indigo-600" /> Recommended Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {courses.map((c) => (
                        <CourseCard key={c._id} course={c} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
