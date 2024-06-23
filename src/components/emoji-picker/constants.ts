import { EmojiCategoryList } from "@udecode/plate-emoji";

const visibleCategories = new Map<EmojiCategoryList, boolean>();
visibleCategories.set("frequent", true);
visibleCategories.set("people", true);
visibleCategories.set("nature", true);
visibleCategories.set("foods", true);
visibleCategories.set("activity", true);
visibleCategories.set("places", true);
visibleCategories.set("objects", true);
visibleCategories.set("symbols", true);
visibleCategories.set("flags", true);

export { visibleCategories };
