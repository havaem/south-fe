import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "connect-src",
                        value: "https://accounts.google.com/gsi/",
                    },
                    {
                        key: "frame-src",
                        value: "https://accounts.google.com/gsi/",
                    },
                    {
                        key: "script-src",
                        value: "https://accounts.google.com/gsi/client",
                    },
                    {
                        key: "style-src",
                        value: "https://accounts.google.com/gsi/style",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
