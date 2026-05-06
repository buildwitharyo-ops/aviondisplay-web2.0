"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CASES = [
  {
    image: "/assets/image/Corporate Meeting AVION.jpg",
    category: "Corporate Meeting",
    title: "Where Decisions Get Made",
    desc: "Tingkatkan setiap sesi rapat dengan presentasi interaktif, kolaborasi real-time, dan integrasi sistem yang mulus.",
  },
  {
    image: "/assets/image/Education AVION.png",
    category: "Education",
    title: "Learning That Sticks",
    desc: "Ciptakan pengalaman belajar yang mendalam dengan interaksi langsung, visual yang hidup, dan alat pengajaran modern yang membuat siswa terus fokus.",
  },
  {
    image: "/assets/image/Training Room AVION.jpg",
    category: "Training Room",
    title: "Train Smarter, Not Harder",
    desc: "Dukung sesi pelatihan hybrid dengan sistem display yang fleksibel, konten interaktif, dan audio jernih untuk setiap peserta.",
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

export default function UseCases() {
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
            One Platform, Infinite Possibilities
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-sub)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Dari ruang rapat hingga ruang kelas — AVION hadir untuk setiap lingkungan dan kebutuhan.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            gap: "1.5rem",
          }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {CASES.map(({ image, category, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -8, borderColor: "rgba(124,109,255,0.35)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                <span style={{
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-dm-mono)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 500,
                }}>
                  {category}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
