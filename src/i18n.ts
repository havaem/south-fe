import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: "en",
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
            // format: (value, format, lang) => {
            //     const formats = (format ?? "").split("-");
            //     let _value = value;
            //     // translate the value first
            //     if (formats?.includes("capitalize")) _value = _value.charAt(0).toUpperCase() + _value.slice(1);
            //     if (formats?.includes("translate"))
            //         _value = i18n.t(_value, {
            //             lng: lang,
            //         });
            //     return _value;
            // },
        },
    });

z.setErrorMap(
    makeZodI18nMap({
        ns: ["zod", "object"],
        handlePath: {
            keyPrefix: "paths",
        },
    }),
);

export { z };
export default i18n;
