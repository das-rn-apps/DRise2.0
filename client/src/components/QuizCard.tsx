import React from "react";
import { Link } from "react-router-dom";
import type { IQuiz } from "../utils/types";
import { ListChecks, Medal, ArrowRightCircle } from "lucide-react";

const QuizCard: React.FC<{ quiz: IQuiz }> = ({ quiz }) => {
    return (
        <div
            className="
                bg-white p-5 rounded-2xl shadow-lg border border-indigo-100 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
            "
        >
            {/* Quiz Title */}
            <div className="flex items-center gap-2">
                <ListChecks size={20} className="text-indigo-600" />
                <h3 className="font-semibold text-lg text-gray-900">{quiz.title}</h3>
            </div>

            {/* Total Marks */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Medal size={16} className="text-pink-500" />
                Total Marks: {quiz.totalMarks}
            </div>

            {/* Start Quiz Button */}
            <div className="mt-4">
                <Link
                    to={`/quiz/${quiz._id}`}
                    className="
                        inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium 
                        bg-pink-500 text-white shadow-md 
                        hover:bg-pink-600 transition-all duration-200
                    "
                >
                    Start Quiz
                    <ArrowRightCircle size={18} />
                </Link>
            </div>
        </div>
    );
};

export default QuizCard;
