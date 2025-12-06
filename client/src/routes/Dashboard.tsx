import React from "react";
import { useAuthStore } from "../store/authStore";
import { User, BookOpen, CheckCircle } from "lucide-react";

const Dashboard: React.FC = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <User size={20} />
                        <span className="text-sm text-gray-500 uppercase font-medium">Profile</span>
                    </div>
                    <div className="mt-3 font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                </div>

                {/* Enrolled Courses Card */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <BookOpen size={20} />
                        <span className="text-sm text-gray-500 uppercase font-medium">Enrolled Courses</span>
                    </div>
                    <div className="mt-3 font-semibold text-gray-900">0</div>
                </div>

                {/* Quizzes Taken Card */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 text-indigo-600">
                        <CheckCircle size={20} />
                        <span className="text-sm text-gray-500 uppercase font-medium">Quizzes Taken</span>
                    </div>
                    <div className="mt-3 font-semibold text-gray-900">0</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
