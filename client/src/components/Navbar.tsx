import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { BookOpen, LayoutDashboard, LogIn, LogOut, UserPlus, User } from "lucide-react";

const Navbar: React.FC = () => {
    const token = useAuthStore((s) => s.token);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-transparent backdrop-blur-xl shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center 
          text-white font-bold text-lg shadow-md 
          group-hover:bg-indigo-700 transition-all">
                        ED
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 text-lg">EdTech</div>
                        <div className="text-xs text-gray-500 -mt-0.5">Learn with mamangin</div>
                    </div>
                </Link>

                {/* Nav Section */}
                <nav className="flex items-center gap-6 text-sm font-medium">

                    {/* Courses */}
                    <Link
                        to="/courses"
                        className={`flex items-center gap-1.5 transition-colors ${isActive("/courses") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                            }`}
                    >
                        <BookOpen size={18} />
                        Courses
                    </Link>

                    {token ? (
                        <>
                            {/* Dashboard */}
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-1.5 transition-colors ${isActive("/dashboard") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                                    }`}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>

                            {/* User + Logout */}
                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                                <span className="flex items-center gap-1 text-gray-700 font-medium">
                                    <User size={18} />
                                    {user?.name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Login */}
                            <Link
                                to="/login"
                                className={`flex items-center gap-1.5 transition-colors ${isActive("/login") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                                    }`}
                            >
                                <LogIn size={18} />
                                Login
                            </Link>

                            {/* Signup */}
                            <Link
                                to="/signup"
                                className={`px-5 py-2 rounded-full shadow-md flex items-center gap-2 transition-all ${isActive("/signup") ? "bg-pink-600 text-white" : "bg-pink-500 text-white hover:bg-pink-600"
                                    }`}
                            >
                                <UserPlus size={18} />
                                Sign up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
