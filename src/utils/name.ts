import { IUser } from "@/types";

export const shortestName = (name?: IUser["name"]) => {
    if (!name) return "UU";
    const { first, last } = name;
    if (!first && !last) return "UU";
    return `${last.charAt(0)}${first.charAt(0)}`.trim();
};

export const renderName = (name: IUser["name"]) => {
    const { display, first, middle, last } = name;

    if (display === 1) return `${first}${middle ? " " + middle + " " : " "}${last}`;
    return `${last}${middle ? " " + middle + " " : " "}${first}`;
};
