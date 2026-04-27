"use client";
import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
