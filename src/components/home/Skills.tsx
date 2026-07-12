"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Cpu, 
  Layout, 
  Smartphone, 
  Globe,
  Zap,
  Layers
} from "lucide-react";

const skillCategories = [
  {
    title: "Core Stack",
    skills: [
      { name: "Next.js", icon: Globe },
      { name: "React", icon: Code2 },
      { name: "TypeScript", icon: Cpu },
      { name: "Node.js", icon: Zap },
    ],
  },
  {
    title: "Design & UI",
    skills: [
      { name: "Figma", icon: Palette },
      { name: "Tailwind CSS", icon: Layout },
      { name: "Framer Motion", icon: Smartphone },
      { name: "GSAP", icon: Layers },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-outfit tracking-tighter"
          >
            Tech Ecosystem
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-white/5 bg-white/5"
            >
              <h3 className="text-2xl font-bold font-outfit mb-8 opacity-60">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                      <skill.icon size={24} className="text-white/60 group-hover:text-white" />
                    </div>
                    <span className="text-lg font-medium text-white/70 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
