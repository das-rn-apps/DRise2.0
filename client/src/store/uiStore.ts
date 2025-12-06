import { create } from "zustand";

export type ToastType = "info" | "success" | "error";

export interface ToastMessage {
    message: string;
    type?: ToastType;
}

interface UIState {
    toast: ToastMessage | null;
    showToast: (message: string, type?: ToastType) => void;
    hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    toast: null,

    showToast: (message, type = "info") =>
        set({
            toast: { message, type }
        }),

    hideToast: () => set({ toast: null })
}));
