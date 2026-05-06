"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WA_URL = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+AX+Series!";
const TOKOPEDIA_URL = "https://www.tokopedia.com/central-audio-visual/etalase/interactive-display";

const FEATURES = [
  "4K UHD display with anti-glare tempered glass",
  "Android 14 + Windows Dual OS system",
  "40-point infrared multi-touch, ±1mm accuracy",
  "AI meeting tools with real-time transcription",
];

const GRID_FEATURES = [
  { icon: "⬛", label: "4K UHD Display" },
  { icon: "✏️", label: "Infinite Whiteboard" },
  { icon: "🤖", label: "AI Meeting Tools" },
  { icon: "💻", label: "Dual OS Architecture" },
  { icon: "🎙️", label: "360° Audio Pickup" },
  { icon: "📷", label: "48MP Front Camera" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function FeaturedProduct() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Two-column: image left, content right */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            gap: "4rem",
            alignItems: "center",
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* Left — Image */}
          <motion.div
            variants={fadeUp}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* Purple glow */}
            <div style={{
              position: "absolute",
              inset: "-20%",
              background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(107,92,255,0.2) 0%, transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            }} />
            <Image
              src="/assets/image/AVION AX SERIES.png"
              alt="AVION AX Series"
              width={580}
              height={420}
              style={{ objectFit: "contain", width: "100%", height: "auto", position: "relative", zIndex: 1 }}
            />
          </motion.div>

          {/* Right — Content */}
          <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Category label */}
            <motion.p variants={fadeUp} style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 500,
            }}>
              Flagship Product
            </motion.p>

            {/* H2 */}
            <motion.h2 variants={fadeUp} style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}>
              AVION AX Series
            </motion.h2>

            {/* Description */}
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--text-sub)" }}>
              Smart display paling canggih yang pernah kami hadirkan. Dibangun dengan panel 4K anti-glare,
              fleksibilitas Dual OS, dan AI meeting tools — AX Series menyesuaikan diri dengan setiap ruangan,
              setiap tim, setiap alur kerja.
            </motion.p>

            {/* Feature list */}
            <motion.ul variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
              {FEATURES.map((f) => (
                <motion.li key={f} variants={fadeUp} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "var(--text-sub)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <Link href="/teknologi" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "var(--accent-grad)", color: "#fff",
                padding: "0.65rem 1.25rem", borderRadius: 9,
                fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              }}>
                Full Specifications
              </Link>
              <a href={TOKOPEDIA_URL} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--surface-md)", color: "var(--text)",
                padding: "0.65rem 1.25rem", borderRadius: 9,
                fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                border: "1px solid var(--border)",
              }}>
                <Image src="/assets/image/tokopedia-icon.png" alt="Tokopedia" width={16} height={16} style={{ objectFit: "contain" }} />
                Order via Tokopedia
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature grid below */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            gap: "1rem",
            marginTop: "4rem",
          }}
          className="grid grid-cols-2 md:grid-cols-3"
        >
          {GRID_FEATURES.map(({ label }) => (
            <motion.div key={label} variants={fadeUp} className="glass" style={{
              padding: "1.25rem 1.5rem",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              whileHover={{ y: -4, borderColor: "rgba(124,109,255,0.35)" }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--accent)", flexShrink: 0,
                boxShadow: "0 0 8px rgba(124,109,255,0.5)",
              }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text)" }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
