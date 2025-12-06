import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../utils/types";


export interface AuthState {
    isLoading: boolean;
    token: string | null;
    user: IUser | null;
    setToken: (t: string | null) => void;
    setUser: (u: IUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoading: false,
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user") || "null"),
            setToken: (t) => {
                if (t) localStorage.setItem("token", t); else localStorage.removeItem("token");
                set({ token: t });
            },
            setUser: (u) => {
                if (u) localStorage.setItem("user", JSON.stringify(u)); else localStorage.removeItem("user");
                set({ user: u });
            },
            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                set({ token: null, user: null });
            }
        }),
        { name: "edtech-auth" }
    )
);
