import { EMapType } from "../constants";
import { toGridSize } from "./toGridSize";

export const buildMap = (walls: number[][], offset = { x: 0, y: 0 }) => {
    const mapSet = new Set<string>();

    for (let i = 0; i < walls.length; i++) {
        for (let j = 0; j < walls[i].length; j++) {
            //* WALL 0
            if (walls[i][j] === 0) {
                mapSet.add(`${EMapType.WALL}-${toGridSize(j) + offset.y},${toGridSize(i) + offset.x}`);
            }
        }
    }

    return mapSet;
};
