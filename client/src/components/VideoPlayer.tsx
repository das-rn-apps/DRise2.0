import React from "react";
import { PlayCircle } from "lucide-react";

const VideoPlayer: React.FC<{ src?: string }> = ({ src }) => {
    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-indigo-100 bg-black">
            {src ? (
                <video
                    controls
                    className="w-full h-64 md:h-80 lg:h-96 bg-black rounded-lg"
                >
                    <source src={src} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="w-full h-64 md:h-80 lg:h-96 flex flex-col items-center justify-center text-white bg-linear-to-tr from-gray-800 via-gray-900 to-black rounded-lg">
                    <PlayCircle size={48} className="text-pink-500 animate-pulse" />
                    <span className="mt-2 text-lg font-medium">No Video Available</span>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
