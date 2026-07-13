"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  children: React.ReactNode;
  titleComponent?: React.ReactNode;
  className?: string;
}

export function ContainerScroll({ children, titleComponent, className }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll delta using spring physics to eliminate wheel/touch jank
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const scaleDimensions = useTransform(
    smoothProgress,
    [0, 0.5],
    isMobile ? [0.9, 1] : [0.8, 1]
  );
  const rotate = useTransform(
    smoothProgress,
    [0, 0.5],
    isMobile ? [14, 0] : [28, 0]
  );
  const translateY = useTransform(
    smoothProgress,
    [0, 0.5],
    isMobile ? [-50, 0] : [-150, 0]
  );
  const opacity = useTransform(smoothProgress, [0, 0.25], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center overflow-hidden", className)}
    >
      {titleComponent && (
        <div className="mb-6 text-center relative z-10">{titleComponent}</div>
      )}

      <motion.div
        style={{
          rotateX: rotate,
          scale: scaleDimensions,
          translateY,
          opacity,
          transformPerspective: 1000,
          willChange: "transform, opacity",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
        className="w-full relative"
      >
        {/* Browser chrome frame */}
        <div className="rounded-[16px] border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-950">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-4 flex-1 h-6 rounded-full bg-white/5 border border-white/10 flex items-center px-3">
              <span className="text-[10px] text-white truncate">https://project.vercel.app</span>
            </div>
          </div>
          {/* Content */}
          <div className="overflow-hidden">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
