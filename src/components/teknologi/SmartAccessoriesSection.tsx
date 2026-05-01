"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const ACCESSORIES = [
  {
    id: "pen",
    name: "Smart Pen",
    tagline: "Pena dual-warna dengan flip-and-write",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    features: [
      "Dual-color support",
      "Flip-and-write",
      "Ergonomic design",
      "Pressure sensitivity",
    ],
  },
  {
    id: "dongle",
    name: "Casting Dongle",
    tagline: "USB/Type-C wireless casting",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    features: [
      "4K wireless",
      "USB and Type-C",
      "Plug-and-play",
      "Multi-device",
    ],
  },
  {
    id: "mic",
    name: "Omni Mic Series",
    tagline: "360° omnidirectional pickup",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
      </svg>
    ),
    features: [
      "8-array beamforming",
      "360° coverage",
      "Noise cancellation",
      "Echo reduction",
    ],
  },
  {
    id: "stand",
    name: "Mobile Stands",
    tagline: "Height adjustable with wheels",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="13" rx="2" />
        <path d="M12 16v5M8 21h8" />
        <circle cx="8" cy="21" r="1" fill="currentColor" />
        <circle cx="16" cy="21" r="1" fill="currentColor" />
      </svg>
    ),
    features: [
      "Height adjustable",
      "Stable base with wheels",
      "Easy mobility",
      "Cable management",
    ],
  },
];

function AccessoryCard({
  name,
  tagline,
  icon,
  features,
}: (typeof ACCESSORIES)[0]) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, borderColor: "rgba(124,109,255,0.35)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        backdropFilter: "blur(16px)",
        cursor: "default",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "rgba(124,109,255,0.12)",
          border: "1px solid rgba(124,109,255,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent-2)",
        }}
      >
        {icon}
      </div>

      {/* Name + tagline */}
      <div>
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 0.3rem",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-sub)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(124,109,255,0.3) 0%, transparent 100%)",
        }}
      />

      {/* Feature list */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <circle cx="7" cy="7" r="6.5" stroke="rgba(124,109,255,0.4)" />
              <path
                d="M4.5 7l1.75 1.75L9.5 5.5"
                stroke="var(--accent)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-sub)",
                lineHeight: 1.4,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SmartAccessoriesSection() {
  return (
    <section
      id="accessories"
      style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            Complete the Setup
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: 0,
            }}
          >
            Smart Accessories
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--text-sub)",
              maxWidth: 480,
              margin: 0,
            }}
          >
            Aksesori resmi AVION yang dirancang untuk melengkapi dan memaksimalkan
            pengalaman AX Series.
          </motion.p>
        </motion.div>

        {/* 4-col grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1.1rem" }}
        >
          {ACCESSORIES.map((acc) => (
            <AccessoryCard key={acc.id} {...acc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
