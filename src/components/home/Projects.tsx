"use client";

import { motion } from "framer-motion";
import { ExternalLink, Link } from "lucide-react";

const projects = [
  {
    title: "EcoSphere AI",
    category: "Web Application",
    description: "An AI-powered environmental monitoring platform with real-time data visualization.",
    tags: ["Next.js", "Three.js", "OpenAI"],
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Quantum Dashboard",
    category: "FinTech",
    description: "High-performance analytics dashboard for complex financial datasets.",
    tags: ["React", "D3.js", "TypeScript"],
    color: "from-amber-500/20 to-stone-500/20",
  },
  {
    title: "Synthesis CRM",
    category: "Product Design",
    description: "Next-gen relationship management tool with a focus on intuitive user flows.",
    tags: ["Figma", "React", "Tailwind"],
    color: "from-amber-500/20 to-zinc-500/20",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold font-outfit tracking-tighter"
            >
              Case Studies
            </motion.h2>
          </div>
          <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
            View All Projects <ExternalLink size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color} border border-white/5 relative group`}>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                      <div className="flex gap-4">
                        <button className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform">
                          <ExternalLink size={24} />
                        </button>
                        <button className="p-4 rounded-full bg-white/20 text-white backdrop-blur-md hover:scale-110 transition-transform">
                          <Link size={24} />
                        </button>
                      </div>
                   </div>
                   {/* Placeholder for project image */}
                   <div className="absolute inset-0 flex items-center justify-center font-outfit text-white/20 text-4xl font-bold tracking-tighter">
                      PREVIEW
                   </div>
                </div>
              </div>

              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-sm font-medium text-white/40 mb-4 block">
                  {project.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold font-outfit mb-6">
                  {project.title}
                </h3>
                <p className="text-xl text-white/60 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="px-8 py-3 rounded-full border border-white/20 font-bold hover:bg-white hover:text-black transition-all">
                  Read Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
