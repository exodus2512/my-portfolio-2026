"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { 
  Code2, 
  Server, 
  Zap, 
  Database, 
  Key, 
  Network, 
  Webhook, 
  Box, 
  Activity,
  Terminal,
  Scan,
  Bot,
  Cpu,
  PlugZap,
  Cloud
} from "lucide-react";

type TechItem = {
  name: string;
  icon?: string;
  lucideIcon?: React.ElementType;
};

type Category = {
  id: string;
  title: string;
  items: TechItem[];
};

const TechIcon = ({ src, alt, LucideIcon }: { src?: string; alt: string, LucideIcon?: React.ElementType }) => {
  const [error, setError] = useState(false);

  if (LucideIcon) {
    return <LucideIcon className="w-full h-full text-accent drop-shadow-sm" />;
  }

  if (error || !src) {
    return <Code2 className="w-full h-full text-muted-foreground opacity-90" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain drop-shadow-sm"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

const getIconDef = (tech: string): { icon?: string, lucideIcon?: React.ElementType } => {
  const map: Record<string, { icon?: string, lucideIcon?: React.ElementType }> = {
    "Java": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    "Node.js": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    "Express.js": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
    "FastAPI": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    "REST APIs": { lucideIcon: Webhook },
    "BullMQ": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
    "Redis Streams": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
    "Judge0": { lucideIcon: Terminal },
    
    "AWS": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    "EC2": { lucideIcon: Server },
    "Lambda": { lucideIcon: Zap },
    "S3": { lucideIcon: Database },
    "IAM": { lucideIcon: Key },
    "CloudFront": { lucideIcon: Network },
    "API Gateway": { lucideIcon: Webhook },
    "ECR": { lucideIcon: Box },
    "ECS": { lucideIcon: Box },
    "CloudWatch": { lucideIcon: Activity },
    
    "Docker": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    "Git": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    "GitHub": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    "Linux": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    "Vercel": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    "Nginx": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
    "CI/CD": { lucideIcon: Zap },
    "Postman": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
    "GitHub Actions": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    
    "PostgreSQL": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    "Redis": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
    "DynamoDB": { lucideIcon: Database },
    "MongoDB": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    
    "Amazon Bedrock": { lucideIcon: Cloud },
    "OpenCV": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    "YOLOv8": { lucideIcon: Scan },
    "Ollama": { lucideIcon: Bot },
    "Groq API": { lucideIcon: Cpu },
    "WebSockets": { lucideIcon: PlugZap },
    
    "Python": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    "JavaScript": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    "TypeScript": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    "SQL": { lucideIcon: Database },
  };
  return map[tech] || { lucideIcon: Code2 };
};

const oldCategories = [
  { id: "backend", title: "Backend Systems", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "BullMQ", "Redis Streams"] },
  { id: "cloud-infra", title: "Cloud Infrastructure", items: ["AWS", "EC2", "Lambda", "S3", "IAM", "CloudFront", "API Gateway", "ECR", "ECS", "CloudWatch"] },
  { id: "devops", title: "DevOps & Automation", items: ["Docker", "Git", "GitHub", "Linux", "Vercel", "Nginx", "CI/CD", "Postman", "GitHub Actions"] },
  { id: "data-platforms", title: "Data Platforms", items: ["PostgreSQL", "Redis", "DynamoDB", "MongoDB"] },
  { id: "ai-engineering", title: "AI Engineering", items: ["Amazon Bedrock", "OpenCV", "YOLOv8", "Ollama"] },
  { id: "programming", title: "Programming", items: ["Java", "Python", "JavaScript", "SQL"] },
];

const categories: Category[] = oldCategories.map((cat) => ({
  id: cat.id,
  title: cat.title,
  items: cat.items.map((item) => {
    const iconDef = getIconDef(item);
    return {
      name: item,
      icon: iconDef.icon,
      lucideIcon: iconDef.lucideIcon
    };
  }),
}));

const TechCard = ({ tech, index, parentProgress }: { tech: TechItem; index: number; parentProgress: MotionValue<number> }) => {
  // Staggered enter & exit based on index so items glide smoothly row by row as you scroll
  const startEnter = Math.min(0.2, index * 0.025);
  const endEnter = Math.min(0.45, startEnter + 0.25);
  const startExit = Math.max(0.65, 0.75 - (index % 4) * 0.02);
  const endExit = Math.min(1, startExit + 0.25);

  const y = useTransform(parentProgress, [startEnter, endEnter, startExit, endExit], [60, 0, 0, -60]);
  const opacity = useTransform(parentProgress, [startEnter, endEnter, startExit, endExit], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity, willChange: "transform" }}
      className="flex items-center gap-3.5 group py-1"
    >
      <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
        <TechIcon src={tech.icon} alt={tech.name} LucideIcon={tech.lucideIcon} />
      </div>
      <span className="text-[20px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {tech.name}
      </span>
    </motion.div>
  );
};

const CategoryRow = ({ category }: { category: Category }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "end 10%"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [40, 0, 0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div ref={rowRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative min-h-[180px] py-4">
      {/* Left Side: Domain Title */}
      <div className="lg:col-span-5 lg:sticky lg:top-36 h-fit">
        <motion.div style={{ opacity: titleOpacity, y: titleY, willChange: "transform" }}>
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-[64px] font-bold tracking-tight leading-tight text-foreground pr-4">
            {category.title}
          </h2>
        </motion.div>
      </div>

      {/* Right Side: Stack Icons Grid */}
      <div className="lg:col-span-7 flex flex-wrap gap-x-8 md:gap-x-10 gap-y-6 items-center">
        {category.items.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} parentProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="relative w-full py-48 md:py-60 max-w-6xl mx-auto px-8 border-t border-border overflow-hidden">
      {/* Ambient Right-Side Glow */}
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] pointer-events-none z-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 167, 90, 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center gap-2 mb-16 md:mb-24">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#C8A75A]"
          >
            <path d="M12 2v20" />
            <path d="M2 12h20" />
            <path d="m4.93 4.93 14.14 14.14" />
            <path d="m19.07 4.93-14.14 14.14" />
          </svg>
          <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#C8A75A]">
            MY STACK
          </span>
        </div>

        <div className="flex flex-col gap-32 md:gap-44">
          {categories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
