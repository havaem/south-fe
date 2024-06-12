import { SelectTriggerProps } from "@radix-ui/react-select";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ELocale } from "@/constants";
import { cn } from "@/utils";
const LanguageSelect = forwardRef<HTMLButtonElement, SelectTriggerProps>(function LanguageSelect(
    { className, ...props },
    ref,
) {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (lang: ELocale) => {
        i18n.changeLanguage(lang);
    };

    return (
        <Select value={i18n.language} onValueChange={handleChangeLanguage}>
            <SelectTrigger className={cn("ml-auto w-fit", className)} {...props} ref={ref}>
                <SelectValue placeholder="lang" />
            </SelectTrigger>
            <SelectContent align="end">
                {Object.entries(ELocale).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                        {value.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
});

export default LanguageSelect;
