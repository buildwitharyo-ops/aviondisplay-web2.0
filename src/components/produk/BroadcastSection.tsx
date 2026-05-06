"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const WA = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+Broadcast+%26+Streaming+Devices+AVION!";

const HIGHLIGHTS = [
  { value: "4K", label: "Stream" },
  { value: "Low", label: "Latency" },
  { value: "Multi", label: "Platform" },
  { value: "Pro", label: "Grade Encoder" },
];

const TAGS = ["4K Encoding", "HDMI / SDI Input", "Low Latency", "YouTube / Zoom", "Plug & Play"];

const fadeUp = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function BroadcastMockup() {
  const bars = [0.4, 0.7, 1, 0.85, 0.6, 0.9, 0.5, 0.75, 0.95, 0.65];
  return (
    <div style={{
      background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
      borderRadius: 20, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem",
    }}>
      {/* LIVE badge + device header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)" }}
          />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem", color: "var(--red)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Live</span>
        </div>
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem", color: "var(--text-muted)" }}>4K · 60fps · H.265</span>
      </div>

      {/* Waveform bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: 56 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ scaleY: [h, h * 0.5 + 0.2, h] }}
            transition={{ duration: 0.8 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              flex: 1, borderRadius: 3,
              background: `rgba(239,68,68,${0.4 + h * 0.5})`,
              transformOrigin: "bottom",
              height: `${h * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Platform destinations */}
      <div>
        <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 0.6rem" }}>Streaming to</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { label: "YouTube", color: "#ff0000" },
            { label: "Zoom", color: "#2D8CFF" },
            { label: "Teams", color: "#5B5FC7" },
            { label: "RTMP", color: "#f97316" },
          ].map(({ label, color }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: `${color}14`, border: `1px solid ${color}30`,
              borderRadius: 8, padding: "0.3rem 0.65rem",
            }}>
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 1 }}
                style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem", color, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input ports */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {["HDMI IN", "SDI IN", "USB-C", "AUDIO"].map(port => (
          <div key={port} style={{
            flex: 1, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)",
            borderRadius: 8, padding: "0.4rem", textAlign: "center",
          }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.55rem", color: "rgba(239,68,68,0.9)", letterSpacing: "0.04em" }}>{port}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BroadcastSection() {
  return (
    <section id="broadcast" style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "4rem", alignItems: "center" }}
        >
          {/* LEFT — Info */}
          <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* LIVE badge */}
            <motion.div variants={fadeUp}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 999, padding: "0.3rem 0.9rem",
                fontSize: "0.72rem", fontFamily: "var(--font-dm-mono)",
                color: "var(--red)", fontWeight: 700, letterSpacing: "0.1em",
              }}>
                <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
                LIVE
              </span>
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--red)", fontWeight: 500 }}>
              Live Production
            </motion.p>

            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>
              Broadcast & Streaming Devices
            </motion.h2>

            <motion.p variants={fadeUp} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-sub)", margin: 0 }}>
              Perangkat broadcast profesional yang memudahkan siaran langsung berkualitas 4K ke berbagai platform sekaligus. Dengan encoder hardware bertenaga tinggi, input HDMI dan SDI, serta latensi ultra-rendah — ideal untuk acara korporat, webinar, siaran kampus, dan produksi konten skala besar.
            </motion.p>

            <motion.div variants={fadeUp} style={{ gap: "0.75rem" }} className="grid grid-cols-2 sm:grid-cols-4">
              {HIGHLIGHTS.map(({ value, label }) => (
                <div key={label} className="glass" style={{ padding: "0.9rem 0.75rem", borderRadius: 12, textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-syne)", fontSize: "1rem", fontWeight: 700, color: "var(--red)", lineHeight: 1.2, marginBottom: "0.2rem" }}>{value}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-sub)", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.04em" }}>{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 999, padding: "0.3rem 0.8rem", fontSize: "0.75rem", color: "var(--red)", fontFamily: "var(--font-dm-mono)", fontWeight: 500 }}>{tag}</span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--accent-grad)", color: "#fff", padding: "0.7rem 1.4rem", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Get a Quote
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Mockup */}
          <motion.div variants={fadeUp}>
            <BroadcastMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
