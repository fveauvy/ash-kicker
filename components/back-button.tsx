import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BackButton() {
  const t = useTranslations("Common");

  return (
    <Link href="/">
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToHome")}
      </Button>
    </Link>
  );
}
