import { GoogleOAuthProvider } from "@react-oauth/google";
import { PropsWithChildren } from "react";

import { ENV } from "@/configs";

export const GoogleProvider = ({ children }: PropsWithChildren) => {
    return <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
};
