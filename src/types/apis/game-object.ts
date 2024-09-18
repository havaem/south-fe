import { INDEX, OBJECT_TYPE } from "@/games/constants";

export type IGameObjectUpdatePayload =
    | {
          name?: string;
          type?: OBJECT_TYPE;
          position?: {
              x: number;
              y: number;
          };
          index?: INDEX;
          data?: any;
      }
    | {
          type?: OBJECT_TYPE.LIVEABLE;
          data?: {
              body?: string;
              eye?: string;
              outfit?: string;
              hair?: string;
          };
      };
