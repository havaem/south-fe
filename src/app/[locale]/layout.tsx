import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter as FontSans } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Compose } from "@/components/compose";
import { locales } from "@/configs";
import { GoogleProvider, QueryProviders, RootStoreProvider } from "@/providers";
import { cn } from "@/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, "children">) {
    // const t = await getTranslations({ locale, namespace: "LocaleLayout" });

    return {
        // title: t("title"),
        title: "South",
        description: "South",
    };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    return (
        <html className="h-full" lang={locale}>
            <Script async src="https://accounts.google.com/gsi/client" />
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <Compose providers={[QueryProviders, RootStoreProvider, GoogleProvider]}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </Compose>
            </body>
        </html>
    );
}
