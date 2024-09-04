import { FormatDistanceToNowStrictOptions } from "date-fns";
import { enUS, vi } from "date-fns/locale";

const locales = { enUS, vi };

/**
 * Get the time from now in text format
 * @param date date string, number or Date object
 * @returns string
 * @example
 * ```
 * dateFromNowText(new Date()) => "less than a minute"
 * ```
 */
export const formatDistanceToNowStrict = (
    date: string | number | Date,
    options?: FormatDistanceToNowStrictOptions,
): string => {
    // return formatDistanceToNowStrictBase(date, { ...options, locale: [window.__localeId__] });
    return "";
};
