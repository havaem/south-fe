import en from "../../public/locales/en/translation.json";
import vi from "../../public/locales/vi/translation.json";
type Lang = typeof en & typeof vi;

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: {
            translation: Lang;
        };
    }
}
