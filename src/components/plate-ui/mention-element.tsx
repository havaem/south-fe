/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-handler-names */
import { getHandler, PlateElement, useElement, withRef } from "@udecode/plate-common";
import type { TMentionElement } from "@udecode/plate-mention";
import { useFocused, useSelected } from "slate-react";

import { cn } from "@/utils";

export const MentionElement = withRef<
    typeof PlateElement,
    {
        onClick?: (mentionNode: any) => void;
        prefix?: string;
        renderLabel?: (mentionable: TMentionElement) => string;
    }
>(({ children, className, onClick, prefix, renderLabel, ...props }, ref) => {
    const element = useElement<TMentionElement>();
    const selected = useSelected();
    const focused = useFocused();

    return (
        <PlateElement
            contentEditable={false}
            data-slate-value={element.value}
            ref={ref}
            className={cn(
                "inline-block cursor-pointer rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm font-medium",
                selected && focused && "ring-ring ring-2",
                element.children[0].bold === true && "font-bold",
                element.children[0].italic === true && "italic",
                element.children[0].underline === true && "underline",
                className,
            )}
            onClick={getHandler(onClick, element)}
            {...props}
        >
            {prefix}
            {renderLabel ? renderLabel(element) : element.value}
            {children}
        </PlateElement>
    );
});
