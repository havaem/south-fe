import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { World } from "@/games/cores/World";
import { WorldObject } from "@/games/cores/WorldObject";

export type TGameStore = {
    player: WorldObject | null;
    setPlayer: (player: WorldObject) => void;
    world: World | null;
    setWorld: (world: World) => void;
};

export const useGameStore = create<TGameStore>()(
    devtools<TGameStore>((set) => ({
        player: null,
        world: null,

        setPlayer: (player: WorldObject) => set({ player }),
        setWorld: (world: World) => set({ world }),
    })),
);
