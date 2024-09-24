import { ELocale } from "@/constants";

export interface IUserStatus {
    isVerified: boolean;
    isActive: boolean;
    isFirstLogin: boolean;
}

export interface IUser {
    _id: string;
    email: string;
    username: string;
    status: IUserStatus;
    roles: string[];
    locale: ELocale;
}
