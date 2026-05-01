"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function SolusiHero() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "9rem",
        paddingBottom: "5rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem" }}>
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
              Complete Solutions
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              margin: 0,
            }}
          >
            Not Just Products.{" "}
            <span style={{
              background: "var(--accent-grad)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Complete Ecosystems.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--text-sub)",
              maxWidth: 580,
              margin: 0,
            }}
          >
            Setiap solusi AVION adalah kombinasi hardware, software, dan dukungan
            yang dirancang dengan cermat — untuk mengubah cara ruang Anda
            berkomunikasi, berkolaborasi, dan bekerja.
          </motion.p>

          {/* Scroll to explore */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              color: "var(--text-muted)",
            }}
          >
            <span style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>
              Scroll to explore
            </span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M10 4v12M5 12l5 5 5-5" />
            </motion.svg>
          </motion.div>
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
