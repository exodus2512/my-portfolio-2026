"use client";

import React, { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Hero } from "@/components/home/Hero";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { PrinciplesSection } from "@/components/sections/Principles";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ReflectionSection } from "@/components/sections/Reflection";
import { LookingAheadSection } from "@/components/sections/LookingAhead";
import { ResumeContactSection } from "@/components/sections/ResumeContactSection";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  const lenis = useLenis();
  const [loading, setLoading] = useState(true);

  // Lock scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
      lenis?.resize();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, lenis]);

  // Force Lenis to recalculate height on mount to prevent cached scroll clipping
  useEffect(() => {
    if (!lenis || loading) return;
    
    // Resize immediately
    lenis.resize();

    // Resize after brief delays to capture delayed image / layout shifts
    const timers = [
      setTimeout(() => lenis.resize(), 100),
      setTimeout(() => lenis.resize(), 500),
      setTimeout(() => lenis.resize(), 1500),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [lenis]);

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <Hero />
      
      {/* Full-Width Scrolling Sections */}
      <div className="w-full flex flex-col items-center">
        <ProfileSection />
        <PrinciplesSection />
        <TechStackSection />
        <JourneySection />
        <ProjectsSection />
        <ReflectionSection />
        <LookingAheadSection />
        <ResumeContactSection />
      </div>

      <footer className="py-12 border-t border-white/5 bg-black text-center text-white text-sm">
        <p>&copy; {new Date().getFullYear()} Joshua Moses. All rights reserved.</p>
        <p className="mt-2 text-white/90 text-xs">
          Built with Next.js · Framer Motion · Tailwind CSS · Deployed on Vercel
        </p>
      </footer>
    </main>
  );
}
