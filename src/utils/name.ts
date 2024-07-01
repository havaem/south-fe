import { IProfile } from "@/types/models/profile";

export const shortestName = (name?: IProfile["name"]) => {
    if (!name) return "UU";
    const { first, last } = name;
    if (!first && !last) return "UU";
    return `${last.charAt(0)}${first.charAt(0)}`.trim();
};

export const renderName = (name?: IProfile["name"]) => {
    if (!name) return "Unknown";
    const { display, first, middle, last } = name;

    if (display === 1) return `${first}${middle ? " " + middle + " " : " "}${last}`;
    return `${last}${middle ? " " + middle + " " : " "}${first}`;
};
