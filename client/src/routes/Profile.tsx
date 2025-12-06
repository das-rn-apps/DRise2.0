import React from "react";
import { useAuthStore } from "../store/authStore";
import { User } from "lucide-react";

const Profile: React.FC = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 space-y-6">
                <div className="flex items-center gap-3">
                    <User className="text-indigo-600" size={24} />
                    <h3 className="text-2xl font-bold text-gray-900">Your Profile</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-500 uppercase font-medium">Name</div>
                        <div className="font-semibold text-gray-900">{user?.name}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 uppercase font-medium">Email</div>
                        <div className="font-semibold text-gray-900">{user?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
