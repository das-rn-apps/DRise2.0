import React, { useEffect } from "react";
import { useUIStore } from "../store/uiStore";

export const ToastRoot: React.FC = () => {
    const toast = useUIStore((s) => s.toast);
    const hide = useUIStore((s) => s.hideToast);

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => hide(), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast, hide]);

    if (!toast) return null;

    const bgClass =
        toast.type === "error"
            ? "bg-red-500 text-white"
            : toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-indigo-100 text-indigo-800";

    return (
        <div className="fixed right-4 bottom-6 z-50">
            <div
                className={`flex items-center justify-between gap-4 px-5 py-3 rounded-2xl shadow-lg ${bgClass} animate-slideIn`}
            >
                <div className="flex-1 text-sm">{toast.message}</div>
                <button
                    onClick={hide}
                    className="text-white/90 hover:text-white font-semibold transition"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};
