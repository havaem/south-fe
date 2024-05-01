import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
type Messages = typeof en & typeof vi;

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages {}
}
