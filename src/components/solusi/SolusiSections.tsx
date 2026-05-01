"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const WA = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+solusi+AVION+Display!";

/* ─── Data ─────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    id: "smart-classroom",
    num: "01",
    category: "Education",
    h2: "Smart Classroom Solution",
    sub: "Jadikan setiap pelajaran sebagai pengalaman yang tak terlupakan.",
    desc: "Transformasi ruang kelas konvensional menjadi lingkungan belajar interaktif yang mendorong partisipasi aktif dan pemahaman yang lebih dalam. AVION Smart Classroom menggabungkan layar interaktif 4K, audio omnidireksional, dan software edukasi dalam satu ekosistem yang mudah dioperasikan guru maupun siswa.",
    builtFor: ["Sekolah SD, SMP, SMA", "Universitas & kampus", "Lembaga kursus & pelatihan", "Pusat bimbingan belajar"],
    features: [
      { icon: "✏️", title: "Infinite Whiteboard", desc: "Papan tulis digital tanpa batas dengan multi-touch 40 titik." },
      { icon: "🎙️", title: "360° Classroom Audio", desc: "Mic array 8-channel menangkap suara dari seluruh penjuru kelas." },
      { icon: "📡", title: "Wireless Screen Share", desc: "Siswa dapat berbagi layar dari perangkat apapun secara nirkabel." },
    ],
    includes: ["AVION AX Series (65\"–86\")", "Omni Mic Series", "Smart Pen", "Mobile Stand"],
    accent: "#7c6dff",
    visual: <ClassroomVisual />,
  },
  {
    id: "smart-meeting",
    num: "02",
    category: "Corporate",
    h2: "Smart Meeting Room System",
    sub: "Setiap meeting lebih tajam. Setiap keputusan lebih cepat.",
    desc: "Tingkatkan produktivitas tim Anda dengan ruang meeting yang siap untuk era hybrid. Dari video conference 4K hingga kolaborasi dokumen real-time — semua terintegrasi dalam satu panel yang intuitif dan terhubung dengan platform yang sudah Anda gunakan.",
    builtFor: ["Ruang rapat korporat", "Ruang direksi & boardroom", "Kantor startup & co-working", "Pusat komando & operasional"],
    features: [
      { icon: "📹", title: "4K Video Conference", desc: "Kamera 48MP + mic array untuk pengalaman video call berkualitas broadcast." },
      { icon: "🔗", title: "One-Click Join", desc: "Terhubung langsung ke Zoom, Teams, dan Google Meet tanpa setup." },
      { icon: "↔️", title: "Bi-directional Casting", desc: "Bagikan layar dari laptop atau terima dari peserta remote secara simultan." },
    ],
    includes: ["AVION AX / AX Pro Series", "Omni Mic Series", "Casting Dongle", "48MP Camera Module"],
    accent: "#a78bfa",
    extra: <MeetingPlatformRow />,
    visual: <MeetingVisual />,
  },
  {
    id: "digital-signage",
    num: "03",
    category: "Digital Communication",
    h2: "Digital Signage & CMS System",
    sub: "Brand Anda selalu aktif. Pesan Anda selalu tepat sasaran.",
    desc: "Kelola ratusan layar secara terpusat dari satu dashboard cloud. Jadwalkan konten, pantau performa display, dan perbarui pesan promosi secara real-time — tanpa perlu hadir di lokasi. AVION Digital Signage adalah solusi komunikasi visual yang skalabel untuk retail, hotel, rumah sakit, dan gedung perkantoran.",
    builtFor: ["Pusat perbelanjaan & retail", "Hotel & hospitality", "Rumah sakit & klinik", "Gedung perkantoran & lobby"],
    features: [
      { icon: "☁️", title: "Cloud CMS", desc: "Kelola seluruh jaringan display dari browser manapun, kapanpun." },
      { icon: "⏱️", title: "Smart Scheduling", desc: "Jadwalkan konten berbeda per lokasi, waktu, dan hari secara otomatis." },
      { icon: "📊", title: "Real-time Analytics", desc: "Monitor uptime, durasi tayangan, dan performa konten secara live." },
    ],
    includes: ["Commercial Display", "Cloud CMS Platform", "Media Player", "Content Scheduling System"],
    accent: "#38bdf8",
    visual: <SignageVisual />,
  },
  {
    id: "led-display",
    num: "04",
    category: "Large Format",
    h2: "LED Display Solution",
    sub: "Perluas kehadiran Anda. Kuasai setiap ruangan — dan setiap sudut jalan.",
    desc: "Dari instalasi indoor resolusi tinggi hingga LED wall outdoor tahan cuaca skala besar — AVION LED Display Solution menghadirkan visual yang memukau di segala kondisi. Dirancang untuk event, venue, infrastruktur publik, dan branding permanen yang tak terlupakan.",
    builtFor: ["Venue event & konser", "Billboard & iklan outdoor", "Lobby & atrium gedung", "Studio broadcast & virtual production"],
    features: [
      { icon: "💡", title: "High Brightness Panel", desc: "Brightness tinggi memastikan konten tetap jelas di siang hari maupun outdoor." },
      { icon: "🧩", title: "Modular & Scalable", desc: "Panel modular memungkinkan instalasi berbagai ukuran dan bentuk custom." },
      { icon: "🌧️", title: "Outdoor Rated", desc: "Proteksi IP65 untuk instalasi outdoor tahan hujan, debu, dan panas ekstrem." },
    ],
    includes: ["LED Wall Panels", "LED Controller", "Cloud CMS Platform", "Professional Installation"],
    accent: "#6ee7b7",
    visual: <LEDVisual />,
  },
  {
    id: "av-control",
    num: "05",
    category: "Enterprise AV",
    h2: "Integrated AV Control System",
    sub: "Satu ruangan. Satu tombol. Kendali penuh.",
    desc: "Satukan seluruh perangkat AV dalam satu sistem kontrol terpusat yang cerdas. Dari switching sumber video, pengaturan audio, hingga kontrol pencahayaan dan tirai — semua dapat dikendalikan dari satu antarmuka atau diautomasi berdasarkan jadwal dan sensor. Ideal untuk auditorium, ruang serbaguna, dan fasilitas enterprise skala besar.",
    builtFor: ["Auditorium & aula serbaguna", "Ruang konferensi enterprise", "Pusat pelatihan korporat", "Studio produksi & siaran"],
    features: [
      { icon: "🎛️", title: "Centralized Control", desc: "Satu panel mengendalikan semua perangkat AV, lighting, dan tirai secara terpadu." },
      { icon: "📡", title: "Matrix Switching", desc: "Routing sinyal video dan audio dari banyak sumber ke banyak tujuan secara fleksibel." },
      { icon: "🎬", title: "Live Streaming", desc: "Integrasikan broadcast & streaming langsung ke dalam alur kerja presentasi." },
    ],
    includes: ["AVION AX / AX Pro", "Broadcast & Streaming", "AV Matrix Switcher", "Central Control System"],
    accent: "#f472b6",
    visual: <AVControlVisual />,
  },
];

/* ─── Visual mockups ────────────────────────────────────────── */
function ClassroomVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Screen mockup */}
      <div style={{ background: "rgba(124,109,255,0.08)", border: "1px solid rgba(124,109,255,0.2)", borderRadius: 16, padding: "1.25rem", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,109,255,0.18) 0%, transparent 70%)" }} />
        <div style={{ textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 800, color: "var(--accent-2)", margin: "0 0 0.3rem" }}>Interactive</p>
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Whiteboard · 40pt Touch · 4K UHD</p>
        </div>
        {/* Touch points */}
        {[[20, 30], [75, 45], [50, 70], [30, 65], [65, 25]].map(([x, y], i) => (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 8, height: 8, borderRadius: "50%", background: "rgba(124,109,255,0.5)", boxShadow: "0 0 10px rgba(124,109,255,0.4)" }} />
        ))}
      </div>
      {/* Stat pills */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["40pt Touch", "Infinite Canvas", "Multi-user", "AI Tools"].map(tag => (
          <span key={tag} style={{ background: "rgba(124,109,255,0.1)", border: "1px solid rgba(124,109,255,0.2)", borderRadius: 999, padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "var(--accent-2)" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function MeetingVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 16, padding: "1.25rem", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(167,139,250,0.15) 0%, transparent 70%)" }} />
        {/* Video grid mockup */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", width: "80%", position: "relative" }}>
          {["Host", "Remote 1", "Remote 2", "Remote 3"].map((label) => (
            <div key={label} style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 8, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem", color: "var(--text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["4K Video", "48MP Cam", "360° Audio", "Bi-directional Cast"].map(tag => (
          <span key={tag} style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 999, padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "#a78bfa" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function SignageVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ background: "rgba(56,189,248,0.07)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 16, padding: "1.25rem", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "0.75rem" }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ width: 32, height: 20, background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.5rem", color: "#38bdf8" }}>S{i}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.08em", margin: 0 }}>CLOUD CMS · 5 SCREENS ONLINE</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["Cloud Managed", "Auto Schedule", "Live Monitor", "Multi-site"].map(tag => (
          <span key={tag} style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 999, padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "#38bdf8" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function LEDVisual() {
  const rows = 5;
  const cols = 8;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ background: "rgba(110,231,183,0.07)", border: "1px solid rgba(110,231,183,0.2)", borderRadius: 16, padding: "1.25rem", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(110,231,183,0.15) 0%, transparent 70%)" }} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "3px", position: "relative", width: "90%" }}>
          {Array.from({ length: rows * cols }).map((_, i) => {
            const intensity = Math.random();
            return (
              <div key={i} style={{
                aspectRatio: "1", borderRadius: 2,
                background: intensity > 0.7 ? "rgba(110,231,183,0.8)" : intensity > 0.4 ? "rgba(110,231,183,0.4)" : "rgba(110,231,183,0.1)",
              }} />
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["Modular Panel", "IP65 Outdoor", "High Brightness", "Custom Shape"].map(tag => (
          <span key={tag} style={{ background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.2)", borderRadius: 999, padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "#6ee7b7" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function AVControlVisual() {
  const buttons = ["AV CONTROL", "MATRIX", "STREAM", "LIGHTS", "AUDIO", "RECORD"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ background: "rgba(244,114,182,0.07)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 16, padding: "1.5rem", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(244,114,182,0.12) 0%, transparent 70%)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", width: "80%", position: "relative" }}>
          {buttons.map((label, i) => (
            <motion.div
              key={label}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{
                background: i === 0 ? "rgba(244,114,182,0.3)" : "rgba(244,114,182,0.1)",
                border: `1px solid rgba(244,114,182,${i === 0 ? 0.5 : 0.25})`,
                borderRadius: 8,
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.55rem", color: i === 0 ? "#f472b6" : "var(--text-muted)", letterSpacing: "0.06em", fontWeight: i === 0 ? 700 : 400 }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {["Central Control", "Matrix Switch", "Live Stream", "Auto Preset"].map(tag => (
          <span key={tag} style={{ background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: 999, padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "#f472b6" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function MeetingPlatformRow() {
  return (
    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Works with</span>
      {[
        { label: "Zoom", color: "#2D8CFF" },
        { label: "Teams", color: "#5B5FC7" },
        { label: "Meet", color: "#34A853" },
      ].map(({ label, color }) => (
        <span key={label} style={{ background: `${color}18`, border: `1px solid ${color}35`, borderRadius: 999, padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color, fontWeight: 600 }}>{label}</span>
      ))}
    </div>
  );
}

/* ─── Single solution section ───────────────────────────────── */
function SolutionSection({
  id, num, category, h2, sub, desc, builtFor, features, includes, accent, extra, visual, flip,
}: (typeof SOLUTIONS)[0] & { flip: boolean }) {
  const contentMotion = flip ? fadeRight : fadeLeft;
  const visualMotion = flip ? fadeLeft : fadeRight;

  return (
    <section
      id={id}
      style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`grid grid-cols-1 lg:grid-cols-2`}
          style={{
            gap: "4rem",
            alignItems: "center",
            direction: flip ? "rtl" : "ltr",
          }}
        >
          {/* Content */}
          <motion.div variants={contentMotion} style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Number + category */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "2.5rem",
                fontWeight: 800,
                lineHeight: 1,
                background: `linear-gradient(135deg, ${accent}, ${accent}55)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{num}</span>
              <span style={{
                fontSize: "0.68rem",
                fontFamily: "var(--font-dm-mono)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                background: `${accent}14`,
                border: `1px solid ${accent}28`,
                borderRadius: 999,
                padding: "0.22rem 0.65rem",
              }}>{category}</span>
            </div>

            {/* H2 */}
            <h2 style={{
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: 0,
            }}>{h2}</h2>

            {/* Subheading */}
            <p style={{ fontSize: "1rem", fontWeight: 500, color: accent, lineHeight: 1.5, margin: 0 }}>{sub}</p>

            {/* Description */}
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-sub)", margin: 0 }}>{desc}</p>

            {/* Built for */}
            <div>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.65rem" }}>Built for</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {builtFor.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.83rem", color: "var(--text-sub)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra (e.g. platform row) */}
            {extra}

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {features.map(({ icon, title, desc: fdesc }) => (
                <div key={title} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: `${accent}14`, border: `1px solid ${accent}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem",
                  }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.15rem" }}>{title}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-sub)", margin: 0, lineHeight: 1.5 }}>{fdesc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Includes chips */}
            <div>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.6rem" }}>Includes</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {includes.map(item => (
                  <span key={item} style={{
                    background: "var(--surface-md)",
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: "0.3rem 0.85rem",
                    fontSize: "0.75rem",
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-dm-mono)",
                  }}>{item}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  color: "#fff", padding: "0.72rem 1.5rem", borderRadius: 10,
                  fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Solusi Ini
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div variants={visualMotion} style={{ direction: "ltr" }}>
            {visual}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 3.7 — Custom CTA ─────────────────────────────── */
function SolusiCTA() {
  const WA_SOLUTIONS = "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+ingin+konsultasi+solusi+khusus+dengan+tim+AVION+Display.";

  return (
    <section style={{ padding: "3rem 0 6rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            background: "linear-gradient(135deg, rgba(107,92,255,0.12) 0%, rgba(139,123,255,0.06) 100%)",
            border: "1px solid rgba(124,109,255,0.2)",
            borderRadius: 24,
            padding: "4rem 2rem",
            textAlign: "center",
            backdropFilter: "blur(16px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(107,92,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 1rem", position: "relative" }}>
            Need Something Tailored to Your Space?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-sub)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.75, position: "relative" }}>
            Setiap lingkungan itu unik. Tim solusi kami akan merancang sistem yang tepat dari awal — khusus untuk Anda.
          </p>
          <a
            href={WA_SOLUTIONS}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--accent-grad)", color: "#fff",
              padding: "0.9rem 2rem", borderRadius: 10,
              fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
              position: "relative", transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Talk to Our Solutions Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Export ────────────────────────────────────────────────── */
export default function SolusiSections() {
  return (
    <>
      {SOLUTIONS.map((sol, i) => (
        <SolutionSection key={sol.id} {...sol} flip={i % 2 !== 0} />
      ))}
      <SolusiCTA />
    </>
  );
}
