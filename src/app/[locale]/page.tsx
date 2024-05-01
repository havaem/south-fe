import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import HomeSwitch from "./pages/HomeSwitch";

export default async function Index() {
    //* i18
    const messages = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                formCommon: messages.formCommon,
            }}
        >
            <HomeSwitch />
        </NextIntlClientProvider>
    );
}
