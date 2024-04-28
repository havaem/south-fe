import { Pathnames } from "next-intl/navigation";

import { APP_PATH } from "@/constants";

export const defaultLocale = "en";
export const locales = ["en", "vi"] as const;

export const pathnames = {
    "/": "/",
    ...Object.entries(APP_PATH).reduce(
        (acc: Record<string, string>, [key, value]) => {
            if (typeof value === "object") {
                Object.entries(value).forEach(([k, v]) => {
                    acc[k] = v;
                });
                return acc;
            }

            acc[key] = value;
            return acc;
        },
        {} as Record<string, string>,
    ),
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
