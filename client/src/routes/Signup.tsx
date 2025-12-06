import React, { useState } from "react";
import { signup as apiSignup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await apiSignup({ name, email, password });
        if (res?.data?.token) {
            alert("Registered — please login");
            navigate("/login");
        } else {
            alert("Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h3>

                <form onSubmit={handle} className="space-y-4">
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-medium rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
