import { IProfileName } from "./profile";

export interface IPost {
    _id: string;
    author: string;
    author_profile: {
        _id: string;
        user: string;
        name: IProfileName;
        avatar: string;
    };
    media: Array<{
        type: string;
        url: string;
    }>;
    likes: string[];
    comments: string[];
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
