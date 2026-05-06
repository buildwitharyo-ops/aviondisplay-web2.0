"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";
const TOKOPEDIA_URL = "https://www.tokopedia.com/aviondisplay";

const PRODUCTS = [
  'Interactive Flat Panel — AX Series (65"–98")',
  'Interactive Flat Panel — AX Pro Series (65"–98")',
  "Digital Signage & CMS System",
  "Broadcast & Streaming Devices",
  "LED Wall Indoor / Outdoor",
  "Smart Classroom Solution",
  "Smart Meeting Room System",
  "Integrated AV Control System",
  "Other / Not sure yet",
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--green)">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+62 815-6390-5555",
    href: WA_URL,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "acta.arc@gmail.com",
    href: "mailto:acta.arc@gmail.com",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Office",
    value: "Tangerang, Indonesia",
    href: null,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Hours",
    value: "Mon–Fri, 09.00–17.00 WIB",
    href: null,
  },
];

/* ── Shared input style ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface-md)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

type FormState = "idle" | "loading" | "success" | "error";

/* ── Contact Info Panel ── */
function InfoPanel() {
  return (
    <div
      className="lg:sticky lg:top-24"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* WhatsApp CTA */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          background: "var(--green)",
          color: "#fff",
          padding: "0.9rem 1.5rem",
          borderRadius: 12,
          fontSize: "0.95rem",
          fontWeight: 700,
          textDecoration: "none",
          transition: "opacity 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat via WhatsApp
      </a>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Contact details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: "var(--surface-md)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {icon}
            </div>
            <div>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.15rem" }}>
                {label}
              </p>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--text)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text)"; }}
                >
                  {value}
                </a>
              ) : (
                <p style={{ fontSize: "0.875rem", color: "var(--text)", fontWeight: 500, margin: 0 }}>{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Tokopedia */}
      <div>
        <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
          Order Online
        </p>
        <a
          href={TOKOPEDIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            background: "var(--surface-md)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "0.7rem 1rem",
            textDecoration: "none",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hi)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <Image
            src="/assets/image/tokopedia-icon.png"
            alt="Tokopedia"
            width={24}
            height={24}
            style={{ borderRadius: 4 }}
          />
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
            AVION di Tokopedia
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    nama: "",
    perusahaan: "",
    email: "",
    telepon: "",
    produk: "",
    pesan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({ nama: "", perusahaan: "", email: "", telepon: "", produk: "", pesan: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(124,109,255,0.5)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
  };

  return (
    <div className="glass" style={{ borderRadius: 20, padding: "2rem" }}>
      {/* Form header */}
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.4rem", letterSpacing: "-0.01em" }}>
        Send Us a Message
      </h2>
      <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", margin: "0 0 1.75rem", lineHeight: 1.6 }}>
        Fill in the form and we&apos;ll get back to you within 1 business day.
      </p>

      {state === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            padding: "2.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(124,109,255,0.15)", border: "1px solid rgba(124,109,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.3rem" }}>Pesan Terkirim!</p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", margin: 0 }}>Tim kami akan menghubungi Anda dalam 1 hari kerja.</p>
          </div>
          <button
            onClick={() => setState("idle")}
            style={{ fontSize: "0.8rem", color: "var(--accent-2)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Kirim pesan lain
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Row 1: Nama + Perusahaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0.85rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                Nama <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <input
                required
                name="nama"
                value={form.nama}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="John Doe"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                Nama Perusahaan <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <input
                required
                name="perusahaan"
                value={form.perusahaan}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="PT. Contoh Indonesia"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Row 2: Email + Telepon */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0.85rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                Email <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="john@perusahaan.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                No. Telepon/WhatsApp <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <input
                required
                name="telepon"
                value={form.telepon}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="+62 812-3456-7890"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Produk dropdown */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
              Produk yang Diminati
            </label>
            <select
              name="produk"
              value={form.produk}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            >
              <option value="" style={{ background: "#0a0a0f" }}>— Pilih produk —</option>
              {PRODUCTS.map((p) => (
                <option key={p} value={p} style={{ background: "#0a0a0f" }}>{p}</option>
              ))}
            </select>
          </div>

          {/* Pesan textarea */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-sub)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
              Pesan / Pertanyaan
            </label>
            <textarea
              name="pesan"
              value={form.pesan}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              rows={5}
              placeholder="Ceritakan kebutuhan Anda..."
              style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
            />
          </div>

          {/* Error state */}
          {state === "error" && (
            <p style={{ fontSize: "0.8rem", color: "var(--red)", margin: 0 }}>
              Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "loading"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: state === "loading" ? "rgba(124,109,255,0.5)" : "var(--accent-grad)",
              color: "#fff",
              padding: "0.85rem 1.75rem",
              borderRadius: 10,
              fontSize: "0.9rem",
              fontWeight: 600,
              border: "none",
              cursor: state === "loading" ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => { if (state !== "loading") { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {state === "loading" ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </>
            )}
          </button>

          {/* Form note */}
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
            Or reach us directly on{" "}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", textDecoration: "none", fontWeight: 600 }}>
              WhatsApp
            </a>
            {" "}for a faster response.
          </p>
        </form>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: var(--text-muted); }
      `}</style>
    </div>
  );
}

/* ── Main export ── */
export default function KontakContent() {
  return (
    <section style={{ padding: "2rem 0 6rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-[380px_1fr]"
          style={{ gap: "3rem", alignItems: "start" }}
        >
          <InfoPanel />
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
