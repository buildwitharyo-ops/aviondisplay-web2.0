"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SIZES = [
  { id: "65", label: "AX 65", sub: '65" Display' },
  { id: "75", label: "AX 75", sub: '75" Display' },
  { id: "86", label: "AX 86", sub: '86" Display' },
  { id: "98", label: "AX 98", sub: '98" Display' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function TeknologiHero() {
  const [active, setActive] = useState("65");

  const activeSize = SIZES.find((s) => s.id === active)!;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "7rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", width: "100%" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "4rem", alignItems: "center" }}
        >
          {/* LEFT — Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span
                style={{
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
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                Full Specifications · AX Series
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                margin: 0,
              }}
            >
              Built for the Next{" "}
              <span
                style={{
                  background: "var(--accent-grad)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Generation
              </span>{" "}
              of Collaboration
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-sub)",
                maxWidth: 520,
                margin: 0,
              }}
            >
              Setiap detail AVION AX Series dirancang untuk kejernihan, kecepatan,
              dan interaksi yang mulus — dari panel 4K hingga sistem audio bertenaga AI.
            </motion.p>

            {/* Size selector */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-dm-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Select Size
              </p>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {SIZES.map((size) => {
                  const isActive = active === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setActive(size.id)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.2rem",
                        padding: "0.65rem 1.25rem",
                        borderRadius: 12,
                        border: isActive
                          ? "1px solid rgba(124,109,255,0.6)"
                          : "1px solid var(--border)",
                        background: isActive
                          ? "rgba(124,109,255,0.15)"
                          : "var(--surface-md)",
                        backdropFilter: "blur(12px)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        outline: "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: isActive ? "var(--accent-2)" : "var(--text)",
                          fontFamily: "var(--font-syne)",
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                        }}
                      >
                        {size.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-dm-mono)",
                          color: isActive ? "var(--accent)" : "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {size.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active size label */}
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-dm-mono)",
                  color: "var(--accent-2)",
                  letterSpacing: "0.04em",
                }}
              >
                Viewing specs for:{" "}
                <span style={{ fontWeight: 700 }}>{activeSize.label}</span>{" "}
                <span style={{ color: "var(--text-muted)" }}>({activeSize.sub})</span>
              </motion.p>
            </motion.div>

            {/* Quick stat pills */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}
            >
              {["4K UHD", "40pt Touch", "Dual OS", "Android 14", "Intel i7"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(124,109,255,0.07)",
                      border: "1px solid rgba(124,109,255,0.18)",
                      borderRadius: 999,
                      padding: "0.28rem 0.75rem",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-dm-mono)",
                      color: "var(--accent-2)",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT — Image */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            style={{ position: "relative" }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                inset: "-15%",
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,92,255,0.22) 0%, transparent 68%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Floating size badge */}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 3,
                background: "rgba(10,10,15,0.85)",
                border: "1px solid rgba(124,109,255,0.4)",
                borderRadius: 10,
                padding: "0.5rem 1rem",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--accent-2)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {activeSize.label}
              </p>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-dm-mono)",
                  color: "var(--text-muted)",
                  margin: "0.15rem 0 0",
                }}
              >
                {activeSize.sub}
              </p>
            </motion.div>

            <Image
              src="/assets/image/AVION AX SERIES.png"
              alt="AVION AX Series Interactive Flat Panel"
              width={640}
              height={460}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                position: "relative",
                zIndex: 1,
              }}
            />
          </motion.div>
        </div>
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
