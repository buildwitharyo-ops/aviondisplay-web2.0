"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

type SpecRow = { label: string; value: string };

const CARDS: {
  icon: string;
  title: string;
  accent: string;
  rows: SpecRow[];
}[] = [
  {
    icon: "⬛",
    title: "Display",
    accent: "#7c6dff",
    rows: [
      { label: "Resolution", value: "4K UHD (3840×2160)" },
      { label: "Panel", value: "Tempered Glass" },
      { label: "Surface", value: "Anti-glare, Anti-fingerprint" },
      { label: "Viewing Angle", value: "178° (H/V)" },
      { label: "Color Depth", value: "10-bit" },
      { label: "Touch Points", value: "40-point Multi-touch" },
      { label: "Touch Accuracy", value: "±1mm" },
      { label: "Response Time", value: "≤6ms" },
    ],
  },
  {
    icon: "⚙️",
    title: "Compute System",
    accent: "#a78bfa",
    rows: [
      { label: "Android Version", value: "Android 14" },
      { label: "Android RAM", value: "8 GB" },
      { label: "Android Storage", value: "128 GB" },
      { label: "OPS Processor", value: "Intel i7" },
      { label: "OPS RAM", value: "8 GB" },
      { label: "OPS Storage", value: "512 GB SSD" },
    ],
  },
  {
    icon: "🎙️",
    title: "Audio & Camera",
    accent: "#6ee7b7",
    rows: [
      { label: "Microphone", value: "8-array Beamforming" },
      { label: "Audio Pickup", value: "360° Omnidirectional" },
      { label: "Front Camera", value: "48MP (Optional)" },
    ],
  },
  {
    icon: "🔌",
    title: "Connectivity",
    accent: "#38bdf8",
    rows: [
      { label: "Wireless", value: "Wi-Fi + Bluetooth" },
      { label: "Casting", value: "4K, Bi-directional" },
      { label: "Screen Split", value: "Quad View" },
      { label: "Ports", value: "HDMI, USB, Type-C, OPS" },
      { label: "Power Input", value: "100–240V" },
      { label: "Standby Power", value: "≤0.5W" },
    ],
  },
];

function SpecCard({
  icon,
  title,
  accent,
  rows,
}: {
  icon: string;
  title: string;
  accent: string;
  rows: SpecRow[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass"
      style={{
        borderRadius: 20,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        border: "1px solid var(--border)",
        transition: "border-color 0.25s",
      }}
      whileHover={{ borderColor: `${accent}55`, y: -4 }}
    >
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${accent}18`,
            border: `1px solid ${accent}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${accent}40 0%, transparent 100%)`,
        }}
      />

      {/* Spec rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {rows.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-dm-mono)",
                color: "var(--text-muted)",
                letterSpacing: "0.02em",
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text)",
                textAlign: "right",
                lineHeight: 1.4,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechSpecsSection() {
  return (
    <section
      id="specifications"
      style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section header */}
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
            AX Series
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
            Technical Specifications
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
            Rincian lengkap hardware dari platform AVION AX Series.
          </motion.p>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1.25rem" }}
        >
          {CARDS.map((card) => (
            <SpecCard key={card.title} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
