"use client";

import React from "react";
import { motion } from "framer-motion";

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

export function LookingAheadSection() {
  return (
    <section
      id="looking-ahead"
      className="w-full min-h-[80vh] flex items-center justify-center py-48 md:py-64 bg-background border-t border-border"
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
          className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A] mb-8 block"
        >
          CHAPTER 09
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight max-w-3xl mb-8"
        >
          Looking Ahead
        </motion.h2>

        {/* Body Text */}
        <motion.p
          variants={itemVariants}
          className="text-[20px] text-secondary leading-relaxed max-w-2xl font-normal"
        >
          I&apos;m drawn to engineering challenges that demand both technical depth and product thinking. Whether it&apos;s designing scalable backend systems, architecting cloud-native platforms, or improving developer experience through automation, I want to build software that creates lasting value—not just ship features.
        </motion.p>
      </motion.div>
    </section>
  );
}
