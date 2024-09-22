"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@/lib/locale";
import { Locale } from "@/i18n/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

const languages: { label: string; value: Locale }[] = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];

export default function LanguageSelector() {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  async function onChange(value: Locale) {
    startTransition(() => {
      setUserLocale(value);
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={onChange}
      defaultValue={locale}
    >
      <SelectTrigger className={cn("w-[100px]", isPending && "opacity-0")}>
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
