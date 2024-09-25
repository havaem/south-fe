import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { IAuthResponse, IUser } from "@/types";

export type TAuthStore = {
    isLogin: boolean;
    accessToken: string;
    user: IUser | null;
    logIn: (data: IAuthResponse) => void;
    setUser: (user: IUser) => void;
    logOut: () => void;
};

export const useAuthStore = create<TAuthStore>()(
    devtools<TAuthStore>((set) => ({
        accessToken: "",
        isLogin: false,
        user: null,
        setUser: (user: IUser) => {
            set({ user, isLogin: true });
        },
        setToken: (accessToken: string) => {
            set({ accessToken });
        },
        logIn: (data: IAuthResponse) => {
            const { user, token } = data;

            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, token.refreshToken);

            set({
                isLogin: true,
                user,
                accessToken: token.accessToken,
            });
        },
        logOut: () => {
            set({
                isLogin: false,
                user: null,
            });
            localStorage.clear();
        },
    })),
);
