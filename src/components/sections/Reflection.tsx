"use client";

import React from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════
// REFLECTION — Single Statement Section
// Rendered immediately before Contact (ResumeContactSection)
// Quiet, minimalist layout with pure typography.
// ═══════════════════════════════════════════════

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ReflectionSection() {
  return (
    <section
      id="reflection"
      className="w-full min-h-[80vh] flex items-center justify-center py-60 bg-[var(--portfolio-bg-deep,#050505)] border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full"
      >
        {/* Eyebrow Label */}
        <motion.span
          variants={itemVariants}
          className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A] font-mono mb-8 block"
        >
          CHAPTER 08
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight max-w-3xl mb-8"
        >
          If I Could Tell<br />Myself One Thing
        </motion.h2>

        {/* Body Text */}
        <motion.p
          variants={itemVariants}
          className="text-[20px] text-secondary leading-relaxed max-w-2xl mb-12 font-normal"
        >
          Stop trying to learn everything.<br />
          Pick the hard problem and stay<br />
          with it longer than feels comfortable.
        </motion.p>

        {/* Closing Line */}
        <motion.span
          variants={itemVariants}
          className="text-base md:text-[20px] text-[#C8A75A] font-medium max-w-xl block"
        >
          That&apos;s where the actual skill lives.
        </motion.span>
      </motion.div>
    </section>
  );
}
