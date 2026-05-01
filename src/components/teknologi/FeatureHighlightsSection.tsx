"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

/* ─── Bento items ─────────────────────────────────────────────────── */
// colSpan: 2 = wide card, 1 = normal card
const ITEMS = [
  {
    id: "display",
    colSpan: 2,
    stat: "4K UHD",
    statSub: "3840 × 2160",
    title: "Crystal-Clear Display",
    desc:
      "Panel 4K UHD dengan lapisan tempered glass anti-glare menghadirkan warna yang akurat dan kontras tinggi — nyaman dilihat dari sudut mana pun hingga 178°.",
    tags: ["10-bit Color", "Anti-glare", "Anti-fingerprint", "178° View Angle"],
    accent: "#7c6dff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "touch",
    colSpan: 1,
    stat: "40pt",
    statSub: "Infrared Multi-touch",
    title: "Precision Touch Engine",
    desc:
      "Teknologi infrared 40-titik dengan akurasi ±1mm dan response time ≤6ms memungkinkan penulisan dan gestur yang terasa natural dan responsif.",
    tags: [],
    accent: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
      </svg>
    ),
  },
  {
    id: "dualos",
    colSpan: 2,
    stat: "2 OS",
    statSub: "Dual Architecture",
    title: "Dual OS Architecture",
    desc:
      "Android 14 untuk penggunaan sehari-hari yang ringan dan cepat, serta Windows berbasis Intel i7 OPS untuk kebutuhan komputasi berat — semuanya dalam satu layar, beralih tanpa hambatan.",
    tags: ["Android 14", "Intel i7 OPS", "8 GB RAM Each", "512 GB SSD"],
    accent: "#6b5cff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="9" height="18" rx="2" />
        <rect x="13" y="3" width="9" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: "audio",
    colSpan: 1,
    stat: "8-Array",
    statSub: "Mic Beamforming",
    title: "360° AI Audio",
    desc:
      "Delapan mikrofon array dengan teknologi beamforming AI menangkap suara 360° secara omnidireksional, menekan noise dan echo secara otomatis.",
    tags: [],
    accent: "#6ee7b7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "casting",
    colSpan: 1,
    stat: "4K",
    statSub: "Wireless Casting",
    title: "4K Wireless Casting",
    desc:
      "Casting dua arah berkualitas 4K tanpa kabel. Mendukung Quad View — tampilkan hingga 4 sumber sekaligus dalam satu layar untuk kolaborasi multi-perangkat.",
    tags: [],
    accent: "#38bdf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "camera",
    colSpan: 1,
    stat: "48MP",
    statSub: "Front Camera",
    title: "Professional Video Quality",
    desc:
      "Kamera depan 48MP opsional menghadirkan kualitas video conference setara broadcast — ideal untuk hybrid meeting, webinar, dan live streaming.",
    tags: [],
    accent: "#f472b6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
];

/* ─── Single bento card ───────────────────────────────────────────── */
function BentoCard({
  stat,
  statSub,
  title,
  desc,
  tags,
  accent,
  icon,
  colSpan,
}: (typeof ITEMS)[0]) {
  return (
    <motion.div
      variants={fadeUp}
      className={colSpan === 2 ? "md:col-span-2" : ""}
      whileHover={{ y: -5, borderColor: `${accent}55` }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        backdropFilter: "blur(16px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Subtle top-left glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Icon + stat row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        {/* Stat */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            {stat}
          </p>
          <p
            style={{
              fontSize: "0.68rem",
              fontFamily: "var(--font-dm-mono)",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              marginTop: "0.2rem",
            }}
          >
            {statSub}
          </p>
        </div>

        {/* Icon box */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${accent}18`,
            border: `1px solid ${accent}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Title + desc */}
      <div>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 0.45rem",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: "var(--text-sub)",
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: `${accent}12`,
                border: `1px solid ${accent}28`,
                borderRadius: 999,
                padding: "0.22rem 0.65rem",
                fontSize: "0.68rem",
                fontFamily: "var(--font-dm-mono)",
                color: accent,
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function FeatureHighlightsSection() {
  return (
    <section
      id="features"
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
            What Sets It Apart
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
            Feature Highlights
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
            Enam teknologi inti yang membuat AVION AX Series unggul di kelasnya.
          </motion.p>
        </motion.div>

        {/* Bento grid — 3 cols desktop, 1 col mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1.1rem" }}
        >
          {ITEMS.map((item) => (
            <BentoCard key={item.id} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
