"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CloudIcon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  slug: string;
  img: string;
}

interface IconCloudProps {
  icons: { slug: string; url: string }[];
  hoveredCategory: string | null;
  activeCategory: string | null;
  activeCategoryLabel?: string | null;
  className?: string;
}

const categorySlugs: Record<string, string[]> = {
  frontend: [
    "react",
    "nextdotjs",
    "typescript",
    "tailwindcss",
    "framer",
    "redux",
    "javascript",
    "html5",
    "css3",
    "vite",
    "webpack",
  ],
  backend: ["nodedotjs", "express", "java", "springboot", "python", "graphql"],
  "cloud-infra": ["amazonwebservices", "docker", "kubernetes", "terraform", "nginx", "linux", "vercel"],
  databases: ["postgresql", "mongodb", "redis", "amazondynamodb", "prisma"],
  devops: [
    "git",
    "githubactions",
    "jenkins",
    "sonarqube",
    "vim",
    "postman",
    "github",
    "visualstudiocode",
    "sublimetext",
    "npm",
    "yarn",
    "notion",
    "slack",
    "figma",
    "eslint",
    "prettier",
  ],
};

const formatDisplayName = (slug: string): string => {
  const customNames: Record<string, string> = {
    react: "React",
    nextdotjs: "Next.js",
    typescript: "TypeScript",
    tailwindcss: "Tailwind CSS",
    framer: "Framer",
    redux: "Redux",
    nodedotjs: "Node.js",
    express: "Express",
    java: "Java",
    springboot: "Spring Boot",
    python: "Python",
    graphql: "GraphQL",
    amazonwebservices: "AWS",
    docker: "Docker",
    kubernetes: "Kubernetes",
    terraform: "Terraform",
    nginx: "Nginx",
    linux: "Linux",
    vercel: "Vercel",
    postgresql: "PostgreSQL",
    mongodb: "MongoDB",
    redis: "Redis",
    amazondynamodb: "DynamoDB",
    prisma: "Prisma",
    git: "Git",
    githubactions: "GitHub Actions",
    jenkins: "Jenkins",
    sonarqube: "SonarQube",
    vim: "Vim",
    postman: "Postman",
    javascript: "JavaScript",
    html5: "HTML5",
    css3: "CSS3",
    github: "GitHub",
    visualstudiocode: "VS Code",
    sublimetext: "Sublime Text",
    vite: "Vite",
    webpack: "Webpack",
    npm: "npm",
    yarn: "Yarn",
    notion: "Notion",
    slack: "Slack",
    figma: "Figma",
    eslint: "ESLint",
    prettier: "Prettier",
  };
  return customNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

export function IconCloud({
  icons = [],
  hoveredCategory,
  activeCategory,
  activeCategoryLabel = null,
  className,
}: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [cloudIcons, setCloudIcons] = useState<CloudIcon[]>([]);
  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);
  const rotationRef = useRef({ phi: 0, theta: 0 });

  // Use refs to make values accessible inside the continuous animation loop without restarts
  const hoveredCategoryRef = useRef(hoveredCategory);
  const activeCategoryRef = useRef(activeCategory);
  const hoveredIconIndexRef = useRef(hoveredIconIndex);
  const loopInstanceIdRef = useRef(Math.floor(Math.random() * 1_000_000));

  // Sync refs on render
  hoveredCategoryRef.current = hoveredCategory;
  activeCategoryRef.current = activeCategory;
  hoveredIconIndexRef.current = hoveredIconIndex;

  const highlightedSlugs = useMemo(
    () => (hoveredCategory ? categorySlugs[hoveredCategory] || [] : []),
    [hoveredCategory]
  );
  const activeSlugs = useMemo(
    () => (activeCategory ? categorySlugs[activeCategory] || [] : []),
    [activeCategory]
  );

  const isCategoryActive = activeSlugs.length > 0;
  const isCategoryHovered = highlightedSlugs.length > 0;
  const isIconHovered = hoveredIconIndex !== null;

  useEffect(() => {
    if (!icons.length) return;

    // Distribute icons evenly on sphere surface using Fibonacci lattice
    const n = icons.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const newIcons: CloudIcon[] = icons.map((icon, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / n); // polar angle
      const phi = (2 * Math.PI * i) / goldenRatio; // azimuthal angle
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        scale: 1,
        opacity: 1,
        slug: icon.slug,
        img: icon.url,
      };
    });
    setCloudIcons(newIcons);
  }, [icons]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cloudIcons.length) return;

    console.log(`[IconCloud] mount loop instance ${loopInstanceIdRef.current}`);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cloudIcons]);

  // Continuous animation loop that runs exactly once on mount, reading from refs to avoid restarts
  useEffect(() => {
    if (!cloudIcons.length) return;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Access latest values from refs
      const currentActiveCategory = activeCategoryRef.current;
      const currentHoveredCategory = hoveredCategoryRef.current;
      const currentHoveredIconIndex = hoveredIconIndexRef.current;

      const activeSlugsList = currentActiveCategory ? categorySlugs[currentActiveCategory] || [] : [];
      const highlightedSlugsList = currentHoveredCategory ? categorySlugs[currentHoveredCategory] || [] : [];

      const currentCategoryActive = activeSlugsList.length > 0;
      const currentCategoryHovered = highlightedSlugsList.length > 0;
      const currentIconHovered = currentHoveredIconIndex !== null;

      // Pause completely (0) if a category is clicked/active or an icon is hovered. Otherwise 1.0.
      const currentSpeedFactor = (currentCategoryActive || currentIconHovered) ? 0 : 1.0;

      // Apply rotation speed factor
      if (mouseRef.current.active) {
        rotationRef.current.theta += mouseRef.current.x * dt * 1.5 * currentSpeedFactor;
        rotationRef.current.phi += mouseRef.current.y * dt * 1.5 * currentSpeedFactor;
      } else {
        // Auto-rotation targeted for 1 full rotation every 20-25 seconds (calm but active)
        rotationRef.current.theta += dt * 0.31 * currentSpeedFactor;
        rotationRef.current.phi += dt * 0.08 * currentSpeedFactor;
      }

      const { theta, phi } = rotationRef.current;
      const cosT = Math.cos(theta), sinT = Math.sin(theta);
      const cosP = Math.cos(phi), sinP = Math.sin(phi);

      const container = containerRef.current;
      if (!container) return;
      const iconEls = container.querySelectorAll<HTMLElement>(".cloud-icon");

      cloudIcons.forEach((icon, i) => {
        const el = iconEls[i];
        if (!el) return;

        // Rotate coordinates around Y then X
        const x1 = icon.x * cosT - icon.z * sinT;
        const z1 = icon.x * sinT + icon.z * cosT;
        const y1 = icon.y * cosP - z1 * sinP;
        const z2 = icon.y * sinP + z1 * cosP;

        // Calculate size scale based on Z-depth
        const depthScale = ((z2 + 1) / 2) * 0.45 + 0.55;

        // Default or interactive styling
        let opacity = depthScale;
        let scale = depthScale * 0.85 + 0.15; // default scale between 0.62 and 1.0

        const isHighlighted =
          (currentCategoryActive && activeSlugsList.includes(icon.slug)) ||
          (currentCategoryHovered && highlightedSlugsList.includes(icon.slug));

        if (currentCategoryActive || currentCategoryHovered) {
          if (isHighlighted) {
            opacity = 1.0;
            // Uniform prominent scale for highlighted icons so they are all the exact same size
            scale = 1.15;
          } else {
            opacity = 0.25;
            // Shrunk scale for non-highlighted icons
            scale = (depthScale * 0.85 + 0.15) * 0.7;
          }
        }

        const CX = 50, CY = 50, R = 41;
        const px = CX + x1 * R;
        const py = CY + y1 * R;

        el.style.left = `${px}%`;
        el.style.top = `${py}%`;
        el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        el.style.opacity = `${opacity}`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.zIndex = `${Math.round(depthScale * 100)}`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    
    // Log the RAF ID and loop instance to verify the loop is stable across category changes.
    console.log(`[IconCloud] started loop instance ${loopInstanceIdRef.current} with RAF ${animRef.current}`);

    return () => {
      console.log(`[IconCloud] cleanup loop instance ${loopInstanceIdRef.current} with RAF ${animRef.current}`);
      cancelAnimationFrame(animRef.current);
    };
  }, [cloudIcons]); // Depend only on cloudIcons, so it never restarts on activeCategory/hoveredCategory updates

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full select-none", className)}
      style={{ minHeight: 320 }}
    >
      {cloudIcons.map((icon, i) => {
        const isHovered = hoveredIconIndex === i;
        const isShownByActiveCategory = isCategoryActive && activeSlugs.includes(icon.slug);
        const showTooltip = isHovered || isShownByActiveCategory;

        return (
          <div
            key={i}
            className="cloud-icon absolute cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              transition: "none",
            }}
            onMouseEnter={() => setHoveredIconIndex(i)}
            onMouseLeave={() => setHoveredIconIndex(null)}
          >
            {/* Tooltip Pill (Pure CSS state transitions to avoid React virtual DOM resets) */}
            <div
              style={{
                opacity: showTooltip ? 1 : 0,
                transform: `translate(-50%, ${showTooltip ? "0px" : "4px"})`,
                transition: "opacity 0.15s ease, transform 0.15s ease",
                pointerEvents: "none",
              }}
              className="absolute bottom-full left-1/2 mb-3 px-2.5 py-1 rounded bg-zinc-950/90 border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap shadow-xl z-50"
            >
              {formatDisplayName(icon.slug)}
            </div>

            <img
              src={icon.img}
              alt={`tech-icon-${icon.slug}`}
              width={56}
              height={56}
              className="w-14 h-14 object-contain rounded-xl p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        );
      })}

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/75 px-5 py-2 text-sm font-semibold tracking-wide text-white shadow-2xl backdrop-blur-md transition-all duration-300",
          activeCategoryLabel ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        {activeCategoryLabel}
      </div>
    </div>
  );
}
