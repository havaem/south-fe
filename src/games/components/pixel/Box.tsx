import { cn } from "@/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface IProps extends ComponentPropsWithoutRef<"div"> {
    noPadding?: boolean;
}
const PixelBox = forwardRef<HTMLDivElement, IProps>(function Box({ className, children, noPadding, ...props }, ref) {
    return (
        <div
            ref={ref}
            {...props}
            className={cn(
                "flex select-none before:absolute before:-inset-x-[3px] before:inset-y-0 before:-z-10 before:bg-black after:absolute after:-inset-y-[3px] after:inset-x-0 after:-z-10 after:bg-black",
                className,
            )}
        >
            <div className={cn("h-full flex-1 bg-white", !noPadding && "px-6 py-4")}>{children}</div>
        </div>
    );
});
export default PixelBox;
