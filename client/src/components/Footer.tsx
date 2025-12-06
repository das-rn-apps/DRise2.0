import React from "react";
import { Heart, BookOpen } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="mt-12 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
            <div className="container mx-auto px-4 py-6 text-center text-sm">
                <p className="flex justify-center items-center gap-2">
                    © {new Date().getFullYear()}
                    <span className="flex items-center gap-1 font-semibold">
                        <BookOpen size={16} />
                        EdTech
                    </span>
                    —
                    Built with
                    <Heart
                        size={16}
                        className="text-red-300 animate-pulse"
                        fill="currentColor"
                    />
                    for mamangin
                </p>
            </div>
        </footer>
    );
};

export default Footer;
