import { IGameProfile } from "../models";

export interface IGameProfileUpdateCurrent {
    data: {
        body?: string;
        eye?: string;
        hair?: string;
        outfit?: string;
        accessory?: string;
    };
}
export type IGameProfileUpdateCurrentResponse = IResponse<IGameProfile>;
