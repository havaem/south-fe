import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { APP_PATH } from "@/constants";

const Home = () => {
    //* i18n
    const t = useTranslations("formCommon");

    return (
        <div className="mx-auto mt-8 flex max-w-32 flex-col justify-stretch gap-4">
            <Button>
                <Link href={APP_PATH.AUTH.SIGN_IN}>{t("signIn")}</Link>
            </Button>
            <Button>
                <Link href={APP_PATH.AUTH.SIGN_UP}>{t("signUp")}</Link>
            </Button>
        </div>
    );
};
export default Home;
