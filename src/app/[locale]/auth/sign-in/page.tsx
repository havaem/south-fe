"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Link } from "@/app/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APP_PATH } from "@/constants";

import { useSignIn } from "../../../../hooks";
import { signInSchema } from "./schema";

const SignIn = () => {
    const formCommon = useTranslations("formCommon");
    const t = useTranslations("signIn");

    const { mutate, isPending } = useSignIn();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
        },
    });

    function handleSubmit(values: z.infer<typeof signInSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
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
                                    <FormLabel>{t("password")}</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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
                        {t("signUp")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
export default SignIn;
