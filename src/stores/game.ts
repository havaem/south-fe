import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { WorldObject } from "@/games/cores/WorldObject";

export type TGameStore = {
    player: WorldObject | null;
    setPlayer: (player: WorldObject) => void;
};

export const useGameStore = create<TGameStore>()(
    devtools((set) => ({
        player: null,
        setPlayer: (player: WorldObject) => set({ player }),
    })),
);
