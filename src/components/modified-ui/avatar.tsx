import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/utils";

import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props extends ComponentPropsWithoutRef<"div"> {
    text?: string;
    src?: string;

    hasStory?: boolean;

    avatarProps?: ComponentPropsWithoutRef<typeof AvatarBase>;
}
export const Avatar = forwardRef<HTMLDivElement, Props>(function Avatar(
    { text, src, hasStory, avatarProps, ...props },
    ref,
) {
    return (
        <div className="relative" ref={ref} {...props}>
            {hasStory && (
                <div className="absolute inset-0 rounded-full border-2 border-primary bg-background p-2"></div>
            )}
            <AvatarBase
                {...avatarProps}
                className={cn("", avatarProps?.className, hasStory && "border-[3px] border-transparent")}
            >
                <AvatarImage src={src} />
                <AvatarFallback>{text}</AvatarFallback>
            </AvatarBase>
        </div>
    );
});
