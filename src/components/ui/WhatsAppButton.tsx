"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, x: 8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              background: "rgba(10,10,15,0.92)",
              border: "1px solid rgba(37,211,102,0.25)",
              borderRadius: 10,
              padding: "0.45rem 0.9rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#fff",
              whiteSpace: "nowrap",
              backdropFilter: "blur(12px)",
              pointerEvents: "none",
            }}
          >
            Chat dengan kami
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", display: "block" }}
        aria-label="Chat via WhatsApp"
      >
        {/* Pulse rings */}
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.65], opacity: [0.45, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(37,211,102,0.4)",
            pointerEvents: "none",
          }}
        />
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.9], opacity: [0.25, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(37,211,102,0.25)",
            pointerEvents: "none",
          }}
        />

        {/* Circle button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#25d366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            position: "relative",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.div>
      </a>
    </div>
  );
}
