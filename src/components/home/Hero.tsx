"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import SplitType from "split-type";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  // --- GSAP SplitType & Proximity Hover Animation ---
  useEffect(() => {
    if (!nameRef.current) return;

    // Split JOSHUA MOSES into characters
    const split = new SplitType(nameRef.current, { types: "chars,words" });
    const chars = split.chars;
    if (!chars || chars.length === 0) return;

    // Set 3D perspective for rotateX entrance
    gsap.set(chars, { transformPerspective: 800, transformOrigin: "50% 50% -20px" });

    // Entrance Animation: opacity:0, y:40, rotateX:-90
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.025,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.4,
      }
    );

    // Proximity Mousemove setup using gsap.quickTo
    const quickToY = chars.map((char) => gsap.quickTo(char, "y", { duration: 0.3, ease: "power2.out" }));
    const quickToScale = chars.map((char) => gsap.quickTo(char, "scale", { duration: 0.3, ease: "power2.out" }));

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      chars.forEach((char, idx) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distance = Math.hypot(clientX - charX, clientY - charY);
        const radius = 80;

        if (distance < radius) {
          const proximity = 1 - distance / radius; // 1 at center, 0 at boundary
          const yVal = -8 * proximity;
          const scaleVal = 1 + 0.05 * proximity;

          quickToY[idx](yVal);
          quickToScale[idx](scaleVal);
        } else {
          quickToY[idx](0);
          quickToScale[idx](1);
        }
      });
    };

    const onMouseLeave = () => {
      chars.forEach((_, idx) => {
        quickToY[idx](0);
        quickToScale[idx](1);
      });
    };

    const heroTextContainer = nameRef.current;
    heroTextContainer.addEventListener("mousemove", onMouseMove);
    heroTextContainer.addEventListener("mouseleave", onMouseLeave);

    return () => {
      heroTextContainer.removeEventListener("mousemove", onMouseMove);
      heroTextContainer.removeEventListener("mouseleave", onMouseLeave);
      split.revert();
    };
  }, []);

  // --- OGL-Powered WebGL Flow-Noise Background ---
  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setUseFallback(true);
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    let renderer: any;
    let gl: WebGLRenderingContext;

    // 2. Dynamic OGL Import and Setup
    let cleanUpOGL = () => {};

    import("ogl")
      .then(({ Renderer, Geometry, Program, Mesh }) => {
        try {
          renderer = new Renderer({
            canvas,
            alpha: true,
            premultipliedAlpha: false,
            dpr: Math.min(window.devicePixelRatio, 2),
          });
          gl = renderer.gl;
        } catch (err) {
          console.warn("WebGL creation failed, showing static gradient fallback.", err);
          setUseFallback(true);
          return;
        }

        // Triangle covering full screen
        const geometry = new Geometry(gl, {
          position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
          uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const vertexShader = `
          attribute vec2 position;
          attribute vec2 uv;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        const fragmentShader = `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 4; i++) {
              value += amplitude * noise(p);
              p *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            vec2 st = vUv * vec2(uResolution.x / uResolution.y, 1.0);
            vec2 drift = vec2(uTime * 0.02, uTime * -0.015);
            
            // Mouse distortion / attraction
            vec2 mouseDistort = uMouse * vec2(uResolution.x / uResolution.y, 1.0);
            float dist = distance(st, mouseDistort);
            vec2 offset = vec2(0.0);
            if (dist < 0.6) {
              float force = (1.0 - dist / 0.6) * 0.06;
              offset = normalize(st - mouseDistort) * force;
            }

            float n = fbm(st * 1.5 + drift - offset);
            float n2 = fbm(st * 3.0 - drift * 0.5 + offset * 0.5);
            float finalNoise = mix(n, n2, 0.4);

            // Mix amber tones over a charcoal base
            vec3 color1 = vec3(0.909, 0.639, 0.239);
            vec3 color2 = vec3(0.153, 0.137, 0.118);
            vec3 finalColor = mix(color2, color1, finalNoise);

            // Cap atmospheric opacity
            float alpha = finalNoise * 0.12 + 0.04;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `;

        const targetMouse = { x: 0.5, y: 0.5 };
        const currentMouse = { x: 0.5, y: 0.5 };

        const program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new Float32Array([0.5, 0.5]) },
            uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
          },
          depthTest: false,
          depthWrite: false,
        });

        const mesh = new Mesh(gl, { geometry, program });

        // Resize handler
        const resize = () => {
          if (!container) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          renderer.setSize(width, height);
          program.uniforms.uResolution.value[0] = gl.canvas.width;
          program.uniforms.uResolution.value[1] = gl.canvas.height;
        };

        window.addEventListener("resize", resize);
        resize();

        // Mousemove relative to canvas
        const onMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          targetMouse.x = (e.clientX - rect.left) / rect.width;
          targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
        };
        window.addEventListener("mousemove", onMouseMove);

        // Visibility / Intersection Observer loop management
        let isVisible = true;
        const observer = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
          },
          { threshold: 0 }
        );
        observer.observe(container);

        // Render loop
        let animationId: number;
        const update = (time: number) => {
          animationId = requestAnimationFrame(update);

          if (isVisible) {
            program.uniforms.uTime.value = time * 0.001;

            // Interpolate mouse coordinates smoothly
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
            program.uniforms.uMouse.value[0] = currentMouse.x;
            program.uniforms.uMouse.value[1] = currentMouse.y;

            renderer.render({ scene: mesh });
          }
        };
        animationId = requestAnimationFrame(update);

        // Setup cleanup function
        cleanUpOGL = () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener("resize", resize);
          window.removeEventListener("mousemove", onMouseMove);
          observer.disconnect();
        };
      })
      .catch((err) => {
        console.error("OGL import error, WebGL disabled.", err);
        setUseFallback(true);
      });

    return () => {
      cleanUpOGL();
    };
  }, []);

  const marqueeText = "BACKEND ENGINEER • SYSTEM DESIGN • AWS • DISTRIBUTED SYSTEMS • CLOUD & DEVOPS • ";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background py-32"
    >
      {/* ── Top-Right Premium CTA Links ── */}
      <div className="absolute top-10 right-10 z-30 hidden md:flex items-center gap-8">
        <a
          href="#projects"
          className="text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary hover:text-foreground transition-colors duration-300"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary hover:text-foreground transition-colors duration-300"
        >
          Resume
        </a>
        <a
          href="https://github.com/joshuamoses"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary hover:text-foreground transition-colors duration-300"
        >
          GitHub
        </a>
      </div>

      {/* ── Ambient Centered Champagne Glow & WebGL Layer ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200, 167, 90, 0.06) 0%, transparent 55%), linear-gradient(180deg, #050505 0%, #0C0C0C 100%)",
        }}
      />
      {!useFallback ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(200, 167, 90, 0.07) 0%, rgba(68, 53, 24, 0.03) 50%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      )}

      {/* ── Faint Static Grid (Overlay) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Content (Above Background) ── */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-10"
        >
          PORTFOLIO — 2026 • BASED IN CHENNAI, INDIA
        </motion.p>

        {/* Hero Name (Target for SplitType) */}
        <h1
          ref={nameRef}
          className="font-black tracking-tighter leading-none mb-10 flex flex-col items-center select-none cursor-default"
        >
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[120px] overflow-hidden leading-tight text-foreground font-black">
            JOSHUA
          </span>
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[120px] overflow-hidden leading-tight font-black text-gradient py-2">
            MOSES
          </span>
        </h1>

        {/* Animated accent line */}
        <div className="relative w-full max-w-2xl mx-auto mb-10 flex items-center justify-center h-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-px origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(200,167,90,0.4) 20%, rgba(200,167,90,1) 50%, rgba(228,199,119,0.55) 80%, transparent 100%)",
            }}
          />
          {/* Travelling glow dot */}
          <motion.div
            animate={{ x: ["-50vw", "50vw"] }}
            transition={{
              duration: 3.5,
              delay: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4,
            }}
            className="absolute h-2 w-12 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,167,90,1) 0%, transparent 100%)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* Tech Marquee */}
        <div className="overflow-hidden w-full max-w-2xl mx-auto mb-8 flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap opacity-50 text-muted font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
          >
            <span className="pr-4">{marqueeText}</span>
            <span className="pr-4">{marqueeText}</span>
            <span className="pr-4">{marqueeText}</span>
            <span className="pr-4">{marqueeText}</span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-secondary font-light mb-16"
        >
          Designing scalable backend systems, cloud infrastructure, and developer platforms that solve real product problems.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
