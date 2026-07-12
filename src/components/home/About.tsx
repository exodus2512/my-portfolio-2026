"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const experiences = [
  {
    year: "2023 - Present",
    company: "Tech Innovators",
    role: "Senior UI/UX Designer",
    description: "Leading the design system team and overseeing the creative direction of high-traffic SaaS platforms.",
  },
  {
    year: "2021 - 2023",
    company: "Creative Studio",
    role: "Frontend Developer",
    description: "Built immersive, animation-heavy marketing sites for global brands using Next.js and GSAP.",
  },
  {
    year: "2019 - 2021",
    company: "Digital Agency",
    role: "Junior Designer",
    description: "Focused on user research and wireframing for complex enterprise solutions.",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 block"
            >
              The Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold font-outfit tracking-tighter mb-8"
            >
              Merging <span className="text-white/40 italic">Aesthetics</span> with <span className="text-white/40 italic">Logic</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-white/60 leading-relaxed max-w-xl"
            >
              I am a designer-engineer hybrid who believes that great digital products are born from the perfect balance of visual excellence and technical precision. My goal is to build interfaces that aren't just beautiful, but are also intuitive, accessible, and performant.
            </motion.p>
          </div>

          <div className="relative">
             <div className="absolute left-[31px] top-10 bottom-10 w-[1px] bg-white/10" />
             {experiences.map((exp, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: index * 0.2 }}
                 viewport={{ once: true }}
                 className="relative pl-16 mb-12 last:mb-0"
               >
                 <div className="absolute left-[24px] top-1 w-4 h-4 rounded-full bg-white border-4 border-black" />
                 <span className="text-sm font-medium text-white/40 mb-1 block">
                   {exp.year}
                 </span>
                 <h3 className="text-2xl font-bold font-outfit mb-2">{exp.company}</h3>
                 <p className="text-lg font-medium text-white/80 mb-2">{exp.role}</p>
                 <p className="text-white/50 leading-relaxed">{exp.description}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
