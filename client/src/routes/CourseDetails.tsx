import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseBySlug } from "../api/course";
import LessonList from "../components/LessonList";
import ReviewList from "../components/ReviewList";
import { useAuthStore } from "../store/authStore";
import { User, Tag } from "lucide-react";

const CourseDetails: React.FC = () => {
    const { slug } = useParams();
    const [data, setData] = useState<any>(null);
    const token = useAuthStore((s) => s.token);

    useEffect(() => {
        (async () => {
            if (!slug) return;
            const res = await getCourseBySlug(slug);
            setData(res.data || null);
        })();
    }, [slug]);

    if (!data) return <div className="text-center py-20">Loading...</div>;

    const { course, chapters } = data;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* ================== COURSE INFO CARD ================== */}
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-600 mt-3">{course.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Instructor */}
                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <User className="text-indigo-600" size={24} />
                        <div>
                            <div className="text-sm text-gray-500 uppercase font-medium">Instructor</div>
                            <div className="font-semibold text-gray-900">{course.instructor?.name}</div>
                        </div>
                    </div>

                    {/* Price & Enroll */}
                    <div className="flex flex-col items-start justify-between p-4 bg-pink-50 rounded-xl border border-pink-100">
                        <div className="flex items-center gap-2">
                            <Tag className="text-pink-500" size={20} />
                            <div className="text-sm text-gray-500 uppercase font-medium">Price</div>
                        </div>
                        <div className="font-semibold text-gray-900 text-lg mt-1">₹{course.price || 0}</div>

                        {!token ? (
                            <a
                                href="/login"
                                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Login to Enroll
                            </a>
                        ) : (
                            <button className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all duration-200">
                                Enroll Now
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ================== LESSONS ================== */}
            <LessonList chapters={chapters} />

            {/* ================== REVIEWS ================== */}
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Reviews</h3>
                <ReviewList courseId={course._id} />
            </div>
        </div>
    );
};

export default CourseDetails;
