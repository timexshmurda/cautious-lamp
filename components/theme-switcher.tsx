"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
