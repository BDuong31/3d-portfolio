"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/10 dark:bg-black/10 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all duration-300 ease-in-out font-mono font-medium text-xs text-slate-800 dark:text-zinc-300",
        className
      )}
      onClick={() => setLanguage(language === "en" ? "vi" : "en")}
      title={language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
    >
      <span className="relative z-10 transition-transform duration-300 active:scale-95">
        {language === "en" ? "EN" : "VI"}
      </span>
    </Button>
  );
}
