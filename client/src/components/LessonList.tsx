import React from "react";
import { Link } from "react-router-dom";
import type { IChapter } from "../utils/types";
import { FolderOpen, PlayCircle, Clock } from "lucide-react";

const LessonList: React.FC<{ chapters: IChapter[] }> = ({ chapters }) => {
    return (
        <div className="space-y-6">
            {chapters.map((ch) => (
                <div
                    key={ch._id}
                    className="
                        bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 
                        hover:shadow-xl transition-all duration-300
                    "
                >
                    {/* Chapter Header */}
                    <div className="flex items-center gap-3">
                        <FolderOpen className="text-indigo-600" size={22} />
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700">{ch.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {ch.description}
                            </p>
                        </div>
                    </div>

                    {/* Lessons List */}
                    <div className="mt-5 space-y-3">
                        {ch.lessons?.map((l: any) => (
                            <div
                                key={l._id}
                                className="
                                    p-4 rounded-xl border border-gray-100 bg-gray-50 
                                    flex items-center justify-between
                                    hover:border-indigo-300 hover:bg-indigo-50/60
                                    transition-all duration-300 hover:-translate-y-1
                                "
                            >
                                {/* Lesson Text */}
                                <div>
                                    <div className="font-medium text-gray-800 flex items-center gap-2">
                                        <PlayCircle size={18} className="text-pink-500" />
                                        {l.title}
                                    </div>

                                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        {l.duration && (
                                            <>
                                                <Clock size={14} />
                                                {l.duration} sec
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Button */}
                                <Link
                                    to={`/watch/${l._id}`}
                                    className="
                                        px-4 py-1.5 text-sm rounded-full font-medium 
                                        bg-pink-500 text-white shadow-md 
                                        hover:bg-pink-600 transition-all duration-200
                                    "
                                >
                                    Watch
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
