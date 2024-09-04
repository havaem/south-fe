import { IWorldMapConfig } from "@/games/types";

import { CityMap } from "./city";
import { RoomBauCuaMap } from "./room-baucua";
import { WelcomeMap } from "./welcome";

type MapKey = "WelcomeMap" | "CityMap" | "RoomBauCuaMap" | (string & {});

export const MAPS: Record<MapKey, IWorldMapConfig> = {
    WelcomeMap: WelcomeMap,
    CityMap: CityMap,
    RoomBauCuaMap: RoomBauCuaMap,
};
