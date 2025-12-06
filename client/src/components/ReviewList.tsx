import React, { useEffect, useState } from "react";
import { getReviews, addReview } from "../api/review";
import { useAuthStore } from "../store/authStore";
import type { IReview } from "../utils/types";
import {
    Star,
    UserCircle,
    MessageSquarePlus,
    SendHorizonal,
} from "lucide-react";

const ReviewList: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const token = useAuthStore((s) => s.token);
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getReviews(courseId);
            setReviews(res.data || []);
        })();
    }, [courseId]);

    const submit = async () => {
        if (!token) {
            alert("Login to review");
            return;
        }
        await addReview({ courseId, rating, comment });
        const res = await getReviews(courseId);
        setReviews(res.data || []);
        setComment("");
    };

    return (
        <div className="space-y-6">
            {/* ================== REVIEWS LIST ================== */}
            {reviews.map((r) => (
                <div
                    key={r._id}
                    className="
                        p-5 bg-white rounded-2xl border border-indigo-100 
                        shadow-sm hover:shadow-md transition-all duration-300
                    "
                >
                    {/* User + Rating */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserCircle className="text-indigo-600" size={22} />
                            <div className="font-semibold text-gray-800">
                                {r.user?.name || "User"}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star size={18} fill="currentColor" />
                            <span className="font-medium text-gray-700">
                                {r.rating}
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="text-sm text-gray-600 mt-3 leading-relaxed">
                        {r.comment}
                    </div>
                </div>
            ))}

            {/* ================== ADD REVIEW BOX ================== */}
            <div
                className="
                    p-6 bg-white rounded-2xl border border-pink-200 
                    shadow-lg hover:shadow-xl transition-all duration-300
                "
            >
                <div className="flex items-center gap-2 mb-3">
                    <MessageSquarePlus className="text-pink-500" />
                    <h4 className="font-semibold text-lg text-gray-800">
                        Leave a Review
                    </h4>
                </div>

                {/* Rating */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-500 font-medium">
                            Rating
                        </label>

                        <div className="mt-1 flex gap-1">
                            {[1, 2, 3, 4, 5].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setRating(v)}
                                    className={`
                                        p-1.5 rounded-full border transition 
                                        ${rating >= v
                                            ? "bg-yellow-400 border-yellow-500 text-white"
                                            : "bg-gray-100 border-gray-300 text-gray-400"
                                        }
                                    `}
                                >
                                    <Star
                                        size={18}
                                        fill={rating >= v ? "currentColor" : "none"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="
                            w-full border border-gray-200 rounded-xl p-3 
                            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                            transition-all duration-200 text-sm
                        "
                        placeholder="Write your review..."
                        rows={3}
                    />

                    {/* Submit Button */}
                    <button
                        onClick={submit}
                        className="
                            flex items-center gap-2 px-5 py-2 rounded-full text-white 
                            bg-pink-500 hover:bg-pink-600 shadow-md 
                            transition-all duration-200 ml-auto
                        "
                    >
                        Submit Review
                        <SendHorizonal size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
