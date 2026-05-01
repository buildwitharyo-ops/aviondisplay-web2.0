"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "4K UHD Display",
  "40-Point Multi-touch",
  "Android 14 + Windows Dual OS",
  "Intel i7 OPS",
  "360° Omnidirectional Audio",
  "48MP Front Camera",
  "Infinite Whiteboard",
  "4K Wireless Casting",
];

// Duplicate for seamless loop
const TICKER = [...ITEMS, ...ITEMS];

export default function TickerBanner() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        padding: "0.85rem 0",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background:
            "linear-gradient(to right, #0a0a0f, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background:
            "linear-gradient(to left, #0a0a0f, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {TICKER.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "var(--text-sub)",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {item}
            {/* Separator dot with purple glow */}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 6px 1px rgba(124,109,255,0.6)",
                margin: "0 1.5rem",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
