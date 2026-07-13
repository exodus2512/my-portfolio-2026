"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StickyScrollContent {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollRevealProps {
  content: StickyScrollContent[];
  className?: string;
}

export function StickyScrollReveal({ content, className }: StickyScrollRevealProps) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveCard(idx);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  const backgroundColors = [
    "from-amber-500/20 to-orange-500/20",
    "from-orange-500/20 to-amber-600/20",
    "from-amber-500/20 to-yellow-500/20",
    "from-zinc-700/20 to-amber-500/20",
  ];

  return (
    <div ref={ref} className={cn("relative flex gap-10", className)}>
      {/* Left: Scrollable text */}
      <div className="flex-1 relative">
        {content.map((item, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="mb-24 last:mb-0"
          >
            <h3
              className={cn(
                "text-xl font-bold font-outfit mb-3 transition-colors duration-300",
                activeCard === index ? "text-white" : "text-white"
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "text-sm leading-relaxed transition-colors duration-300",
                activeCard === index ? "text-white" : "text-white/90"
              )}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Right: Sticky visual panel */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8">
          <div
            className={cn(
              "h-52 w-full rounded-2xl bg-gradient-to-br border border-white/10 overflow-hidden transition-all duration-700",
              backgroundColors[activeCard % backgroundColors.length]
            )}
          >
            {content[activeCard]?.content ?? (
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl font-bold font-outfit text-white/90">
                  {activeCard + 1 < 10 ? `0${activeCard + 1}` : activeCard + 1}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
