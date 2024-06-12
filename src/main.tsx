import "./i18n";
import "./index.css";

import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Compose } from "./components/compose.tsx";
import Loading from "./components/loading.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { GoogleProvider } from "./providers/google.tsx";
import { QueryProvider } from "./providers/index.tsx";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
        <Compose providers={[GoogleProvider, QueryProvider]}>
            <RouterProvider router={router} />
            <Toaster />
        </Compose>
    </Suspense>,
);
