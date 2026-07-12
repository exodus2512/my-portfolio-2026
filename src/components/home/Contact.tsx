"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Link, Globe, User } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-outfit tracking-tighter"
          >
            Let's build <span className="text-gradient">something</span> great.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                  <Mail className="text-white/60" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/40 mb-1 uppercase tracking-wider">Email Me</h4>
                  <p className="text-xl font-bold font-outfit">hello@premiumportfolio.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                  <MapPin className="text-white/60" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/40 mb-1 uppercase tracking-wider">Location</h4>
                  <p className="text-xl font-bold font-outfit">San Francisco, CA (Remote Friendly)</p>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h4 className="text-sm font-medium text-white/40 mb-6 uppercase tracking-wider">Social Channels</h4>
              <div className="flex gap-4">
                {[Link, Globe, User].map((Icon, idx) => (
                  <button key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/40 ml-2">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/40 ml-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/40 ml-2">Project Details</label>
              <textarea
                rows={6}
                placeholder="Tell me about your vision..."
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors resize-none"
              />
            </div>
            <button className="w-full py-5 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors group">
              Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
