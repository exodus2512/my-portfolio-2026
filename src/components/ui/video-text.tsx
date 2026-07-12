"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoTextProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

/**
 * VideoText — masks a looping video through text characters.
 * Technique: position video absolutely over text that has
 * mix-blend-mode: multiply so only the bright parts (white text) show the video.
 * The dark card background acts as the mask.
 */
export function VideoText({
  src,
  children,
  className,
  fontSize = "clamp(4rem, 12vw, 9rem)",
  fontWeight = 900,
}: VideoTextProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[#0a0a0c]",
        className
      )}
    >
      {/* Text layer — white, so video bleeds through via multiply */}
      <span
        className="relative z-10 select-none"
        style={{
          fontSize,
          fontWeight,
          fontFamily: "var(--font-outfit), sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "white",
          mixBlendMode: "multiply",
        }}
      >
        {children}
      </span>

      {/* Video layer underneath — lighten blend so it shows through text */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
        style={{ mixBlendMode: "screen", opacity: 0.85 }}
      />
    </div>
  );
}
