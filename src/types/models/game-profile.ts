import { IUser } from "./user";

export interface IGameProfile {
    _id: string;
    user: Pick<IUser, "_id" | "email" | "username">;
    hero: string;
}
