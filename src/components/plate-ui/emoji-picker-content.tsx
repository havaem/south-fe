/* eslint-disable react/jsx-handler-names */
import {
    type Emoji,
    EmojiCategoryList,
    EmojiSettings,
    type GridRow,
    type UseEmojiPickerType,
} from "@udecode/plate-emoji";
import { memo, useCallback } from "react";

import { cn } from "@/utils";

export type EmojiPickerContentProps = Pick<
    UseEmojiPickerType,
    | "emojiLibrary"
    | "i18n"
    | "isSearching"
    | "onMouseOver"
    | "onSelectEmoji"
    | "refs"
    | "searchResult"
    | "settings"
    | "visibleCategories"
>;

export type EmojiButtonProps = {
    emoji: Emoji;
    index: number;
    onMouseOver: (emoji?: Emoji) => void;
    onSelect: (emoji: Emoji) => void;
};

export type RowOfButtonsProps = {
    row: GridRow;
} & Pick<UseEmojiPickerType, "emojiLibrary" | "onMouseOver" | "onSelectEmoji">;

const Button = memo(({ emoji, index, onMouseOver, onSelect }: EmojiButtonProps) => {
    return (
        <button
            aria-label={emoji.skins[0].native}
            className="group relative flex size-[36px] cursor-pointer items-center justify-center border-none bg-transparent text-2xl leading-none"
            data-index={index}
            tabIndex={-1}
            type="button"
            onClick={() => onSelect(emoji)}
            onMouseEnter={() => onMouseOver(emoji)}
            onMouseLeave={() => onMouseOver()}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[rgba(0,0,0,0.05)] opacity-0 group-hover:opacity-100"
            />
            <span data-emoji-set="native" style={{ position: "relative" }}>
                {emoji.skins[0].native}
            </span>
        </button>
    );
});
Button.displayName = "Button";

const RowOfButtons = memo(({ emojiLibrary, onMouseOver, onSelectEmoji, row }: RowOfButtonsProps) => (
    <div className="flex" data-index={row.id} key={row.id}>
        {row.elements.map((emojiId, index) => (
            <Button
                emoji={emojiLibrary.getEmoji(emojiId)}
                index={index}
                key={emojiId}
                onMouseOver={onMouseOver}
                onSelect={onSelectEmoji}
            />
        ))}
    </div>
));
RowOfButtons.displayName = "RowOfButtons";

export function EmojiPickerContent({
    emojiLibrary,
    i18n,
    isSearching = false,
    onMouseOver,
    onSelectEmoji,
    refs,
    searchResult,
    settings = EmojiSettings,
    visibleCategories,
}: EmojiPickerContentProps) {
    const getRowWidth = settings.perLine.value * settings.buttonSize.value;

    const isCategoryVisible = useCallback(
        (categoryId: EmojiCategoryList) => {
            return visibleCategories.has(categoryId) ? visibleCategories.get(categoryId) : false;
        },
        [visibleCategories],
    );

    const EmojiList = useCallback(() => {
        return emojiLibrary
            .getGrid()
            .sections()
            .map(({ id: categoryId }) => {
                const section = emojiLibrary.getGrid().section(categoryId);
                const { buttonSize } = settings;

                return (
                    <div data-id={categoryId} key={categoryId} ref={section.root} style={{ width: getRowWidth }}>
                        <div className="sticky top-0 z-[1] bg-background p-1 text-sm font-medium">
                            {i18n.categories[categoryId]}
                        </div>
                        <div
                            className="relative flex flex-wrap"
                            style={{ height: section.getRows().length * buttonSize.value }}
                        >
                            {isCategoryVisible(categoryId) &&
                                section
                                    .getRows()
                                    .map((row: GridRow, index) => (
                                        <RowOfButtons
                                            emojiLibrary={emojiLibrary}
                                            key={index}
                                            row={row}
                                            onMouseOver={onMouseOver}
                                            onSelectEmoji={onSelectEmoji}
                                        />
                                    ))}
                        </div>
                    </div>
                );
            });
    }, [emojiLibrary, getRowWidth, i18n.categories, isCategoryVisible, onSelectEmoji, onMouseOver, settings]);

    const SearchList = useCallback(() => {
        return (
            <div data-id="search" style={{ width: getRowWidth }}>
                <div className="sticky -top-px z-[1] bg-background/90 p-1 backdrop-blur-sm">{i18n.searchResult}</div>
                <div className="relative flex flex-wrap">
                    {searchResult.map((emoji: Emoji, index: number) => (
                        <Button
                            emoji={emojiLibrary.getEmoji(emoji.id)}
                            index={index}
                            key={emoji.id}
                            onMouseOver={onMouseOver}
                            onSelect={onSelectEmoji}
                        />
                    ))}
                </div>
            </div>
        );
    }, [emojiLibrary, getRowWidth, i18n.searchResult, searchResult, onSelectEmoji, onMouseOver]);

    return (
        <div
            className={cn("mx-auto h-full min-h-[50%] overflow-y-auto")}
            data-id="scroll"
            ref={refs.current.contentRoot}
        >
            <div className="h-full" ref={refs.current.content}>
                {isSearching ? SearchList() : EmojiList()}
            </div>
        </div>
    );
}
