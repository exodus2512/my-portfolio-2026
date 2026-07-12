"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════
// SHARED FLOW DIAGRAM COMPONENT
// Used by SystemDesign.tsx (variant="full") and
// ProjectsSection.tsx case studies (variant="compact")
// ═══════════════════════════════════════════════

export interface FlowNode {
  id: string;
  label: string;
  tooltip: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  variant: "full" | "compact";
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Connector line drawn between flow nodes.
 * Uses CSS stroke-dashoffset animation for a subtle flowing effect.
 * Falls back to pulsing opacity if dashoffset proves unreliable (R5).
 */
function Connector({ variant }: { variant: "full" | "compact" }) {
  const size = variant === "full" ? 40 : 28;
  const strokeLen = size;

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        // On lg: horizontal arrow; on mobile: vertical arrow rotated
        "lg:w-auto lg:h-auto w-6 h-6"
      )}
    >
      {/* Horizontal connector (visible on lg:) */}
      <svg
        className="hidden lg:block"
        width={size}
        height="16"
        viewBox={`0 0 ${size} 16`}
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="8"
          x2={size - 6}
          y2="8"
          stroke="rgba(232,163,61,0.4)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="animate-flow-dash"
        />
        {/* Arrowhead */}
        <polygon
          points={`${size - 6},4 ${size},8 ${size - 6},12`}
          fill="rgba(232,163,61,0.5)"
        />
      </svg>

      {/* Vertical connector (visible on mobile) */}
      <svg
        className="block lg:hidden"
        width="16"
        height={size}
        viewBox={`0 0 16 ${size}`}
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="8"
          y1="0"
          x2="8"
          y2={size - 6}
          stroke="rgba(232,163,61,0.4)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="animate-flow-dash-vertical"
        />
        {/* Arrowhead */}
        <polygon
          points={`4,${size - 6} 8,${size} 12,${size - 6}`}
          fill="rgba(232,163,61,0.5)"
        />
      </svg>
    </div>
  );
}

/**
 * Individual flow node — a DOM element (not SVG rect) so tooltip
 * positioning is trivial and flex-direction switching is natural (R2, R3).
 */
function FlowNodeElement({
  node,
  variant,
  isActive,
  onActivate,
  onDeactivate,
}: {
  node: FlowNode;
  variant: "full" | "compact";
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onDeactivate();
        nodeRef.current?.blur();
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        isActive ? onDeactivate() : onActivate();
      }
    },
    [isActive, onActivate, onDeactivate]
  );

  const tooltipId = `tooltip-${node.id}`;

  return (
    <div className="relative shrink-0" ref={nodeRef}>
      {/* Node */}
      <div
        tabIndex={0}
        role="button"
        aria-describedby={isActive ? tooltipId : undefined}
        aria-label={node.label}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative rounded-lg border bg-[#111110] text-white font-medium cursor-pointer transition-all duration-300 select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]",
          isActive
            ? "border-amber-400 shadow-[0_0_20px_rgba(232,163,61,0.15)]"
            : "border-amber-400/30 hover:border-amber-400/60",
          variant === "full"
            ? "px-5 py-3 text-sm"
            : "px-3 py-2 text-xs"
        )}
      >
        {node.label}
      </div>

      {/* Tooltip — DOM element positioned naturally relative to node (R3) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 pointer-events-none",
              // Position below on mobile, above on desktop
              "top-full mt-2 lg:bottom-full lg:top-auto lg:mt-0 lg:mb-2",
              "left-1/2 -translate-x-1/2",
              "w-max max-w-[220px]",
              "px-3 py-2 rounded-lg",
              "bg-[#1c1c1a] border border-white/10",
              "text-xs text-zinc-300 leading-relaxed text-center",
              "shadow-xl"
            )}
          >
            {node.tooltip}
            {/* Arrow */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1c1c1a] border-white/10",
                // Arrow points up on mobile (tooltip below), down on desktop (tooltip above)
                "-top-1 border-l border-t lg:top-auto lg:-bottom-1 lg:border-l-0 lg:border-t-0 lg:border-r lg:border-b"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FlowDiagram — Single adaptive layout using CSS flex-direction (R2).
 * flex-row on lg:, flex-col on mobile. ONE markup tree, no duplication.
 */
export function FlowDiagram({ nodes, variant, className }: FlowDiagramProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center",
        variant === "full" ? "gap-1 lg:gap-0 py-8" : "gap-1 lg:gap-0 py-4",
        className
      )}
    >
      {nodes.map((node, idx) => (
        <React.Fragment key={node.id}>
          <FlowNodeElement
            node={node}
            variant={variant}
            isActive={activeNodeId === node.id}
            onActivate={() => setActiveNodeId(node.id)}
            onDeactivate={() => setActiveNodeId(null)}
          />
          {idx < nodes.length - 1 && <Connector variant={variant} />}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
