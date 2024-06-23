import { BookmarkIcon, CircleOff, Ellipsis, FlagTriangleRight, Heart, MessageCircle, Share2 } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/utils";

import { Avatar } from "../modified-ui";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ImageLayout from "./components/image-layout";

interface IProps extends ComponentPropsWithoutRef<"div"> {}
const Post = forwardRef<HTMLDivElement, IProps>(function Post(props, ref) {
    const [isLove, setIsLove] = useState<boolean>(false);
    const [isOpenComment, setIsOpenComment] = useState<boolean>(false);

    const handleClickLove = () => {
        setIsLove((prev) => !prev);
    };

    const handleClickComment = () => {
        setIsOpenComment((prev) => !prev);
    };

    return (
        <Card className="relative" ref={ref} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="absolute right-4 top-4 size-8" size="icon" variant="ghost">
                        <Ellipsis size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom">
                    <DropdownMenuItem>
                        <BookmarkIcon className="mr-2 h-4 w-4" />
                        Save
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive>
                        <CircleOff className="mr-2 h-4 w-4" />
                        Block
                    </DropdownMenuItem>
                    <DropdownMenuItem destructive>
                        <FlagTriangleRight className="mr-2 h-4 w-4" />
                        Report post
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <CardHeader className="flex-row gap-4 space-y-0 flex-center-y">
                <Avatar />
                <div className="flex flex-col">
                    <Link to="/">
                        <h2 className="font-medium">Võ Hoài Nam</h2>
                    </Link>
                    <div className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    Excited to share my latest project with you all! Check it out and let me know what you think. 🚀
                </div>
                <ImageLayout
                    images={[
                        "https://generated.vusercontent.net/placeholder.svg",
                        "https://generated.vusercontent.net/placeholder.svg",
                        "https://generated.vusercontent.net/placeholder.svg",
                        "https://generated.vusercontent.net/placeholder.svg",
                    ]}
                />
            </CardContent>
            <CardFooter className="justify-between flex-center-y">
                <div className="gap-2 flex-center-y">
                    <Button size="icon" variant="ghost" onClick={handleClickLove}>
                        <Heart
                            className={cn("transition-colors", !isLove && "fill-red-600 stroke-red-600")}
                            size={20}
                        />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleClickComment}>
                        <MessageCircle
                            className={cn("transition-colors", isOpenComment && "fill-primary stroke-primary")}
                            size={20}
                        />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Share2 size={20} />
                    </Button>
                </div>
                <div className="gap-2 flex-center-y">
                    <Badge className="px-2 py-1 text-xs" variant="outline">
                        12 Likes
                    </Badge>
                    <Badge className="px-2 py-1 text-xs" variant="outline">
                        4 Comments
                    </Badge>
                </div>
            </CardFooter>
        </Card>
    );
});
export default Post;
