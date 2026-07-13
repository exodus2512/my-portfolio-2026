"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════
// PRINCIPLES — Scroll-scrub text reveal (Minimalist Editorial)
//
// Clean typography-driven design with no border boxes, glows, or unnecessary decorations.
// Pinned scroll-scrub sequence using Lenis-safe fixed positioning.
// ═══════════════════════════════════════════════

const ease = [0.16, 1, 0.3, 1] as const;

interface Principle {
  title: string;
  keywords: string;
  aphorism: string;
}

const principles: Principle[] = [
  {
    title: "I build products, not just features.",
    keywords: "IMPACT • PRODUCT THINKING",
    aphorism: "Every feature should move the product forward—not just increase the codebase.",
  },
  {
    title: "I own every system I ship.",
    keywords: "OWNERSHIP • RELIABILITY",
    aphorism: "I design, deploy, monitor, and continuously improve the software I build.",
  },
  {
    title: "I make architecture a competitive advantage.",
    keywords: "ARCHITECTURE • SCALE",
    aphorism: "I build foundations that let products grow faster without accumulating unnecessary complexity.",
  },
  {
    title: "I choose simplicity whenever it scales.",
    keywords: "CLARITY • MAINTAINABILITY",
    aphorism: "Clear systems, intentional trade-offs, and maintainable code outlast clever implementations.",
  },
];

const N = principles.length; // 4

// ─────────────────────────────────────────────
// KeywordBadge Component (Editorial minimal typography)
// ─────────────────────────────────────────────
function KeywordBadge({ text }: { text: string }) {
  return (
    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C8A75A]">
      {text}
    </span>
  );
}

// ─────────────────────────────────────────────
// Single principle slide — the centered content
// ─────────────────────────────────────────────
function PrincipleSlide({ principle, index }: { principle: Principle; index: number }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 max-w-5xl mx-auto w-full py-12">
      {/* Counter */}
      <span className="text-sm text-[#9CA3AF] font-mono tracking-widest mb-8 block font-medium">
        {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
      </span>

      {/* Principle title / heading */}
      <h3 className="text-4xl md:text-[64px] font-bold tracking-tight text-foreground leading-tight mb-8 max-w-4xl">
        {principle.title}
      </h3>

      {/* Keywords (Editorial tag) — placed below the heading */}
      <div className="mb-8">
        <KeywordBadge text={principle.keywords} />
      </div>

      {/* Description / Aphorism */}
      <p className="text-[20px] text-secondary max-w-2xl leading-relaxed mb-0 font-normal">
        {principle.aphorism}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// DESKTOP: Pinned scroll-scrub version
// ─────────────────────────────────────────────
function DesktopPrinciples() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [pinState, setPinState] = useState<"before" | "fixed" | "after">("before");
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const containerTopRef = useRef(0);
  const containerHeightRef = useRef(0);

  const measureContainer = useCallback(() => {
    if (!outerRef.current) return;
    containerTopRef.current =
      outerRef.current.getBoundingClientRect().top + window.scrollY;
    containerHeightRef.current = outerRef.current.offsetHeight;
  }, []);

  const updateFromLenis = useCallback((lenisScroll: number) => {
    const vh = window.innerHeight;
    const containerTop = containerTopRef.current;
    const containerHeight = containerHeightRef.current;
    if (!containerHeight) return;

    const scrolled = lenisScroll - containerTop;
    const scrollable = containerHeight - vh;
    const rawProgress = Math.max(0, Math.min(1, scrolled / scrollable));

    const idx = Math.min(N - 1, Math.floor(rawProgress * N));
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
    setProgress(rawProgress);

    if (lenisScroll < containerTop) {
      setPinState("before");
    } else if (lenisScroll > containerTop + containerHeight - vh) {
      setPinState("after");
    } else {
      setPinState("fixed");
    }
  }, []);

  useLenis((lenis) => {
    updateFromLenis(lenis.scroll);
  });

  useEffect(() => {
    measureContainer();
    const timer = setTimeout(measureContainer, 150);
    window.addEventListener("resize", measureContainer);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureContainer);
    };
  }, [measureContainer]);

  const getPanelStyle = (): React.CSSProperties => {
    if (pinState === "before") {
      return { position: "absolute", top: 0, left: 0, right: 0, bottom: "auto" };
    }
    if (pinState === "after") {
      return { position: "absolute", bottom: 0, left: 0, right: 0, top: "auto" };
    }
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  };

  return (
    <>
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="text-center mb-0 py-48 md:py-64 px-8"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-accent mb-6 block">
          Philosophy
        </span>
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-none">
          How I Build
        </h2>
        <p className="mt-8 text-[20px] text-muted max-w-3xl mx-auto leading-relaxed">
          I believe great engineers own outcomes, not just code. From architecture and implementation to deployment and continuous improvement, I build with the expectation that every decision should make the product easier to scale, operate, and maintain over time.
        </p>
      </motion.div>

      {/* ── Outer wrapper for scroll segments ── */}
      <div
        ref={outerRef}
        className="relative w-full"
        style={{ height: `${N * 100}vh` }}
        aria-hidden="false"
      >
        <ul className="sr-only">
          {principles.map((p, i) => (
            <li key={p.title}>
              <strong>{p.title}</strong> ({p.keywords}): {p.aphorism}
            </li>
          ))}
        </ul>

        {/* ── Pinned panel ── */}
        <div
          style={getPanelStyle()}
          className="w-full h-screen flex flex-col items-center justify-center z-10"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16, scale: 1.02 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              className="w-full flex items-center justify-center"
              aria-label={`${principles[activeIndex].title} - ${principles[activeIndex].keywords}`}
            >
              <PrincipleSlide
                principle={principles[activeIndex]}
                index={activeIndex}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Progress dots ── */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 items-center"
            aria-hidden="true"
          >
            {principles.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-5 h-1.5 bg-accent"
                    : i < activeIndex
                    ? "w-1.5 h-1.5 bg-accent/30"
                    : "w-1.5 h-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// MOBILE: Simple stacked whileInView list
// ─────────────────────────────────────────────
function MobilePrinciples() {
  return (
    <div className="px-6 py-48 border-t border-border">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="mb-16 text-center"
      >
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A] mb-6 block">
          Philosophy
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-none mb-6">
          How I Build
        </h2>
        <p className="mt-5 text-base text-secondary max-w-md mx-auto leading-relaxed font-normal">
          I believe great engineers own outcomes, not just code. From architecture and implementation to deployment and continuous improvement, I build with the expectation that every decision should make the product easier to scale, operate, and maintain over time.
        </p>
      </motion.div>

      {/* Stacked list with whileInView fade */}
      <div className="flex flex-col gap-20">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="border-t border-border pt-10"
          >
            <span className="text-xs text-[#9CA3AF] font-mono tracking-widest block mb-4 font-medium">
              {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <h3 className="text-3xl font-extrabold text-foreground mb-4 leading-snug">
              {p.title}
            </h3>
            <div className="mb-6 flex justify-start">
              <KeywordBadge text={p.keywords} />
            </div>
            <p className="text-base text-secondary leading-relaxed mb-0">{p.aphorism}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXPORTED SECTION
// ─────────────────────────────────────────────
export function PrinciplesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="principles"
      className="w-full border-t border-border"
      style={{ overflow: "visible" }}
    >
      {isMobile ? <MobilePrinciples /> : <DesktopPrinciples />}
    </section>
  );
}
