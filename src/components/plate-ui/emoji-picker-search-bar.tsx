import type { UseEmojiPickerType } from "@udecode/plate-emoji";
import { type ReactNode } from "react";

export type EmojiPickerSearchBarProps = {
    children: ReactNode;
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">;

export function EmojiPickerSearchBar({ children, i18n, searchValue, setSearch }: EmojiPickerSearchBarProps) {
    return (
        <div className="flex items-center px-2">
            <div className="relative flex grow">
                <input
                    aria-label="Search"
                    autoComplete="off"
                    className="block w-full appearance-none rounded-lg border-0 bg-gray-100 px-8 py-2 outline-none"
                    placeholder={i18n.search}
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearch(event.target.value)}
                />
                {children}
            </div>
        </div>
    );
}
