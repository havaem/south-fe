import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { APP_PATH } from "@/constants";
import { useAuthStore } from "@/stores";

import Dashboard from "./dashboard";

function HomePage() {
    const navigate = useNavigate();
    const { isLogin } = useAuthStore();

    if (!isLogin)
        return (
            <div>
                <h1>Welcome to the Home Page!</h1>
                <p>This is a simple page.</p>
                <div className="mt-2 flex gap-2">
                    <Button onClick={() => navigate(APP_PATH.AUTH.SIGN_IN)}>Sign In</Button>
                    <Button onClick={() => navigate(APP_PATH.AUTH.SIGN_UP)}>Sign Up</Button>
                </div>
            </div>
        );
    return <Dashboard />;
}
export default HomePage;
