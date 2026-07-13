"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import { BrainCircuit, Cpu, Shield, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowDiagram, type FlowNode } from "@/components/ui/FlowDiagram";
import { useLenis } from "lenis/react";

// ═══════════════════════════════════════════════
// TASK C — Extended Projects with Case Study expansion
// Existing rendering is UNCHANGED when collapsed.
// New optional fields added to the data array.
// ═══════════════════════════════════════════════

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectData {
  category: string;
  title: string;
  subheadline: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  mockGlow: string;
  mockIcon: React.ReactNode;
  mockTitle: string;
  mockSub: string;
  mockNavActive: string;
  mockNavTitle?: string;
  mockNavItems?: string[];
  mockButtonPrimary?: string;
  mockButtonSecondary?: string;

  // ── Case Study fields (optional — additive only) ──
  problem?: string;
  architectureNodes?: FlowNode[];
  decisions?: Array<{ choice: string; reason: string }>;
  challenges?: Array<{ challenge: string; solution: string }>;
  metrics?: Array<{ value: string; label: string }>;
  lessons?: string;
}

const projects: ProjectData[] = [
  {
    category: "AI ASSISTANT & ALGORITHMS",
    title: "NEPHELE AI",
    subheadline: "A futuristic multi-modal AI interviewer and robotic assistant.",
    description:
      "Nephele is a production-grade AI operating interface and robotic orchestrator. It features a real-time computer vision edge pipeline for behavioral telemetry, fused multi-modal data processing, and a low-latency Cognitive Engine.",
    tags: ["PYTHON", "FASTAPI", "OPENCV", "VANILLA JS", "TAILWINDCSS", "WEBSOCKETS", "GROQ LLM"],
    liveUrl: "https://neuroracer.vercel.app",
    githubUrl: "https://github.com/joshuamoses/neuroracer",

    // Mock UI settings
    mockGlow: "bg-accent/15",
    mockIcon: <BrainCircuit size={80} className="text-accent" />,
    mockTitle: "Meet Nephele.",
    mockSub: "An Intelligent Robotic Operating System.",
    mockNavActive: "accent",
    mockNavTitle: "Nephele",
    mockNavItems: ["Capabilities", "Intelligence", "Architecture", "Initialize"],
    mockButtonPrimary: "Initialize Interface",
    mockButtonSecondary: "View Documentation",

    // ── Case Study content (placeholder — TODO: refine copy) ──
    problem:
      "Building a real-time AI assistant that could process simultaneous video, audio, and text streams with sub-200ms latency was impossible with traditional request-response architectures. The system needed to maintain conversational context across modalities while gracefully degrading under load.",
    architectureNodes: [
      { id: "n-client", label: "Client", tooltip: "Browser capturing video/audio via WebRTC streams." },
      { id: "n-gateway", label: "API Gateway", tooltip: "FastAPI handling WebSocket upgrades and routing." },
      { id: "n-engine", label: "Cognitive Engine", tooltip: "Core inference service fusing multi-modal data." },
      { id: "n-cache", label: "Redis Cache", tooltip: "Ephemeral state for real-time inference context." },
      { id: "n-cv", label: "CV Pipeline", tooltip: "OpenCV edge pipeline for behavioral telemetry." },
      { id: "n-db", label: "PostgreSQL", tooltip: "Stores session transcripts and analysis results." },
    ],
    decisions: [
      { choice: "WebSockets over REST", reason: "needed persistent bidirectional streams for real-time multi-modal data fusion" },
      { choice: "FastAPI", reason: "async-native Python framework with WebSocket support and automatic OpenAPI docs" },
      { choice: "Redis", reason: "sub-millisecond cache reads for maintaining inference context across request cycles" },
    ],
    challenges: [
      { challenge: "Multi-modal data synchronization across video, audio, and text streams", solution: "Implemented a timestamp-aligned buffer that fuses streams within a 50ms window before inference" },
      { challenge: "Memory pressure from concurrent CV pipeline workers", solution: "Queue-based load distribution with backpressure signaling to throttle intake" },
      { challenge: "LLM provider rate limits during peak usage", solution: "Circuit breaker pattern with cached response templates as graceful degradation" },
    ],
    // metrics intentionally omitted — will not render the metrics subsection
    lessons:
      "Real-time multi-modal systems need to be designed around the slowest stream, not the fastest. Building the synchronization buffer early saved weeks of debugging later. Also learned that WebSocket reconnection strategy is just as important as the initial connection logic — users will lose connectivity.",
  },
  {
    category: "AI SECURITY & REAL-TIME SAAS",
    title: "SENTINEL AI",
    subheadline: "AI-powered intelligent surveillance platform for schools, homes, and enterprises.",
    description:
      "SentinelAI transforms traditional CCTV infrastructure into an intelligent security platform capable of detecting threats, analyzing behavior, and automatically escalating incidents in real time. Built as a scalable multi-tenant SaaS platform with AI-powered monitoring, live streaming, and intelligent notification workflows.",
    tags: ["NEXT.JS", "FASTAPI", "YOLOv8", "DEEPSORT", "MONGODB", "DOCKER", "OPENAI", "TWILIO", "WEBSOCKETS", "OPENCV"],
    liveUrl: "https://sentinel-ai-one-lemon.vercel.app/",
    githubUrl: "https://github.com/joshuamoses/sentinel-ai",

    // Mock UI settings
    mockGlow: "bg-accent/15",
    mockIcon: <Shield size={80} className="text-accent" />,
    mockTitle: "Sentinel AI.",
    mockSub: "Intelligent real-time surveillance platform.",
    mockNavActive: "accent",
    mockNavTitle: "SentinelAI",
    mockNavItems: ["Live Streams", "Camera Zones", "Incidents", "Monitor"],
    mockButtonPrimary: "Launch Console",
    mockButtonSecondary: "View Demo",

    // ── Case Study content ──
    problem:
      "Traditional CCTV systems continuously record footage but rely on humans to monitor dozens of camera feeds, leading to delayed responses, missed incidents, and inefficient security operations. Organizations needed an intelligent surveillance platform capable of detecting threats automatically and notifying the right people within seconds.",
    architectureNodes: [
      { id: "s-users", label: "Users", tooltip: "Security personnel interacting with the dashboard." },
      { id: "s-dash", label: "Next.js Dashboard", tooltip: "Real-time monitoring interface with MJPEG streams." },
      { id: "s-backend", label: "FastAPI Backend", tooltip: "Async API handling ingestion, state, and WebSocket orchestration." },
      { id: "s-worker", label: "AI Worker Cluster", tooltip: "Multi-zone Dockerized inference workers executing models." },
      { id: "s-yolo", label: "YOLOv8 Detection", tooltip: "Object detection model identifying threat objects and people." },
      { id: "s-deepsort", label: "DeepSORT Tracking", tooltip: "Temporal tracking algorithm maintaining target identity across frames." },
      { id: "s-behavior", label: "Behavior Engine", tooltip: "Rule-based and heuristic analysis of tracks for anomalies." },
      { id: "s-db", label: "MongoDB", tooltip: "Flexible schema storage for cameras, tenants, and incident logs." },
      { id: "s-ws", label: "WebSocket Alerts", tooltip: "Persistent duplex channels for instant dashboard notifications." },
      { id: "s-notification", label: "OpenAI & Twilio", tooltip: "Generates incident summaries and triggers SMS/voice call alerts." },
    ],
    decisions: [
      { choice: "Multi-Zone AI Workers", reason: "separate AI workers for each surveillance zone allow specialized models to run independently, improving scalability and customization" },
      { choice: "WebSockets", reason: "persistent WebSocket connections enable instant alert delivery and real-time dashboard synchronization without repeated polling" },
      { choice: "Docker", reason: "each AI worker runs inside isolated Docker containers, simplifying deployment, scaling, and execution across environments" },
      { choice: "MongoDB", reason: "document model naturally fits cameras, incidents, tenants, and event metadata while supporting flexible schema evolution" },
      { choice: "FastAPI", reason: "async-native APIs with automatic OpenAPI documentation and high-performance request handling make it suitable for real-time workloads" },
    ],
    challenges: [
      { challenge: "Running multiple AI models simultaneously", solution: "Designed a zone-based model registry where each camera is permanently bound to its own AI model, eliminating unnecessary inference and improving scalability." },
      { challenge: "Preventing alert flooding", solution: "Implemented confidence thresholds, cooldown windows, severity scoring, and intelligent escalation to avoid duplicate notifications." },
      { challenge: "Managing multiple organizations", solution: "Built a multi-tenant architecture storing users, tenants, cameras, and incidents separately while maintaining isolated monitoring environments." },
      { challenge: "Integrating live CCTV streams", solution: "Added RTSP stream ingestion with automatic camera registration and MJPEG streaming to the dashboard for real-time monitoring." },
      { challenge: "Delivering actionable alerts", solution: "Combined OpenAI-generated incident summaries with WhatsApp notifications and automatic phone-call escalation for critical repeated threats." },
    ],
    lessons:
      "Building SentinelAI reinforced that scalable AI systems require more than accurate detection models. Separating inference from business logic, designing an event-driven backend, and implementing intelligent escalation workflows significantly improved maintainability, scalability, and real-world usability. The project also highlighted the importance of balancing detection accuracy with operational reliability through cooldowns, confidence scoring, and modular architecture.",
  },

];

/**
 * Case Study expanded content — rendered inside AnimatePresence.
 * Only appears when the user clicks "View Case Study".
 */
function CaseStudyContent({ project }: { project: ProjectData }) {
  const hasCaseStudy = project.problem || project.architectureNodes || project.decisions;
  if (!hasCaseStudy) return null;

  const sections: React.ReactNode[] = [];

  if (project.problem) {
    sections.push(
      <div key="problem" className="py-16">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-4">
          Problem
        </h5>
        <p className="text-base text-white leading-relaxed max-w-3xl">
          {project.problem}
        </p>
      </div>
    );
  }

  if (project.architectureNodes && project.architectureNodes.length > 0) {
    sections.push(
      <div key="architecture" className="py-16 my-4 glass-card rounded-2xl px-6 md:px-12">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
          Architecture
        </h5>
        <div className="py-12 flex justify-center items-center overflow-x-auto w-full">
          <FlowDiagram
            nodes={project.architectureNodes}
            variant="full"
            className="w-full min-w-[600px] lg:min-w-0"
          />
        </div>
      </div>
    );
  }

  if (project.decisions && project.decisions.length > 0) {
    sections.push(
      <div key="decisions" className="py-16">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
          Key Engineering Decisions
        </h5>
        <ul className="space-y-4">
          {project.decisions.map((d, i) => (
            <li key={i} className="text-sm leading-relaxed pl-4 border-l border-border">
              <span className="text-[#C8A75A] font-semibold">Why {d.choice}:</span>{" "}
              <span className="text-white">{d.reason}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (project.challenges && project.challenges.length > 0) {
    sections.push(
      <div key="challenges" className="py-16">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-8">
          Challenges & Solutions
        </h5>
        <div className="space-y-6">
          {project.challenges.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_1.8fr] gap-4 md:gap-8 items-center border-b border-border pb-6 last:border-0 last:pb-0"
            >
              <span className="text-sm font-semibold text-foreground leading-relaxed">
                {c.challenge}
              </span>
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight
                  size={20}
                  className="text-[#C8A75A] shrink-0"
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm text-white leading-relaxed">
                {c.solution}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.metrics && project.metrics.length > 0) {
    sections.push(
      <div key="metrics" className="py-16">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
          Metrics
        </h5>
        <div className="flex flex-wrap gap-8">
          {project.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-4xl font-bold text-foreground">
                {m.value}
              </span>
              <span className="text-xs text-white/90 mt-1 uppercase tracking-widest">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.lessons) {
    sections.push(
      <div key="lessons" className="py-16">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
          Lessons Learned
        </h5>
        <div className="border-l-2 border-[#C8A75A]/40 pl-6">
          <p className="text-[20px] italic text-white leading-relaxed max-w-3xl">
            {project.lessons}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-4 mt-8 border-t border-border">
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          {section}
          {index < sections.length - 1 && (
            <div className="border-t border-border" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function ProjectsSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const lenis = useLenis();

  return (
    <section id="projects" className="relative w-full py-48 md:py-60 max-w-screen-2xl mx-auto px-8 border-t border-border overflow-hidden">
      {/* Ambient Bottom-Right Glow */}
      <div
        className="absolute bottom-10 right-0 w-[600px] h-[600px] pointer-events-none z-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 167, 90, 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-32 text-center max-w-6xl mx-auto relative z-10"
      >
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A] mb-6 block">
          Selected Work
        </span>
        <h2 className="text-4xl md:text-[64px] font-bold tracking-tight text-foreground">
          The Work
        </h2>
      </motion.div>

      <div className="flex flex-col gap-48 md:gap-64 relative z-10">
        {projects.map((project, idx) => {
          const isExpanded = expandedIdx === idx;
          const hasCaseStudy = !!(project.problem || project.architectureNodes || project.decisions);

          return (
            <motion.div key={idx} layout className="flex flex-col w-full">

              {/* Top Header: Eyebrow + Massive Title — UNCHANGED */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 max-w-6xl mx-auto w-full"
              >
                <div className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#9CA3AF] mb-6">
                  <span>0{idx + 1}</span>
                  <span className="w-4 h-[1px] bg-[#9CA3AF]" />
                  <span>{project.category}</span>
                </div>
                {/* Note: Using a serif font-family explicitly to match the screenshot's premium editorial look */}
                <h3
                  className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-foreground leading-none"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                >
                  {project.title}
                </h3>
              </motion.div>

              {/* Browser Frame Preview */}
              <div className="w-full mt-4 mb-16 md:mb-24 origin-center">
                <ContainerScroll>
                  {/* Live Website Iframe UI */}
                  <div className="relative w-full h-full min-h-[460px] sm:min-h-[580px] md:min-h-[700px] lg:min-h-[800px] glass-card rounded-[24px] overflow-hidden flex flex-col font-sans">
                    <iframe
                      src={project.liveUrl}
                      className="w-full h-full min-h-[460px] sm:min-h-[580px] md:min-h-[700px] lg:min-h-[800px] border-none"
                      title={project.title}
                      loading="lazy"
                    />
                  </div>
                </ContainerScroll>
              </div>

              {/* Bottom Info Section — UNCHANGED structure */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-12 max-w-6xl mx-auto w-full"
              >
                {/* Left: Text & Tags (8 cols) */}
                <div className="lg:col-span-8 flex flex-col">
                  <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {project.subheadline}
                  </h4>
                  <p className="text-[20px] text-white leading-relaxed mb-8 max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest glass-card text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA (4 cols) */}
                <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-foreground hover:text-[#C8A75A] transition-colors border-b border-foreground hover:border-[#C8A75A] pb-1"
                  >
                    View Project <IconExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* ── NEW: View Case Study button (Task C, additive) ── */}
                  {hasCaseStudy && (
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                      aria-expanded={isExpanded}
                      aria-controls={`case-study-${idx}`}
                      className="group flex items-center gap-1.5 text-sm font-medium text-[#C8A75A] hover:text-[#C8A75A]/80 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Case Study" : "View Case Study"}</span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-300",
                          isExpanded ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* ── NEW: Expandable Case Study Panel (Task C, additive) ── */}
              <AnimatePresence>
                {isExpanded && hasCaseStudy && (
                  <motion.div
                    id={`case-study-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="max-w-6xl mx-auto w-full"
                    style={{ overflow: "hidden" }}
                    onAnimationComplete={() => {
                      // R6: Force Lenis to recalculate scroll dimensions
                      // after expand/collapse to prevent scroll jank
                      lenis?.resize();
                    }}
                  >
                    <CaseStudyContent project={project} />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
