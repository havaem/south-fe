"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_PATH } from "@/constants";

const SignUp = () => {
    const formCommon = useTranslations("formCommon");
    const t = useTranslations("signUp");

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">{formCommon("signUp")}</CardTitle>
                <CardDescription>{t("description")} </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">{t("firstName")}</Label>
                            <Input required id="first-name" placeholder="Nam" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">{t("lastName")}</Label>
                            <Input required id="last-name" placeholder="Vo Hoai" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input required id="email" placeholder="m@example.com" type="email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">{formCommon("password")}</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                        {t("createAnAccount")}
                    </Button>
                    <Button className="w-full" variant="outline">
                        Sign up with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    {t("alreadyHaveAnAccount")}{" "}
                    <Link className="underline" href={APP_PATH.AUTH.SIGN_IN}>
                        {formCommon("signIn")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignUp;
