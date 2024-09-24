import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/routes/protected-route";
import HeavenPage from "./routes/(logined)/heaven";
import CharacterBuilder from "./routes/(logined)/heaven/character-builder";
import DashboardLayout from "./routes/(logined)/layout";
import ProfilePage from "./routes/(logined)/profile";
import AuthLayout from "./routes/auth/layout";
import SignInPage from "./routes/auth/sign-in";
import SignUpPage from "./routes/auth/sign-up";
import NotFoundPage from "./routes/errors/NotFound";
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
            {
                path: "heaven",
                children: [
                    { index: true, element: <HeavenPage /> },
                    {
                        path: "character-builder",
                        element: <CharacterBuilder />,
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
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
