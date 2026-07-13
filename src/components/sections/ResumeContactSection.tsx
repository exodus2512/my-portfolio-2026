"use client";

import React from "react";
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconFileText,
  IconCode,
} from "@tabler/icons-react";

const socialLinks = [
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-foreground" />,
    href: "https://github.com/exodus2512",
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="h-full w-full text-[#C8A75A]" />,
    href: "https://www.linkedin.com/in/joshuamoses7/",
  },
  {
    title: "Instagram",
    icon: <IconBrandInstagram className="h-full w-full text-foreground" />,
    href: "https://www.instagram.com/_.xo.exodus._/",
  },
  {
    title: "LeetCode",
    icon: <IconCode className="h-full w-full text-[#C8A75A]" />,
    href: "https://leetcode.com/u/joshua_moses/",
  },
  {
    title: "Gmail",
    icon: <IconMail className="h-full w-full text-foreground" />,
    href: "mailto:joshuamoses2512@gmail.com",
  },
  {
    title: "Resume",
    icon: <IconFileText className="h-full w-full text-[#C8A75A]" />,
    href: "/socials/temp_resumeUPDATED.pdf",
  },
];

export function ResumeContactSection() {
  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[100dvh] pt-24 pb-24 max-w-6xl mx-auto px-8 border-t border-border flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient Centered Champagne Glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 167, 90, 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
        {/* Quote/Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight mb-10"
        >
          You Bring the Vision.
          <br />
          <span className="text-secondary">I&apos;ll Build the System</span>
        </motion.h2>

        {/* Email Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-16"
        >
          <a
            href="mailto:joshuamoses2512@gmail.com"
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary hover:text-foreground border-b border-secondary/35 hover:border-foreground transition-all duration-300 pb-1"
          >
            joshuamoses2512@gmail.com
          </a>
        </motion.div>

        {/* Floating Dock (Kept exactly as requested with same effect) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex justify-center w-full mb-16"
        >
          <FloatingDock items={socialLinks} />
        </motion.div>

      </div>
    </section>
  );
}
