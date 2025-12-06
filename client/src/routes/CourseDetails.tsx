import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonList from "../components/LessonList";
import ReviewList from "../components/ReviewList";

// Zustand Stores
import { useAuthStore } from "../store/authStore";
import { useCourseStore } from "../store/courseStore";
import { useUIStore } from "../store/uiStore";

const CourseDetails: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const {
        courseDetails,
        loading,
        error,
        fetchCourseBySlug,
        enrollCourse
    } = useCourseStore();

    const token = useAuthStore((s) => s.token);
    const showToast = useUIStore((s) => s.showToast);

    // Fetch course details
    useEffect(() => {
        if (!slug) return;
        fetchCourseBySlug(slug);
    }, [slug, fetchCourseBySlug]);

    const handleEnroll = async () => {
        if (!token) {
            showToast("Please login to enroll!", "error");
            return navigate("/login");
        }

        if (!courseDetails) return;

        const res = await enrollCourse(courseDetails.course._id);

        if (res) {
            showToast("Successfully enrolled!", "success");
            navigate(`/course/${courseDetails.course.slug}/learn`);
        } else {
            showToast("Failed to enroll.", "error");
        }
    };

    if (loading || !courseDetails)
        return <div className="text-center py-20">Loading...</div>;

    if (error)
        return <div className="text-center text-red-500 py-20">{error}</div>;

    const { course, chapters } = courseDetails;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* ================== COURSE INFO ================== */}
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-gray-600 mt-3">{course.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Instructor */}
                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <div className="font-semibold text-gray-900">
                            Instructor: {course.instructor?.name}
                        </div>
                    </div>

                    {/* Price + Enroll */}
                    <div className="flex flex-col items-start p-4 bg-pink-50 rounded-xl border border-pink-100">
                        <div className="text-gray-500 uppercase text-sm font-medium">
                            Price
                        </div>
                        <div className="font-semibold text-gray-900 text-lg">
                            ₹{course.price}
                        </div>

                        <button
                            onClick={handleEnroll}
                            className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all"
                        >
                            Enroll Now
                        </button>
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
