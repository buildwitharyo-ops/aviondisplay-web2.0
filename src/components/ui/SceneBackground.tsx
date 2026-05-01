"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable particles on mobile
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.15 + Math.random() * 0.2,
      radius: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Layer 1 — Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,92,255,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,123,255,0.10) 0%, transparent 55%),
            #0a0a0f
          `,
        }}
      />

      {/* Layer 2 — Tech dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Layer 3 — Noise/grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Layer 4 — Animated orbs */}

      {/* Orb 1 — primary accent, top-left */}
      <motion.div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(107,92,255,0.12)",
          filter: "blur(120px)",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
        animate={{
          x: ["-10%", "5%", "-10%"],
          y: ["-10%", "15%", "-10%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — secondary accent, bottom-right */}
      <motion.div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(139,123,255,0.08)",
          filter: "blur(100px)",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
        animate={{
          x: ["60vw", "75vw", "60vw"],
          y: ["50vh", "65vh", "50vh"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Orb 3 — blue tint, center-bottom */}
      <motion.div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.06)",
          filter: "blur(80px)",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
        animate={{
          x: ["30vw", "45vw", "30vw"],
          y: ["70vh", "55vh", "70vh"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Layer 5 — Particle canvas (desktop only) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
