import enApi from "../../public/locales/en/api.json";
import enTranslation from "../../public/locales/en/translation.json";
import enZod from "../../public/locales/en/zod.json";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            translation: typeof enTranslation;
            zod: typeof enZod;
            api: typeof enApi;
        };
    }
}
