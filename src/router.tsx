import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/protected-route";
import DashboardLayout from "./routes/(logined)/layout";
import ProfilePage from "./routes/(logined)/profile";
import AuthLayout from "./routes/auth/layout";
import SignInPage from "./routes/auth/sign-in";
import SignUpPage from "./routes/auth/sign-up";
import HomePage from "./routes/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                ],
            },
        ],
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
]);
