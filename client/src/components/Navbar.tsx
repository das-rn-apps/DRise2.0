import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { BookOpen, LayoutDashboard, LogIn, LogOut, UserPlus, User, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
    const token = useAuthStore((s) => s.token);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false); // Mobile menu toggle

    const handleLogout = () => {
        logout();
        navigate("/");
        setOpen(false);
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
                        DR
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 text-lg">D-Rise</div>
                        <div className="text-xs text-pink-500 -mt-0.5">Learn with Deepak sir</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link
                        to="/courses"
                        className={`flex items-center gap-1.5 transition-colors ${isActive("/courses") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                            }`}
                    >
                        <BookOpen size={18} /> Courses
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-1.5 transition-colors ${isActive("/dashboard") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                                    }`}
                            >
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>

                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                                <span className="flex items-center gap-1 text-gray-700 font-medium">
                                    <User size={18} /> {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`flex items-center gap-1.5 transition-colors ${isActive("/login") ? "text-indigo-700 border-b-2 border-indigo-500" : "text-gray-600 hover:text-indigo-600"
                                    }`}
                            >
                                <LogIn size={18} /> Login
                            </Link>

                            <Link
                                to="/signup"
                                className={`px-5 py-2 rounded-full shadow-md flex items-center gap-2 transition-all ${isActive("/signup") ? "bg-pink-600 text-white" : "bg-pink-500 text-white hover:bg-pink-600"
                                    }`}
                            >
                                <UserPlus size={18} /> Sign up
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {open && (
                <div className="md:hidden bg-white/90 backdrop-blur-xl px-4 pb-4 space-y-3 border-t border-gray-200">
                    <Link
                        to="/courses"
                        onClick={() => setOpen(false)}
                        className={`block transition-colors ${isActive("/courses") ? "text-indigo-700 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
                    >
                        Courses
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className={`block transition-colors ${isActive("/dashboard") ? "text-indigo-700 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
                            >
                                Dashboard
                            </Link>
                            <div className="flex flex-col gap-2 mt-2 border-t border-gray-200 pt-2">
                                <span className="flex items-center gap-1 text-gray-700 font-medium">
                                    <User size={18} /> {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className={`block transition-colors ${isActive("/login") ? "text-indigo-700 font-semibold" : "text-gray-700 hover:text-indigo-600"}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setOpen(false)}
                                className={`block px-4 py-2 rounded-full shadow-md bg-pink-500 text-white hover:bg-pink-600`}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
