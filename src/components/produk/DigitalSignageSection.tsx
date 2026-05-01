"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const WA = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+Digital+Signage+AVION!";

const HIGHLIGHTS = [
  { value: "Cloud", label: "CMS" },
  { value: "4K", label: "Content" },
  { value: "Multi", label: "Screen" },
  { value: "24/7", label: "Uptime" },
];

const TAGS = ["Cloud-based CMS", "Remote Management", "Content Scheduling", "Multi-location", "Real-time Updates"];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function SignageMockup() {
  const screens = [
    { label: "Lobby — Floor 1", status: "online", content: "Welcome" },
    { label: "Café — Level 2", status: "online", content: "Today's Menu" },
    { label: "Corridor B", status: "online", content: "Promo Ads" },
    { label: "Parking Gate", status: "offline", content: "—" },
    { label: "Meeting Rm 3", status: "online", content: "Room Schedule" },
  ];

  return (
    <div style={{
      background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)",
      borderRadius: 20, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem",
    }}>
      {/* CMS header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem", color: "#38bdf8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cloud CMS · Live</span>
        </div>
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem", color: "var(--text-muted)" }}>4/5 screens online</span>
      </div>

      {/* Screen list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {screens.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              background: "rgba(56,189,248,0.06)", border: `1px solid rgba(56,189,248,${s.status === "online" ? 0.18 : 0.08})`,
              borderRadius: 10, padding: "0.6rem 0.85rem",
            }}
          >
            <div style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: s.status === "online" ? "#22c55e" : "#555",
              boxShadow: s.status === "online" ? "0 0 6px #22c55e88" : "none",
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</p>
            </div>
            <div style={{
              background: s.status === "online" ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid rgba(56,189,248,${s.status === "online" ? 0.25 : 0.08})`,
              borderRadius: 6, padding: "0.15rem 0.5rem",
            }}>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem", color: s.status === "online" ? "#38bdf8" : "var(--text-muted)" }}>{s.content}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shimmer bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.25rem" }}>
        {[80, 55, 70].map((w, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            style={{ height: 4, width: `${w}%`, background: "rgba(56,189,248,0.3)", borderRadius: 999 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DigitalSignageSection() {
  return (
    <section id="signage" style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "4rem", alignItems: "center" }}
        >
          {/* LEFT — Mockup */}
          <motion.div variants={fadeUp}>
            {/* Cloud CMS badge */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)",
                borderRadius: 999, padding: "0.3rem 0.9rem",
                fontSize: "0.72rem", fontFamily: "var(--font-dm-mono)",
                color: "#38bdf8", fontWeight: 600, letterSpacing: "0.06em",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", display: "inline-block" }} />
                Cloud CMS Included
              </span>
            </div>
            <SignageMockup />
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#38bdf8", fontWeight: 500 }}>
              Digital Communication
            </motion.p>

            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>
              Digital Signage & CMS System
            </motion.h2>

            <motion.p variants={fadeUp} style={{ fontSize: "1.05rem", fontWeight: 500, color: "#38bdf8", lineHeight: 1.5, margin: 0 }}>
              Brand Anda selalu aktif. Pesan Anda selalu tepat sasaran.
            </motion.p>

            <motion.p variants={fadeUp} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-sub)", margin: 0 }}>
              Kelola jaringan display Anda dari satu dashboard cloud yang powerful. Jadwalkan konten, monitor performa layar secara real-time, dan perbarui pesan ke seluruh lokasi seketika — tanpa perlu hadir di tempat. Ideal untuk retail, hotel, rumah sakit, dan gedung perkantoran dengan kebutuhan komunikasi visual yang dinamis.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }} className="grid-cols-2 sm:grid-cols-4">
              {HIGHLIGHTS.map(({ value, label }) => (
                <div key={label} className="glass" style={{ padding: "0.9rem 0.75rem", borderRadius: 12, textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-syne)", fontSize: "1rem", fontWeight: 700, color: "#38bdf8", lineHeight: 1.2, marginBottom: "0.2rem" }}>{value}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-sub)", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.04em" }}>{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 999, padding: "0.3rem 0.8rem", fontSize: "0.75rem", color: "#38bdf8", fontFamily: "var(--font-dm-mono)", fontWeight: 500 }}>{tag}</span>
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
        </motion.div>
      </div>
    </section>
  );
}
