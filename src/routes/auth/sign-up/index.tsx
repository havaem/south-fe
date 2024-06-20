import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APP_PATH } from "@/constants";
import { useAuthSignUp } from "@/hooks";
import { useAuthLoginWithGoogle } from "@/hooks/queries/useAuthLoginGoogle";
import { useAuthStore } from "@/stores";
import { combineLoading } from "@/utils";

import { signUpSchema } from "./schema";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["translation", "zod"]);
    const { mutateAsync: mutateAsyncAuthSignUp, isPending: isPendingAuthSignUp } = useAuthSignUp();
    const { mutateAsync: mutateAsyncAuthLoginWithGoogle, isPending: isPendingAuthLoginWithGoogle } =
        useAuthLoginWithGoogle();
    const isLoading = combineLoading(isPendingAuthSignUp, isPendingAuthLoginWithGoogle);

    const { logIn: login } = useAuthStore();

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

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: {
                first: "",
                last: "",
            },
            email: "",
            password: "",
        },
    });

    function handleSubmit(values: z.infer<typeof signUpSchema>) {
        mutateAsyncAuthSignUp(values).then(({ data }) => {
            login(data);
            // navigate to home
            navigate(APP_PATH.HOME);
        });
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">{t("form.signUp")}</CardTitle>
                <CardDescription>{t("signUp.description")} </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" id="sign-up" onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name.first"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("signUp.firstName")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nam" {...field} />
                                        </FormControl>
                                        <FormMessage i18Fn={t} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name.last"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("signUp.lastName")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Vo" {...field} />
                                        </FormControl>
                                        <FormMessage i18Fn={t} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
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
                                    <FormDescription>{t("form.password_description")}</FormDescription>
                                    <FormMessage i18Fn={t} />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div className="mt-8 space-y-4">
                    <Button className="w-full" form="sign-up" loading={isLoading} type="submit">
                        {t("signUp.create_an_account")}
                    </Button>

                    <Button className="mt-2 w-full" loading={isLoading} variant="outline" onClick={() => googleLogin()}>
                        {t("form.login_with_google")}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        {t("signUp.already_have_an_account")}{" "}
                        <Link className="underline" to={APP_PATH.AUTH.SIGN_IN}>
                            {t("form.signIn")}
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignUpPage;
