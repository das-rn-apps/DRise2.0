import React from "react";
import { Link } from "react-router-dom";
import { FolderOpen, PlayCircle, Clock, Lock } from "lucide-react";
import type { IChapter, ILesson } from "../utils/types";

interface LessonListProps {
    chapters: IChapter[];
}

const LessonList: React.FC<LessonListProps> = ({ chapters }) => {
    return (
        <div className="space-y-6">
            {chapters.map((chapter) => (
                <div
                    key={chapter._id}
                    className="
                        bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 
                        hover:shadow-xl transition-all duration-300
                    "
                >
                    {/* Chapter Header */}
                    <div className="flex items-center gap-3">
                        <FolderOpen className="text-indigo-600" size={22} />
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700">{chapter.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>
                        </div>
                    </div>

                    {/* Lessons List */}
                    <div className="mt-5 space-y-3">
                        {chapter.lessons?.map((lesson: ILesson) => (
                            <div
                                key={lesson._id}
                                className={`
                                    p-4 rounded-xl border flex items-center justify-between
                                    transition-all duration-300 hover:-translate-y-1
                                    ${lesson.isLocked ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-70" : "bg-gray-50 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/60"}
                                `}
                            >
                                {/* Lesson Text */}
                                <div className="flex flex-col">
                                    <div className="font-medium text-gray-800 flex items-center gap-2">
                                        {lesson.isLocked ? <Lock size={18} className="text-gray-400" /> : <PlayCircle size={18} className="text-pink-500" />}
                                        {lesson.title}
                                    </div>
                                    {lesson.duration && (
                                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                            <Clock size={14} />
                                            {lesson.duration} sec
                                        </div>
                                    )}
                                </div>

                                {/* Button */}
                                {!lesson.isLocked && (
                                    <Link
                                        to={`/watch/${lesson._id}`}
                                        className="
                                            px-4 py-1.5 text-sm rounded-full font-medium 
                                            bg-pink-500 text-white shadow-md 
                                            hover:bg-pink-600 transition-all duration-200
                                        "
                                    >
                                        Watch
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
