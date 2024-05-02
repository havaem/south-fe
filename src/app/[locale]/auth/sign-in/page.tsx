"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APP_PATH, LOCAL_STORAGE_KEY } from "@/constants";
import { selectAuth, useRootStore } from "@/providers";

import { useAuthSignIn } from "../../../../hooks";
import { signInSchema } from "./schema";

const SignIn = () => {
    const router = useRouter();
    const formCommon = useTranslations("formCommon");
    const t = useTranslations("signIn");
    const { mutateAsync, isPending } = useAuthSignIn();

    const { login } = useRootStore(selectAuth);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    function handleSubmit(values: z.infer<typeof signInSchema>) {
        mutateAsync(values).then(({ data }) => {
            const { token, user } = data;
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, token.refreshToken);
            // update user in store
            login(user);
            // redirect to dashboard
            router.push(APP_PATH.HOME);
        });
    }
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle>{formCommon("signIn")}</CardTitle>
                <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("username")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example" {...field} />
                                    </FormControl>
                                    <FormMessage i18Fn={formCommon} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formCommon("password")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage i18Fn={formCommon} />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" loading={isPending} type="submit">
                            {t("login")}
                        </Button>
                    </form>
                </Form>
                <Button className="mt-4 w-full" variant="outline">
                    Login with Google
                </Button>
                <div className="mt-4 text-center text-sm">
                    {t("noAccount")}{" "}
                    <Link className="underline" href={APP_PATH.AUTH.SIGN_UP}>
                        {formCommon("signUp")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignIn;
