"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { name: "Profile", href: "#profile" },
  { name: "Stack", href: "#tech-stack" },
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300",
        isScrolled ? "pt-4" : "pt-8"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-8 px-6 py-3 rounded-full border border-white/10 transition-all duration-300",
          isScrolled ? "glass shadow-xl scale-95" : "bg-transparent"
        )}
      >
        <Link href="/" className="text-xl font-bold font-outfit tracking-tighter">
          PORTFOLIO<span className="text-white/90">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button className="px-5 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
          Let's Talk
        </button>
      </div>
    </motion.nav>
  );
}
