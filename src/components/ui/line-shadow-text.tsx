"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LineShadowTextProps {
  children: React.ReactNode;
  className?: string;
  shadowColor?: string;
}

export function LineShadowText({
  children,
  className,
  shadowColor = "white",
}: LineShadowTextProps) {
  return (
    <span
      style={
        {
          "--shadow-color": shadowColor,
        } as React.CSSProperties
      }
      className={cn("line-shadow-text", className)}
    >
      {children}
    </span>
  );
}
