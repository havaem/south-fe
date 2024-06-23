import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/stores";
import { shortestName } from "@/utils";

import { Avatar } from "../modified-ui";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import PostDialog from "./components/post-dialog";
import { PostProvider } from "./post-context";

interface Props {}
const PostNew: React.FC<Props> = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();

    const [isOpenNewPost, setIsOpenNewPost] = useState<boolean>(true);

    const handleToggleOpenNewPost = () => {
        setIsOpenNewPost(true);
    };

    useEffect(() => {
        if (isOpenNewPost) {
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = "";
            }, 0);

            return () => clearTimeout(timer);
        } else {
            document.body.style.pointerEvents = "auto";
        }
    }, [isOpenNewPost]);
    return (
        <PostProvider>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <PostDialog open={isOpenNewPost} onOpenChange={setIsOpenNewPost} />
            <Card className="mb-8 justify-between p-6 flex-center-y">
                <div className="flex-1 flex-row gap-4 space-y-0 flex-center-y">
                    <Avatar src={user?.avatar} text={shortestName(user?.name)} />
                    <button
                        className="flex-1 cursor-text text-left text-muted-foreground"
                        onClick={handleToggleOpenNewPost}
                    >
                        {t("post.what_is_on_your_mind")}
                    </button>
                </div>
                <Button onClick={handleToggleOpenNewPost}>{t("post.post")}</Button>
            </Card>
        </PostProvider>
    );
};
export default PostNew;
