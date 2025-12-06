import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson } from "../api/course";
import VideoPlayer from "../components/VideoPlayer";
import type { ILesson } from "../utils/types";

const WatchVideo: React.FC = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState<ILesson>();

    useEffect(() => {
        (async () => {
            if (!lessonId) return;
            const res = await getLesson(lessonId);
            setLesson(res.data);
        })();
    }, [lessonId]);

    if (!lesson) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
            {/* Video + Lesson Info */}
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>

                <VideoPlayer src={lesson.videoUrl} />

                <div className="p-4 bg-white rounded-2xl shadow-lg border border-indigo-100">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-700 font-medium">Duration</div>
                        <div className="text-indigo-600 font-semibold">{lesson.duration || "N/A"}</div>
                    </div>
                    <div className="mt-2 text-gray-600">{lesson.description}</div>
                </div>
            </div>

            {/* Sidebar placeholder for Chapters / Lessons */}
            <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-4">
                    <h3 className="font-semibold text-indigo-700 mb-3">Lessons</h3>
                    {/* Placeholder list */}
                    <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-indigo-50 transition cursor-pointer">
                            Example Lesson 1
                        </div>
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-indigo-50 transition cursor-pointer">
                            Example Lesson 2
                        </div>
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-indigo-50 transition cursor-pointer">
                            Example Lesson 3
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchVideo;
