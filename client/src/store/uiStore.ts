import { create } from "zustand";

interface UIState {
    toast: { message: string; type?: "info" | "success" | "error" } | null;
    showToast: (message: string, type?: "info" | "success" | "error") => void;
    hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    toast: null,
    showToast: (message, type = "info") => set({ toast: { message, type } }),
    hideToast: () => set({ toast: null })
}));
