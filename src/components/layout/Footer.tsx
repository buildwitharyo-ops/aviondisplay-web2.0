"use client";

import Link from "next/link";
import Image from "next/image";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";
const TOKOPEDIA_URL =
  "https://www.tokopedia.com/central-audio-visual/etalase/interactive-display";

const COLUMNS = [
  {
    title: "Produk",
    links: [
      { href: "/produk#ax-series", label: "AX Series" },
      { href: "/produk#ax-pro", label: "AX Pro Series" },
      { href: "/produk#signage", label: "Digital Signage" },
      { href: "/produk#broadcast", label: "Broadcast Devices" },
      { href: "/produk#led-wall", label: "LED Wall" },
    ],
  },
  {
    title: "Solusi",
    links: [
      { href: "/solusi#smart-classroom", label: "Smart Classroom" },
      { href: "/solusi#meeting-room", label: "Smart Meeting Room" },
      { href: "/solusi#signage-cms", label: "Digital Signage & CMS" },
      { href: "/solusi#led-display", label: "LED Display" },
      { href: "/solusi#av-control", label: "Integrated AV Control" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { href: "/teknologi", label: "Teknologi" },
      { href: "/blog", label: "Blog" },
      { href: "/kontak", label: "Kontak" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(10,10,15,0.8)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
        }}
      >
        {/* Top row: logo + 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/">
              <Image
                src="/assets/image/NEW-AVION.png"
                alt="AVION Display"
                width={110}
                height={32}
                style={{ objectFit: "contain", height: 32, width: "auto" }}
              />
            </Link>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                maxWidth: 220,
              }}
            >
              Solusi display interaktif enterprise terbaik di Indonesia.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-sub)",
                  fontFamily: "var(--font-dm-mono)",
                }}
              >
                {col.title}
              </p>
              {col.links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            © 2026 AVION Display. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "var(--green)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            <a
              href={TOKOPEDIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Image
                src="/assets/image/tokopedia-icon.png"
                alt="Tokopedia"
                width={15}
                height={15}
                style={{ objectFit: "contain" }}
              />
              Tokopedia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
