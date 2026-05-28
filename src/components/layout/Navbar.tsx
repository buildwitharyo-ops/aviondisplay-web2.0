"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAllProducts } from "@/lib/products";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!";

const PRODUCTS = getAllProducts();

const NAV_LINKS = [
  { href: "/produk", label: "Produk", hasDropdown: true },
  { href: "/solusi", label: "Solusi", hasDropdown: false },
  { href: "/teknologi", label: "Teknologi", hasDropdown: false },
  { href: "/blog", label: "Blog", hasDropdown: false },
  { href: "/kontak", label: "Kontak", hasDropdown: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [produkOpen, setProdukOpen] = useState(false);
  const [mobileProdukOpen, setMobileProdukOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const produkWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer + dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
    setProdukOpen(false);
    setMobileProdukOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown on Escape + click-outside
  useEffect(() => {
    if (!produkOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProdukOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (produkWrapRef.current && !produkWrapRef.current.contains(e.target as Node)) {
        setProdukOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [produkOpen]);

  const openProduk = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProdukOpen(true);
  };
  const scheduleCloseProduk = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProdukOpen(false), 120);
  };

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
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, hasDropdown }) => {
              const active = pathname === href || pathname.startsWith(href + "/");

              if (hasDropdown) {
                return (
                  <div
                    key={href}
                    ref={produkWrapRef}
                    onMouseEnter={openProduk}
                    onMouseLeave={scheduleCloseProduk}
                    onFocus={openProduk}
                    onBlur={scheduleCloseProduk}
                    style={{ position: "relative" }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                      <Link
                        href={href}
                        style={{
                          padding: "0.45rem 0.55rem 0.45rem 0.85rem",
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
                      <button
                        type="button"
                        aria-label="Tampilkan daftar produk"
                        aria-expanded={produkOpen}
                        onClick={() => setProdukOpen((v) => !v)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "0.45rem 0.55rem",
                          color: active ? "#fff" : "var(--text-sub)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: produkOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.18s ease",
                          }}
                          aria-hidden
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" />
                        </svg>
                      </button>
                    </div>

                    {produkOpen && (
                      <div
                        role="menu"
                        style={{
                          position: "absolute",
                          top: "calc(100% + 0.5rem)",
                          left: 0,
                          minWidth: 360,
                          background: "rgba(14,14,20,0.96)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                          padding: "0.5rem",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        {PRODUCTS.map((p) => {
                          const productActive = pathname === `/produk/${p.slug}`;
                          return (
                            <Link
                              key={p.slug}
                              href={`/produk/${p.slug}`}
                              role="menuitem"
                              style={{
                                display: "flex",
                                gap: "0.75rem",
                                alignItems: "flex-start",
                                padding: "0.7rem 0.8rem",
                                borderRadius: 10,
                                textDecoration: "none",
                                color: "var(--text)",
                                background: productActive ? "rgba(124,109,255,0.10)" : "transparent",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(124,109,255,0.10)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = productActive
                                  ? "rgba(124,109,255,0.10)"
                                  : "transparent";
                              }}
                            >
                              <span
                                aria-hidden
                                style={{
                                  width: 6,
                                  height: 6,
                                  marginTop: "0.55rem",
                                  borderRadius: "50%",
                                  background: "var(--accent)",
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>
                                  {p.shortName}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    color: "var(--text-sub)",
                                    fontFamily: "var(--font-dm-mono)",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {p.categoryLabel}
                                </span>
                              </span>
                            </Link>
                          );
                        })}

                        <div
                          style={{
                            height: 1,
                            background: "rgba(255,255,255,0.06)",
                            margin: "0.35rem 0.5rem",
                          }}
                        />
                        <Link
                          href="/produk"
                          role="menuitem"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.6rem 0.8rem",
                            borderRadius: 10,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "var(--accent-2)",
                            textDecoration: "none",
                          }}
                        >
                          Lihat semua produk
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M2 6.5h9M8 3l3.5 3.5L8 10" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

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
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </svg>
            ) : (
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
            overflowY: "auto",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
            {NAV_LINKS.map(({ href, label, hasDropdown }) => {
              const active = pathname === href || pathname.startsWith(href + "/");

              if (hasDropdown) {
                return (
                  <div key={href} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Link
                        href={href}
                        style={{
                          flex: 1,
                          padding: "1rem 0.5rem",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: active ? "#ffffff" : "var(--text-sub)",
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </Link>
                      <button
                        type="button"
                        aria-label={mobileProdukOpen ? "Tutup daftar produk" : "Buka daftar produk"}
                        aria-expanded={mobileProdukOpen}
                        onClick={() => setMobileProdukOpen((v) => !v)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "1rem",
                          color: active ? "#fff" : "var(--text-sub)",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: mobileProdukOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.18s ease",
                          }}
                          aria-hidden
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" />
                        </svg>
                      </button>
                    </div>
                    {mobileProdukOpen && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 0 1rem 0.5rem" }}>
                        {PRODUCTS.map((p) => {
                          const productActive = pathname === `/produk/${p.slug}`;
                          return (
                            <Link
                              key={p.slug}
                              href={`/produk/${p.slug}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.65rem",
                                padding: "0.7rem 0.6rem",
                                borderRadius: 10,
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                color: productActive ? "#fff" : "var(--text-sub)",
                                textDecoration: "none",
                                background: productActive ? "rgba(124,109,255,0.10)" : "transparent",
                              }}
                            >
                              <span
                                aria-hidden
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  background: "var(--accent)",
                                  flexShrink: 0,
                                }}
                              />
                              {p.shortName}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

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
