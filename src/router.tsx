import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./routes/auth/layout";
import SignInPage from "./routes/auth/sign-in";
import SignUpPage from "./routes/auth/sign-up";
import HomePage from "./routes/home";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "sign-in",
                        element: <SignInPage />,
                    },
                    {
                        path: "sign-up",
                        element: <SignUpPage />,
                    },
                ],
            },
        ],
    },
]);
