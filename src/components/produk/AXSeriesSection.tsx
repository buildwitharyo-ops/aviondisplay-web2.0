"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WA_AX = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+AX+Series!";

const SIZES = ['65"', '75"', '86"', '98"'];

const HIGHLIGHTS = [
  { value: "4K UHD", label: "Display" },
  { value: "40pt", label: "Multi-touch" },
  { value: "Dual OS", label: "System" },
  { value: "48MP", label: "Camera (Opt.)" },
];

const TAGS = [
  "Android 14",
  "Intel i7 OPS",
  "360° Audio",
  "Infinite Whiteboard",
  "AI Meeting Tools",
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function AXSeriesSection() {
  return (
    <section id="ax-series" style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gap: "4rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* LEFT — Image + size chips */}
          <motion.div variants={fadeUp} style={{ position: "relative" }}>
            {/* Purple glow */}
            <div style={{
              position: "absolute", inset: "-20%",
              background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(107,92,255,0.2) 0%, transparent 65%)",
              pointerEvents: "none", zIndex: 0,
            }} />

            <Image
              src="/assets/image/AVION AX SERIES.png"
              alt="AVION AX Series Interactive Flat Panel"
              width={580}
              height={420}
              style={{ objectFit: "contain", width: "100%", height: "auto", position: "relative", zIndex: 1 }}
            />

            {/* Size chips overlay */}
            <div style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.5rem",
              zIndex: 2,
            }}>
              {SIZES.map((size) => (
                <span key={size} style={{
                  background: "rgba(10,10,15,0.8)",
                  border: "1px solid rgba(124,109,255,0.35)",
                  borderRadius: 8,
                  padding: "0.3rem 0.65rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-dm-mono)",
                  fontWeight: 600,
                  color: "var(--accent-2)",
                  backdropFilter: "blur(8px)",
                  whiteSpace: "nowrap",
                }}>
                  {size}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Category */}
            <motion.p variants={fadeUp} style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-dm-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 500,
            }}>
              Interactive Flat Panel
            </motion.p>

            {/* H2 */}
            <motion.h2 variants={fadeUp} style={{
              fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: 0,
            }}>
              AVION AX Series
            </motion.h2>

            {/* Tagline */}
            <motion.p variants={fadeUp} style={{
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "var(--accent-2)",
              lineHeight: 1.5,
              margin: 0,
            }}>
              Solusi layar interaktif untuk meeting dan presentasi modern.
            </motion.p>

            {/* Description */}
            <motion.p variants={fadeUp} style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--text-sub)",
              margin: 0,
            }}>
              AVION AX Series adalah interactive flat panel yang dirancang untuk transformasi ruang kerja dan ruang belajar modern. Dibekali dengan panel 4K UHD anti-glare, sistem Dual OS Android 14 dan Windows berbasis Intel i7 OPS, serta teknologi multi-touch 40 titik dengan akurasi ±1mm — AX Series menghadirkan pengalaman kolaborasi yang intuitif dan produktif. Dilengkapi dengan AI meeting tools, microphone array 360°, dan opsi kamera 48MP untuk video conference berkualitas tinggi.
            </motion.p>

            {/* Highlights row */}
            <motion.div variants={fadeUp} style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
            }}
              className="grid-cols-2 sm:grid-cols-4"
            >
              {HIGHLIGHTS.map(({ value, label }) => (
                <div key={label} className="glass" style={{
                  padding: "0.9rem 0.75rem",
                  borderRadius: 12,
                  textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.2,
                    marginBottom: "0.2rem",
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontSize: "0.68rem",
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-dm-mono)",
                    letterSpacing: "0.04em",
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {TAGS.map((tag) => (
                <span key={tag} style={{
                  background: "rgba(124,109,255,0.08)",
                  border: "1px solid rgba(124,109,255,0.2)",
                  borderRadius: 999,
                  padding: "0.3rem 0.8rem",
                  fontSize: "0.75rem",
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-dm-mono)",
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/teknologi" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "var(--accent-grad)", color: "#fff",
                padding: "0.7rem 1.4rem", borderRadius: 10,
                fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Full Specifications
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" />
                </svg>
              </Link>

              <a href={WA_AX} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--surface-md)", color: "var(--text)",
                padding: "0.7rem 1.4rem", borderRadius: 10,
                fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                border: "1px solid var(--border)", backdropFilter: "blur(12px)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hi)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--green)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get a Quote
              </a>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
