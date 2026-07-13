"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import timeline1 from "@/data/timeline_1.jpg";
import timeline2 from "@/data/timeline_2..jpg";
import timeline3 from "@/data/timeline_3.jpg";
import timeline4 from "@/data/timeline_4.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

interface Milestone {
  year: string;
  title: string;
  description: string;
  milestonesList: string[];
}

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "The Spark",
    description:
      "My engineering journey began with a simple curiosity: understanding how software actually works. That curiosity quickly became an obsession with building. I immersed myself in programming fundamentals, explored backend development, and started creating projects that transformed ideas into working systems. Every bug became a lesson, and every project reinforced the habit of learning by building.",
    milestonesList: [
      "Began software development journey",
      "Built first full-stack and backend projects",
      "Developed strong programming fundamentals",
    ],
  },
  {
    year: "2024",
    title: "Learning by Building",
    description:
      "Cloud computing became the turning point in my journey. Joining the AWS Student Builder Group introduced me to distributed systems, serverless architecture, and production-focused engineering. After earning my AWS Cloud Practitioner certification, I shifted from being a learner to an active contributor—conducting workshops, mentoring students, and helping grow one of the college's largest cloud communities. Winning Hack-a-Cloud with MicroOps, a no-code DevOps automation platform, reinforced my passion for solving real engineering problems through scalable cloud solutions.",
    milestonesList: [
      "AWS Certified Cloud Practitioner (CLF-C02)",
      "Backend Developer Intern",
      "AWS Student Builder Group Lead",
      "Winner — Hack-a-Cloud 2024 (MicroOps)",
    ],
  },
  {
    year: "2025",
    title: "The Architect",
    description:
      "This year transformed me from an engineer into a technical leader. I led the development of Nephele 3.0, a cloud-integrated AI robotic system showcased at AWS Student Community Day, while coordinating cross-functional teams over several months. Alongside organizing national hackathons and technical events, I deepened my expertise in backend engineering, cloud infrastructure, and AI systems through real-world projects and research. Building production-ready systems became just as important as building strong engineering communities.",
    milestonesList: [
      "AI & Edge Robotics Engineer",
      "Led Nephele 3.0 development",
      "Organized Nephele 3.0 National Hackathon",
      "Coordinated AWS Student Community Day",
      "Speaker & Workshop Host",
      "Project Showcase — AWS SheTech Day",
    ],
  },
  {
    year: "2026",
    title: "The Next Horizon",
    description:
      "Today, my focus is backend engineering, cloud architecture, and distributed systems. I design reliable APIs, scalable cloud infrastructure, and event-driven platforms with a product-first mindset. My goal is no longer just to ship software—it's to build systems that remain simple, resilient, and maintainable as products evolve. Every project is an opportunity to combine engineering excellence with long-term ownership.",
    milestonesList: [
      "Runner-up — AI Ascend National Hackathon (Kyndryl)",
      "Built production-grade AI & cloud platforms",
      "Preparing for advanced system design and cloud architecture roles",
    ],
  },
];

const placeholderImages = [
  timeline1.src,
  timeline2.src,
  timeline3.src,
  timeline4.src,
];

function TimelineItem({
  milestone,
  index,
  isActive,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.35,
        y: isActive ? 0 : 15,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="grid grid-cols-[80px_1px_1fr] md:grid-cols-[120px_1px_1fr] gap-6 md:gap-10 items-start timeline-item"
    >
      {/* Left: Year + Index */}
      <div className="flex flex-col items-end pt-1">
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300",
            isActive ? "text-accent" : "text-muted"
          )}
        >
          {milestone.year}
        </span>
        <span
          className={cn(
            "text-3xl md:text-4xl font-black leading-none mt-1 transition-colors duration-300",
            isActive ? "text-foreground opacity-30" : "text-foreground opacity-10"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Center: Vertical line segment with dot */}
      <div className="relative flex flex-col items-center min-h-[180px] md:min-h-[220px]">
        <motion.div
          animate={{
            borderColor: isActive ? "#C8A75A" : "#272727",
            backgroundColor: isActive ? "#C8A75A" : "#050505",
            scale: isActive ? 1.25 : 1,
            boxShadow: isActive ? "0 0 12px rgba(200,167,90,0.6)" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="w-2.5 h-2.5 rounded-full border-2 z-10 mt-1.5"
        />
        <div className="w-px flex-1 bg-border mt-1" />
      </div>

      {/* Right: Content */}
      <div className="pb-24 md:pb-36 pr-4">
        <h3
          className={cn(
            "text-2xl md:text-3xl font-bold leading-tight mb-4 transition-colors duration-300",
            isActive ? "text-foreground" : "text-secondary"
          )}
        >
          {milestone.title}
        </h3>
        <p
          className={cn(
            "text-base md:text-[20px] leading-relaxed max-w-lg transition-colors duration-300 mb-6",
            isActive ? "text-secondary" : "text-muted"
          )}
        >
          {milestone.description}
        </p>

        {milestone.milestonesList && milestone.milestonesList.length > 0 && (
          <div className="mt-6">
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.25em] block mb-3 transition-colors duration-300",
                isActive ? "text-accent" : "text-muted"
              )}
            >
              Key Milestones
            </span>
            <ul className="space-y-2.5">
              {milestone.milestonesList.map((item, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "flex items-start gap-2.5 text-sm transition-colors duration-300 leading-relaxed",
                    isActive ? "text-secondary" : "text-muted"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [pinState, setPinState] = useState<"before" | "fixed" | "after">("before");
  const [dimensions, setDimensions] = useState({ left: 0, width: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const updatePositions = () => {
    if (!containerRef.current || !trackRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const trackRect = trackRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const panelHeight = 420; // height of the sticky image panel

    // Center of viewport offset for the panel
    const stickyTopOffset = (viewportHeight - panelHeight) / 2;

    // Determine pinning state based on track position relative to sticky zone
    if (trackRect.top > stickyTopOffset) {
      setPinState("before");
    } else if (trackRect.bottom < stickyTopOffset + panelHeight) {
      setPinState("after");
    } else {
      setPinState("fixed");
      setDimensions({
        left: trackRect.left,
        width: trackRect.width,
      });
    }

    // Determine active index based on milestone midpoint crossing 50% viewport height
    const entries = containerRef.current.querySelectorAll(".timeline-item");
    const viewportCenter = viewportHeight / 2;
    let minDistance = Infinity;
    let computedActiveIndex = 0;

    entries.forEach((entryEl, index) => {
      const rect = entryEl.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const distance = Math.abs(midpoint - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        computedActiveIndex = index;
      }
    });

    setActiveIndex((prev) => (prev !== computedActiveIndex ? computedActiveIndex : prev));
  };

  // Sync with Lenis scroll event
  useLenis(() => {
    updatePositions();
  });

  // Also bind standard scroll and resize events for reliability
  useEffect(() => {
    updatePositions();
    
    // Quick timeout to ensure initial layout is painted and bounding rects are correct
    const timer = setTimeout(updatePositions, 100);

    window.addEventListener("scroll", updatePositions, { passive: true });
    window.addEventListener("resize", updatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate CSS styles for the panel based on pin state
  const getPanelStyle = (): React.CSSProperties => {
    if (pinState === "before") {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        transform: "none",
      };
    }
    if (pinState === "after") {
      return {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: "auto",
        transform: "none",
      };
    }
    // Fixed state
    return {
      position: "fixed",
      top: "50vh",
      left: `${dimensions.left}px`,
      width: `${dimensions.width}px`,
      transform: "translateY(-50%)",
    };
  };

  return (
    <section
      id="journey"
      className="relative w-full py-48 md:py-60 max-w-6xl mx-auto px-8 border-t border-border overflow-hidden"
    >
      {/* Ambient Center Vertical Glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[800px] pointer-events-none z-0 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(200, 167, 90, 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="mb-24 md:mb-32 relative z-10"
      >
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A] mb-6 block">
          Timeline
        </span>
        <h2 className="text-4xl md:text-[64px] font-bold tracking-tight text-foreground leading-[0.9]">
          Origins
        </h2>
      </motion.div>

      {/* Main Layout Wrapper */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20"
      >
        {/* Left Column: Scrollable Timeline Items */}
        <div className="relative">
          {/* Scroll progress line overlay (fills the center column) */}
          <div className="absolute left-[104px] md:left-[160px] top-0 bottom-0 w-px overflow-hidden pointer-events-none">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-gradient-to-b from-accent/60 to-accent/20 origin-top"
            />
          </div>

          {/* Milestone Items */}
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={index}
              milestone={milestone}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>

        {/* Right Column: Sticky Track */}
        <div ref={trackRef} className="hidden lg:block relative h-full w-full z-20">
          {/* Sticky Panel controlled via JS (Approach A) */}
          <div style={getPanelStyle()} className="h-[420px] transition-shadow duration-300">
            <div className="w-full h-full relative glass-card rounded-[24px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={placeholderImages[activeIndex]}
                    alt={milestones[activeIndex].title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#0C0C0C]/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A75A] backdrop-blur-md">
                    {milestones[activeIndex].year} · {milestones[activeIndex].title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
