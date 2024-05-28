import { Label } from "@radix-ui/react-label";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_PATH } from "@/constants";

const SignUpPage = () => {
    const { t } = useTranslation();

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">{t("formCommon.signUp")}</CardTitle>
                <CardDescription>{t("signUp.description")} </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">{t("signUp.firstName")}</Label>
                            <Input required id="first-name" placeholder="Nam" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">{t("signUp.lastName")}</Label>
                            <Input required id="last-name" placeholder="Vo Hoai" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input required id="email" placeholder="m@example.com" type="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">{t("formCommon.password")}</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                        {t("signUp.createAnAccount")}
                    </Button>
                    <Button className="w-full" variant="outline">
                        Sign up with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    {t("signUp.alreadyHaveAnAccount")}{" "}
                    <Link className="underline" to={APP_PATH.AUTH.SIGN_IN}>
                        {t("formCommon.signIn")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignUpPage;
