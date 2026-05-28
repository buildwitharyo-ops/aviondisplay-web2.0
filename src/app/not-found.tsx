import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description:
    "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda AVION Display untuk menjelajahi produk Interactive Flat Panel, Digital Signage, dan LED Wall.",
  robots: { index: false, follow: true },
};

const LINKS: { href: string; label: string; desc: string }[] = [
  { href: "/", label: "Beranda", desc: "Kembali ke halaman utama" },
  { href: "/produk", label: "Produk", desc: "Lihat seluruh lineup AVION" },
  { href: "/solusi", label: "Solusi", desc: "Smart classroom, meeting room, signage" },
  { href: "/blog", label: "Blog", desc: "Artikel & panduan display interaktif" },
  { href: "/kontak", label: "Kontak", desc: "Konsultasi gratis dengan tim kami" },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1.5rem 6rem",
      }}
    >
      <div style={{ maxWidth: 720, width: "100%", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            margin: "0 0 1rem",
          }}
        >
          Error 404
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: "0 0 1rem",
          }}
        >
          Halaman tidak ditemukan
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "var(--text-sub)",
            margin: "0 auto 2.5rem",
            maxWidth: 520,
          }}
        >
          URL yang Anda buka mungkin sudah dipindahkan atau tidak pernah ada.
          Coba salah satu halaman berikut.
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "0.75rem", textAlign: "left" }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                background: "var(--surface-md)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "1rem 1.1rem",
                textDecoration: "none",
                color: "var(--text)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  margin: "0 0 0.25rem",
                }}
              >
                {link.label}
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-sub)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {link.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
