import Link from "next/link";
import { useTranslations } from "next-intl";
import DynamicThemeToggle from "./theme-toggle";
import ConfigModal from "./config-modal";
import LanguageSelector from "./language-select";
import { Cigarette } from "lucide-react";

function Header() {
  const t = useTranslations("Common");

  return (
    <header className="flex justify-between items-center p-4 bg-background border-b border-border">
      <Link
        href="/"
        className="flex items-center space-x-2 text-2xl font-bold hover:text-primary transition-colors"
      >
        <Cigarette className="w-6 h-6" />
        <span>{t("title")}</span>
      </Link>
      <div className="flex space-x-2">
        <DynamicThemeToggle />
        <LanguageSelector />
        <ConfigModal />
      </div>
    </header>
  );
}

export default Header;
