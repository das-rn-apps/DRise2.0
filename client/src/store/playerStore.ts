import { create } from "zustand";
import type { ILesson } from "../utils/types";

interface PlayerState {
    currentLesson: ILesson | null;
    setCurrentLesson: (l: ILesson | null) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
    currentLesson: null,
    setCurrentLesson: (l) => set({ currentLesson: l })
}));
