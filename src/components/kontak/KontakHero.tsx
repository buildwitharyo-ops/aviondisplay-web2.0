"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function KontakHero() {
  return (
    <section
      style={{
        minHeight: "42vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "9rem",
        paddingBottom: "4rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(124,109,255,0.12)",
              border: "1px solid rgba(124,109,255,0.25)",
              borderRadius: 999,
              padding: "0.35rem 1rem",
              fontSize: "0.72rem",
              fontFamily: "var(--font-dm-mono)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "var(--accent-2)",
              textTransform: "uppercase",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--accent)", display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              Get in Touch
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              margin: 0,
            }}
          >
            Let&apos;s Find the{" "}
            <span style={{
              background: "var(--accent-grad)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Right Solution
            </span>
            {" "}for You
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--text-sub)",
              maxWidth: 560,
              margin: 0,
            }}
          >
            Whether you have a question about our products, need a custom quote, or
            want to see a live demo — our team is ready to help.
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
