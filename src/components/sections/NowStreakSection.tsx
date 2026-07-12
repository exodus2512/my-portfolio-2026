"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Target, Clock } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 15,
  });
  
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function NowStreakSection() {
  return (
    <section className="w-full py-24 sm:py-32 md:py-48 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400 mb-6 block">
          Current Status
        </span>
      </motion.div>

      <div className="flex flex-col gap-12">
        {/* Item 1: Building */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 pb-12 border-b border-white/10"
        >
          <div className="flex items-center gap-4 w-48 shrink-0 text-zinc-500">
            <Target size={24} />
            <span className="uppercase tracking-widest text-sm font-semibold">Building</span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-white mb-2">
              Cloud-native Microservices Platform
            </h3>
            <p className="text-lg text-zinc-400">AWS ECS + Next.js Frontend Orchestration</p>
          </div>
        </motion.div>

        {/* Item 2: Streak */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 pb-12 border-b border-white/10"
        >
          <div className="flex items-center gap-4 w-48 shrink-0 text-zinc-500">
            <span className="text-2xl">🔥</span>
            <span className="uppercase tracking-widest text-sm font-semibold">Streak</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl md:text-8xl font-bold font-outfit text-amber-500 tabular-nums">
              <AnimatedNumber value={12} />
            </span>
            <span className="text-xl sm:text-2xl text-zinc-400 font-medium">days on LeetCode</span>
          </div>
        </motion.div>

        {/* Item 3: Open To */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16"
        >
          <div className="flex items-center gap-4 w-48 shrink-0 text-zinc-500">
            <Clock size={24} />
            <span className="uppercase tracking-widest text-sm font-semibold">Open To</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {["SDE Internships", "Cloud Roles", "Open Source Collaboration"].map((tag) => (
              <span key={tag} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 text-white/80 text-sm sm:text-lg">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
