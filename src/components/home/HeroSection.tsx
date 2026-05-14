"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";

const STATS = [
  { value: "50+", label: "Units Ready" },
  { value: "4K UHD", label: "Display" },
  { value: "40pt", label: "Multi-touch" },
  { value: "48MP", label: "Front Camera" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          width: "100%",
          gap: "3rem",
          alignItems: "center",
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left — Text content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
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
                padding: "0.35rem 0.9rem",
                fontSize: "0.72rem",
                fontFamily: "var(--font-dm-mono)",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "var(--accent-2)",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Interactive Flat Panel · Enterprise Grade
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            The Display That{" "}
            <span
              style={{
                background: "var(--accent-grad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Thinks With You
            </span>
          </motion.h1>

          {/* Mobile-only hero image — shown right after H1 */}
          <motion.div
            variants={fadeUp}
            style={{ position: "relative", justifyContent: "center" }}
            className="flex md:hidden"
          >
            <div
              style={{
                position: "absolute",
                inset: "-20%",
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,92,255,0.22) 0%, transparent 65%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Image
              src="/assets/image/AVION HOME.png"
              alt="AVION Interactive Flat Panel"
              width={620}
              height={480}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxWidth: 480,
                position: "relative",
                zIndex: 1,
              }}
            />
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text-sub)",
              maxWidth: 480,
            }}
          >
            AVION Interactive Flat Panel menghadirkan kejernihan 4K, alat
            kolaborasi bertenaga AI, dan performa Dual OS yang mulus — dirancang
            untuk tim yang tidak mau terlambat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            <Link
              href="/produk"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--accent-grad)",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: 10,
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explore Products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--surface-md)",
                color: "var(--text)",
                padding: "0.75rem 1.5rem",
                borderRadius: 10,
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hi)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--green)" style={{ flexShrink: 0, display: "block" }} aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Talk to Us
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            style={{
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
            className="grid grid-cols-2 sm:grid-cols-4"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="glass"
                style={{
                  padding: "0.9rem 0.75rem",
                  borderRadius: 14,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.2,
                    marginBottom: "0.2rem",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-dm-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right — Hero image with parallax */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          style={{ position: "relative", justifyContent: "center" }}
          className="hidden md:flex"
        >
          <motion.div style={{ y: imageY, position: "relative" }}>
            {/* Purple glow — behind the image via z-index */}
            <div
              style={{
                position: "absolute",
                inset: "-30%",
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,92,255,0.22) 0%, transparent 65%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Image
              src="/assets/image/AVION HOME.png"
              alt="AVION Interactive Flat Panel"
              width={620}
              height={480}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxWidth: 620,
                position: "relative",
                zIndex: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--text-muted)",
          fontSize: "0.7rem",
          fontFamily: "var(--font-dm-mono)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M8 2v12M4 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        Scroll
      </motion.div>

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
