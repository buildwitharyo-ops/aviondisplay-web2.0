"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";

const NAV_LINKS = [
  { href: "/produk", label: "Produk" },
  { href: "/solusi", label: "Solusi" },
  { href: "/teknologi", label: "Teknologi" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/assets/image/NEW-AVION.png"
              alt="AVION Display"
              width={120}
              height={36}
              priority
              style={{ objectFit: "contain", height: 36, width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#ffffff" : "var(--text-sub)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              background: "var(--accent-grad)",
              color: "#fff",
              padding: "0.5rem 1.25rem",
              borderRadius: 9,
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Konsultasi
          </a>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className="flex md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {menuOpen ? (
              /* X icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="6" x2="20" y2="6" />
                <line x1="2" y1="11" x2="20" y2="11" />
                <line x1="2" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            paddingTop: 88,
            paddingBottom: 40,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: "1rem 0.5rem",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: active ? "#ffffff" : "var(--text-sub)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "var(--accent-grad)",
              color: "#fff",
              padding: "1rem",
              borderRadius: 12,
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
