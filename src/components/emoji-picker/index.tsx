/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/jsx-handler-names */
import { Emoji, EmojiDropdownMenuOptions, EmojiSettings, useEmojiDropdownMenuState } from "@udecode/plate-emoji";

import { cn } from "@/utils";

import { emojiCategoryIcons, emojiSearchIcons } from "../plate-ui/emoji-icons";
import { EmojiPickerContent } from "../plate-ui/emoji-picker-content";
import { EmojiPickerNavigation } from "../plate-ui/emoji-picker-navigation";
import { EmojiPickerPreview } from "../plate-ui/emoji-picker-preview";
import { EmojiPickerSearchAndClear } from "../plate-ui/emoji-picker-search-and-clear";
import { EmojiPickerSearchBar } from "../plate-ui/emoji-picker-search-bar";
import { visibleCategories } from "./constants";

type EmojiDropdownMenuProps = {
    options?: EmojiDropdownMenuOptions;
    showSearch?: boolean;
    showPreview?: boolean;
    onSelectEmoji: (emoji: Emoji) => void;
};

export function EmojiPicker({ options, showSearch, showPreview, onSelectEmoji }: EmojiDropdownMenuProps) {
    const { emojiPickerState } = useEmojiDropdownMenuState(options);

    const {
        clearSearch,
        emojiLibrary,
        handleCategoryClick,
        hasFound,
        i18n,
        isSearching,
        onMouseOver,
        refs,
        focusedCategory,
        searchResult,
        searchValue,
        emoji,
        setSearch,
    } = emojiPickerState;
    return (
        <div className={cn("flex h-[350px] min-w-fit flex-col rounded bg-background p-2 shadow")}>
            <EmojiPickerNavigation
                emojiLibrary={emojiLibrary}
                focusedCategory={focusedCategory}
                i18n={i18n}
                icons={{
                    categories: emojiCategoryIcons,
                    search: emojiSearchIcons,
                }}
                onClick={handleCategoryClick}
            />
            {showSearch && (
                <EmojiPickerSearchBar i18n={i18n} searchValue={searchValue} setSearch={setSearch}>
                    <EmojiPickerSearchAndClear clearSearch={clearSearch} i18n={i18n} searchValue={searchValue} />
                </EmojiPickerSearchBar>
            )}
            <EmojiPickerContent
                emojiLibrary={emojiLibrary}
                i18n={i18n}
                isSearching={isSearching}
                refs={refs}
                searchResult={searchResult}
                settings={EmojiSettings}
                visibleCategories={visibleCategories}
                onMouseOver={onMouseOver}
                onSelectEmoji={onSelectEmoji}
            />
            {showPreview && (
                <EmojiPickerPreview emoji={emoji} hasFound={hasFound} i18n={i18n} isSearching={isSearching} />
            )}
        </div>
    );
}
