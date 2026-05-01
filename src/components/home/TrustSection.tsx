"use client";

import { motion } from "framer-motion";

const ITEMS = [
  {
    num: "01",
    title: "Enterprise-Grade Hardware",
    desc: "Setiap unit dibangun dengan komponen kelas komersial yang dirancang untuk penggunaan 16+ jam per hari — bukan panel konsumer yang dialihfungsikan.",
  },
  {
    num: "02",
    title: "Dedicated Local Support",
    desc: "Tim kami berbasis di Indonesia, siap membantu instalasi, pelatihan, dan dukungan purna jual — cepat, dan dalam bahasa Anda.",
  },
  {
    num: "03",
    title: "Seamless Compatibility",
    desc: "Kompatibel dengan Microsoft Teams, Zoom, Google Meet, dan lainnya — tanpa hardware tambahan, tanpa konfigurasi rumit.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

export default function TrustSection() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}>
            Built on Trust, Backed by Technology
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {ITEMS.map(({ num, title, desc }) => (
            <motion.div
              key={num}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(124,109,255,0.35)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass"
              style={{ padding: "2rem", borderRadius: 20, display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "2.5rem",
                fontWeight: 800,
                lineHeight: 1,
                background: "var(--accent-grad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {num}
              </span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-sub)", lineHeight: 1.7 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
