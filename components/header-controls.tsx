"use client";

import ConfigDialog from "./config-dialog";

import LanguageSelector from "./language-select";
import DynamicThemeToggle from "./theme-toggle";

export default function HeaderControls() {
  return (
    <div className="flex flex-col items-end md:flex-row md:items-center md:space-y-0 md:space-x-2">
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        <DynamicThemeToggle />
        <ConfigDialog />
      </div>
    </div>
  );
}
