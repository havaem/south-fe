import { Value } from "@udecode/plate-common";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from "react";
import { z } from "zod";

const postSchema = z.object({
    content: z.custom<Value>(),
    media: z.array(z.custom<File>()),
});

interface IPostContext {
    value: z.infer<typeof postSchema>;
    handleChangeContent: (value: Value) => void;
    handleChangeMedia: Dispatch<SetStateAction<File[]>>;
    handleRemoveMedia: (index: number) => void;
}

export const PostContext = createContext<IPostContext | undefined>(undefined);

export const PostProvider = ({ children }: PropsWithChildren) => {
    const [content, setContent] = useState<Value>([]);
    const [media, setMedia] = useState<File[]>([]);

    const handleRemoveMedia = (index: number) => {
        const newMedia = [...media];
        newMedia.splice(index, 1);
        setMedia(newMedia);
    };

    const value = useMemo(() => {
        return {
            value: postSchema.parse({ content, media }),
            handleChangeContent: setContent,
            handleChangeMedia: setMedia,
            handleRemoveMedia,
        };
    }, [content, media]);

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePostContext must be used within a PostProvider");
    }
    return context;
};
