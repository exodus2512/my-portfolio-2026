"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import profilePicture from "@/data/profile_picture.jpg";

const ease = [0.16, 1, 0.3, 1];

export function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked parallax + scale on the photo
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="relative w-full py-48 md:py-60 max-w-6xl mx-auto px-8 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* ── Ambient Top-Left Subtle Glow ── */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none z-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 167, 90, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="flex flex-col md:flex-row items-start gap-16 md:gap-0 relative z-10">
        {/* ── Left: Portrait Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          style={{ y: parallaxY, rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col shrink-0 w-full md:w-[320px]"
        >
          <div className="w-full aspect-[4/5] glass-card rounded-[24px] overflow-hidden">
            <div className="w-full h-full overflow-hidden">
              <motion.img
                style={{ scale }}
                src={profilePicture.src}
                alt="Joshua Moses"
                className="w-full h-full object-cover origin-center"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9CA3AF]">
            <span>JM — 2026</span>
            <span>Chennai, IN</span>
          </div>
        </motion.div>

        {/* ── Center: Thin Vertical Rule ── */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="hidden md:block w-px self-stretch origin-top mx-16 lg:mx-24"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--color-border) 20%, var(--color-border) 80%, transparent 100%)",
          }}
        />

        {/* ── Right: Identity Typography ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 pt-2 md:pt-8">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground mb-10"
          >
            I build for
            <br />
            what&apos;s next.
          </motion.h2>

          {/* First Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="text-lg md:text-xl text-secondary leading-relaxed font-normal max-w-2xl mb-8"
          >
            As a Backend Engineer and Design Architect, I build the invisible foundations that power modern products. From system architecture and cloud infrastructure to backend services and developer platforms, I design with longevity in mind. Every decision is guided by ownership, intentional trade-offs, and the belief that great architecture should help products evolve, not hold them back.
          </motion.p>

          {/* Second Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="text-lg md:text-xl text-muted leading-relaxed font-normal max-w-2xl"
          >
            I believe great engineering isn&apos;t measured by the amount of code written, but by the quality of the foundations that empower teams to build, iterate, and scale with confidence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
