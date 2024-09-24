import { IUser } from "./user";

export interface IProfileName {
    first: string;
    middle?: string;
    last: string;
    display: number;
}

export interface IProfile {
    _id: string;
    user: Pick<IUser, "_id" | "email" | "username">;
    name: IProfileName;
    avatar: string;
    cover: string;
}
