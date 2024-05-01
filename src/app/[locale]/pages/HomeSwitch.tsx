"use client";

import { selectAuth, useRootStore } from "@/providers";

import Home from "./Home";
import HomeLogined from "./HomeLogined";

const HomeSwitch: React.FC = () => {
    const { isLogin } = useRootStore(selectAuth);

    return <>{!isLogin ? <Home /> : <HomeLogined />}</>;
};
export default HomeSwitch;
