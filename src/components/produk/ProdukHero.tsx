"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const NAV_PILLS = [
  { label: "AX Series", href: "#ax-series" },
  { label: "AX Pro Series", href: "#ax-pro" },
  { label: "Digital Signage", href: "#signage" },
  { label: "Broadcast", href: "#broadcast" },
  { label: "LED Wall", href: "#led-wall" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function ProdukHero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        minHeight: "52vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
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
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Complete Product Lineup
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
            }}
          >
            Lineup Lengkap{" "}
            <span
              style={{
                background: "var(--accent-grad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Interactive Flat Panel
            </span>
            {" "}& Display Solutions
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-sub)",
              maxWidth: 560,
            }}
          >
            Dari ruang meeting interaktif hingga instalasi LED berskala besar — AVION
            menghadirkan solusi display yang tepat untuk setiap lingkungan.
          </motion.p>

          {/* Nav pills */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            {NAV_PILLS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleScroll(e, href)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "var(--surface-md)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "0.45rem 1.1rem",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--text-sub)",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hi)";
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.background = "rgba(124,109,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-sub)";
                  e.currentTarget.style.background = "var(--surface-md)";
                }}
              >
                <span
                  style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--accent)", flexShrink: 0,
                  }}
                />
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Pulse dot keyframe */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
