import { IUser } from "@/types";

export const shortestName = (name?: IUser["name"]) => {
    if (!name) return "UU";
    const { first, last } = name;
    if (!first && !last) return "UU";
    return `${last.charAt(0)}${first.charAt(0)}`.trim();
};
