import { DialogProps } from "@radix-ui/react-dialog";
import { insertNode, PlateEditor, selectEditor } from "@udecode/plate-common";
import { Emoji } from "@udecode/plate-emoji";
import { Images, SmilePlus, Sticker } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { EmojiPicker } from "@/components/emoji-picker";
import { Avatar } from "@/components/modified-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { IMAGE_FILE_SIZE, IMAGE_FILE_TYPE, MAX_IMAGES } from "@/constants";
import { usePostCreate } from "@/hooks/queries/usePostCreate";
import { useAuthStore } from "@/stores";
import { renderName, shortestName } from "@/utils";

import { usePostContext } from "../post-context";
import PostEditor from "./post-editor";
import PostImages from "./post-images";

const PostDialog: React.FC<DialogProps> = (props) => {
    const { toast } = useToast();
    const { t } = useTranslation();

    const { mutate } = usePostCreate();

    const editorRef = useRef<PlateEditor | null>(null);

    const { value, handleChangeMedia: handleChangeImages } = usePostContext();
    const { user } = useAuthStore();

    const postImagesRef = useRef<HTMLInputElement>(null);

    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);

    const handleInsertEmoji = (emoji: Emoji) => {
        const editor = editorRef.current;
        if (editor) insertNode(editor, { text: emoji.skins[0].native });
    };

    const handleClickPostImages = () => {
        postImagesRef.current?.click();
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageFiles = Array.from(files);

            //* Check if the file is an image
            const isImage = imageFiles.every((file) => IMAGE_FILE_TYPE.includes(file.type));
            if (!isImage) {
                toast({
                    description: t("post.image_only"),
                });
                return;
            }

            //* Check if the number of images is greater than the maximum number of images
            if (value.media.length + files.length > MAX_IMAGES) {
                toast({
                    description: t("post.max_images", { max: 5 }),
                });
                return;
            }

            //* Check if the size of the image is greater than the maximum size
            const isSizeValid = imageFiles.every((file) => file.size <= 1 * 1024 * 1024);
            if (!isSizeValid) {
                toast({
                    description: t("post.image_size", { size: IMAGE_FILE_SIZE / (1024 * 1024) + "MB" }),
                });
                return;
            }

            handleChangeImages((pre) => pre.concat(imageFiles));
        }
    };

    const handleSubmit = () => {
        const { content, media } = value;
        const formData = new FormData();
        formData.append("content", JSON.stringify(content));
        media.forEach((file) => {
            formData.append("media", file);
        });

        mutate(formData);
    };

    useEffect(() => {
        const editor = editorRef.current;
        if (editor && !isOpenEmojiPicker) {
            selectEditor(editor, {
                at: editor.selection || undefined,
                edge: editor.selection ? undefined : "end",
                focus: true,
            });
        }
    }, [isOpenEmojiPicker]);

    return (
        <Dialog {...props}>
            <DialogContent
                hideCloseButton
                aria-describedby="post"
                className="max-w-2xl"
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center">{t("post.new_post")}</DialogTitle>
                </DialogHeader>
                <div className="w-full space-y-4">
                    <div className="flex-row gap-4 space-y-0 flex-center-y">
                        <Avatar src={user?.avatar} text={shortestName(user!.name)} />

                        <div className="flex flex-col">
                            <Link to="/">
                                <h2 className="font-medium">{renderName(user!.name)}</h2>
                            </Link>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{t("post.now")}</div>
                        </div>
                    </div>
                    <div className="max-h-[60dvh] space-y-4 overflow-auto p-2">
                        <PostEditor editorRef={editorRef} />
                        {value.media.length !== 0 && <PostImages />}
                    </div>
                    <input
                        hidden
                        multiple
                        accept={IMAGE_FILE_TYPE}
                        id="post-images"
                        name="post-images"
                        ref={postImagesRef}
                        type="file"
                        onChange={handleImageInputChange}
                    />
                    <div className="justify-between gap-8 flex-center-y">
                        <div className="gap-2 flex-center-y">
                            <Button className="size-8" size="icon" variant="ghost" onClick={handleClickPostImages}>
                                <Images size={20} />
                            </Button>

                            {/* eslint-disable-next-line react/jsx-handler-names */}
                            <Popover open={isOpenEmojiPicker} onOpenChange={setIsOpenEmojiPicker}>
                                <PopoverTrigger asChild>
                                    <Button className="size-8" size="icon" variant="ghost">
                                        <SmilePlus size={20} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="border-none p-0" onWheel={(e) => e.stopPropagation()}>
                                    <EmojiPicker onSelectEmoji={handleInsertEmoji} />
                                </PopoverContent>
                            </Popover>
                            <Button className="size-8" size="icon" variant="ghost">
                                <Sticker size={20} />
                            </Button>
                        </div>
                        <Button onClick={handleSubmit}>{t("post.post")}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default PostDialog;
