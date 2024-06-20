import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APP_PATH } from "@/constants";
import { useAuthSignIn } from "@/hooks";
import { useAuthLoginWithGoogle } from "@/hooks/queries/useAuthLoginGoogle";
import { useAuthStore } from "@/stores";
import { combineLoading } from "@/utils";

import { signInSchema } from "./schema";

const SignInPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["translation", "zod"]);

    const { mutateAsync: mutateAuthSignIn, isPending: isPendingAuthSignIn } = useAuthSignIn();
    const { mutateAsync: mutateAsyncAuthLoginWithGoogle, isPending: isPendingAuthLoginWithGoogle } =
        useAuthLoginWithGoogle();
    const isLoading = combineLoading(isPendingAuthSignIn, isPendingAuthLoginWithGoogle);

    const { logIn: login } = useAuthStore();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    const googleLogin = useGoogleLogin({
        onSuccess: ({ access_token }) => {
            mutateAsyncAuthLoginWithGoogle({
                token: access_token,
            }).then(({ data }) => {
                login(data);
                // navigate to home
                navigate(APP_PATH.HOME);
            });
        },
    });

    function handleSubmit(values: z.infer<typeof signInSchema>) {
        mutateAuthSignIn(values).then(({ data }) => {
            login(data);
            // navigate to home
            navigate(APP_PATH.HOME);
        });
    }
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle>{t("form.signIn")}</CardTitle>
                <CardDescription>{t("signIn.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("signIn.username")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example" {...field} />
                                    </FormControl>
                                    <FormMessage i18Fn={t} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.password")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage i18Fn={t} />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" loading={isLoading} type="submit">
                            {t("signIn.login")}
                        </Button>
                    </form>
                </Form>
                <Button className="mt-4 w-full" loading={isLoading} variant="outline" onClick={() => googleLogin()}>
                    {t("form.login_with_google")}
                </Button>

                <div className="mt-4 text-center text-sm">
                    {t("signIn.no_account")}{" "}
                    <Link className="underline" to={APP_PATH.AUTH.SIGN_UP}>
                        {t("form.signUp")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignInPage;
