import createMiddleware from "next-intl/middleware";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { defaultLocale, localePrefix, locales } from "@/configs";

export default createMiddleware({
    defaultLocale,
    localePrefix,
    locales,
});
// export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix });
