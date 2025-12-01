"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * ThemeModeToggle
 * - Compact dropdown button showing current theme (animated)
 * - Accessible, keyboard-friendly
 * - Uses framer-motion for smooth icon transitions
 * - Works with next-themes and avoids SSR mismatch
 * - Tailwind-friendly styling (adjust tokens/classes to match your design)
 */
export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Guard for SSR — don't render the animated icons until client mount
  const current = mounted ? theme || "system" : "system";

  // Small helper to render icon with animation
  function Icon({ mode }: { mode: string }) {
    const variants = {
      hidden: { rotate: -20, scale: 0, opacity: 0 },
      visible: { rotate: 0, scale: 1, opacity: 1 },
    };

    if (mode === "light")
      return (
        <motion.span
          key="sun"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center"
        >
          <Sun className="h-4 w-4" />
        </motion.span>
      );

    if (mode === "dark")
      return (
        <motion.span
          key="moon"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center"
        >
          <Moon className="h-4 w-4" />
        </motion.span>
      );

    return (
      <motion.span
        key="system"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center"
      >
        <Monitor className="h-4 w-4" />
      </motion.span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          title="Toggle theme"
          className="relative flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="sr-only">Theme</span>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.8, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center"
          >
            <Icon mode={current} />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center" 
        side="bottom" 
        sideOffset={6} 
        className="min-w-[8rem] w-auto p-1" 
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
          role="menuitem"
        >
          <Sun className="h-4 w-4" />
          <div className="ml-1">
            <span>Light</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
          role="menuitem"
        >
          <Moon className="h-4 w-4" />
          <div className="ml-1">
            <span>Dark</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
          role="menuitem"
        >
          <Monitor className="h-4 w-4" />
          <div className="ml-1">
            <span>System</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
