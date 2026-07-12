"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const animTimer = setTimeout(() => {
      setAnimatingOut(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const brandColor = "#1A1712";

  // Staggered columns animations (faster, tighter stagger with more columns)
  const columnVariants = {
    initial: { y: "0%" },
    animate: (i: number) => ({
      y: "100%",
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.03,
      },
    }),
  };

  const text = "EXODUS";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 w-full h-full flex pointer-events-auto">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={columnVariants}
            initial="initial"
            animate={animatingOut ? "animate" : "initial"}
            className="h-full flex-1"
            style={{ backgroundColor: brandColor }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ y: "0%" }}
        animate={animatingOut ? { y: "100vh" } : { y: "0%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="flex overflow-hidden leading-none px-2 py-1">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.06,
              }}
              className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] uppercase font-sans inline-block leading-none"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
