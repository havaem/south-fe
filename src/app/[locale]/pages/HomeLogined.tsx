"use client";
import { selectAuth, useRootStore } from "@/providers";

interface Props {}
const HomeLogined: React.FC<Props> = () => {
    const { user } = useRootStore(selectAuth);

    return <div>{user.email}</div>;
};
export default HomeLogined;
