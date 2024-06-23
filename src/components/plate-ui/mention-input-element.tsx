import { PlateElement, withRef } from "@udecode/plate-common";
import { getMentionOnSelectItem } from "@udecode/plate-mention";
import { useState } from "react";

export const MENTIONABLES = [
    {
        id: "0",
        avatar: "https://i.pravatar.cc/300",
        text: "Nam Võ",
        data: {
            email: "aayla_secura@force.com",
        },
    },
    {
        id: "1",
        avatar: "https://i.pravatar.cc/300",
        text: "Nam Hoài Võ",
        data: {
            email: "adi_gallia@force.com",
        },
    },
    {
        id: "2",
        avatar: "https://i.pravatar.cc/300",
        text: "Võ Hoài Nam",
        data: {
            email: "admiral_dodd_rancit@force.com",
        },
    },
];

import { cn } from "@/utils";

import { Avatar } from "../modified-ui";
import {
    InlineCombobox,
    InlineComboboxContent,
    InlineComboboxEmpty,
    InlineComboboxInput,
    InlineComboboxItem,
} from "./inline-combobox";

const onSelectItem = getMentionOnSelectItem();

export const MentionInputElement = withRef<typeof PlateElement>(({ className, ...props }, ref) => {
    const { children, editor, element } = props;
    const [search, setSearch] = useState("");

    return (
        <PlateElement as="span" data-slate-value={element.value} ref={ref} {...props}>
            <InlineCombobox element={element} setValue={setSearch} showTrigger={false} trigger="@" value={search}>
                <span
                    className={cn(
                        "ring-ring inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm focus-within:ring-2",
                        className,
                    )}
                >
                    <InlineComboboxInput />
                </span>

                <InlineComboboxContent className="space-y-1 rounded-md p-1">
                    <InlineComboboxEmpty>No results found</InlineComboboxEmpty>

                    {MENTIONABLES.map((item) => (
                        <InlineComboboxItem
                            className="gap-2"
                            key={item.id}
                            value={item.text}
                            onClick={() => onSelectItem(editor, item, search)}
                        >
                            <Avatar src={item.avatar} text={item.text} />
                            <span className="font-medium">{item.text}</span>
                        </InlineComboboxItem>
                    ))}
                </InlineComboboxContent>
            </InlineCombobox>

            {children}
        </PlateElement>
    );
});
