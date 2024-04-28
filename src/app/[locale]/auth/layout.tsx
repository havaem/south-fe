import { NextIntlClientProvider, useMessages } from "next-intl";
import { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={{
                formCommon: messages.formCommon,
                signIn: messages.signIn,
            }}
        >
            <div className="min-h-screen px-2 py-4 flex-center">{children}</div>
        </NextIntlClientProvider>
    );
};
export default AuthLayout;
