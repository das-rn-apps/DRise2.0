import React, { useState } from "react";
import { login as apiLogin } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setToken = useAuthStore((s) => s.setToken);
    const setUser = useAuthStore((s) => s.setUser);
    const navigate = useNavigate();

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await apiLogin({ email, password });
        if (res?.data?.token) {
            setToken(res.data.token);
            setUser(res.data.user);
            navigate("/dashboard");
        } else {
            alert(res?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-indigo-100 space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 text-center">Login</h3>

                <form onSubmit={handle} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-indigo-500" size={18} />
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-pink-500" size={18} />
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-full font-medium shadow-md hover:scale-105 transition-transform duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Don't have an account? <a href="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
