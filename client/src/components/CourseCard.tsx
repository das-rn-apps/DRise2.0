import React from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowRightCircle } from "lucide-react";
import type { ICourse } from "../utils/types";

const CourseCard: React.FC<{ course: ICourse }> = ({ course }) => {
    return (
        <div
            className="
                bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 p-4 
                border border-indigo-100 hover:border-indigo-300 
                hover:-translate-y-1 overflow-hidden
            "
        >
            {/* Thumbnail */}
            <div className="h-40 rounded-xl overflow-hidden relative group">
                <img
                    src={
                        course.thumbnail ||
                        `https://picsum.photos/seed/${course._id}/200/200`
                    }
                    alt={course.title}
                    className="
                        w-full h-full object-cover 
                        transition-transform duration-300 
                        group-hover:scale-105
                    "
                />

                {/* Vibrant badge */}
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    New
                </div>
            </div>

            {/* Title + Description */}
            <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                    {course.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {course.description?.slice(0, 100)}...
                </p>
            </div>

            {/* Price + Button */}
            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-indigo-600 font-bold text-lg">
                    <Tag size={18} />
                    ₹{course.price || 0}
                </div>

                <Link
                    to={`/courses/${course.slug}`} // use slug instead of _id
                    className="
                        flex items-center gap-1 px-4 py-1.5 text-sm rounded-full font-medium 
                        bg-pink-500 text-white shadow-md hover:bg-pink-600 
                        transition-all duration-200
                    "
                >
                    View
                    <ArrowRightCircle size={18} />
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
