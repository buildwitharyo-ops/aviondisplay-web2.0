"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/blog";
import { formatDateId } from "@/lib/utils";

/* ── Sidebar CTA ── */
export function SidebarCTA() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(107,92,255,0.12), rgba(139,123,255,0.06))",
      border: "1px solid rgba(124,109,255,0.25)",
      borderRadius: 16, padding: "1.5rem",
      display: "flex", flexDirection: "column", gap: "1rem",
      backdropFilter: "blur(12px)",
    }}>
      <p style={{ fontSize: "0.78rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", margin: 0 }}>
        Tertarik?
      </p>
      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", margin: 0, lineHeight: 1.4 }}>
        Konsultasi produk kami secara gratis
      </p>
      <p style={{ fontSize: "0.8rem", color: "var(--text-sub)", margin: 0, lineHeight: 1.6 }}>
        Tim AVION siap membantu menemukan solusi display yang tepat untuk ruangan Anda.
      </p>
      <a
        href="https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+baru+membaca+artikel+di+blog+AVION+dan+ingin+konsultasi!"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          background: "var(--accent-grad)", color: "#fff",
          padding: "0.7rem 1rem", borderRadius: 10,
          fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat via WhatsApp
      </a>
    </div>
  );
}

/* ── Share panel ── */
export function SharePanel({ title, url }: { title: string; url: string }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: 16, padding: "1.25rem", backdropFilter: "blur(12px)",
    }}>
      <p style={{ fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.85rem" }}>
        Share Artikel
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <a
          href={`https://api.whatsapp.com/send/?text=${encodeURIComponent(title + " — " + url)}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.6rem 0.85rem", borderRadius: 10,
            background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)",
            color: "var(--green)", fontSize: "0.8rem", fontWeight: 600,
            textDecoration: "none", transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Share via WhatsApp
        </a>

        <button
          onClick={() => navigator.clipboard.writeText(url)}
          style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.6rem 0.85rem", borderRadius: 10,
            background: "var(--surface-md)", border: "1px solid var(--border)",
            color: "var(--text-sub)", fontSize: "0.8rem", fontWeight: 600,
            cursor: "pointer", transition: "border-color 0.2s", width: "100%",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hi)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  );
}

/* ── Article footer CTA ── */
export function ArticleFooterCTA() {
  return (
    <div style={{
      marginTop: "2.5rem",
      background: "linear-gradient(135deg, rgba(107,92,255,0.1), rgba(139,123,255,0.05))",
      border: "1px solid rgba(124,109,255,0.2)",
      borderRadius: 16, padding: "1.75rem", backdropFilter: "blur(12px)",
    }}>
      <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.5rem" }}>
        Tertarik dengan produk AVION Display?
      </p>
      <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", margin: "0 0 1.25rem", lineHeight: 1.6 }}>
        Konsultasikan kebutuhan ruangan Anda dengan tim kami — gratis, tanpa komitmen.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <a
          href="https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+baru+membaca+artikel+blog+AVION+dan+ingin+konsultasi!"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            background: "var(--accent-grad)", color: "#fff",
            padding: "0.65rem 1.25rem", borderRadius: 10,
            fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Konsultasi Sekarang
        </a>
        <Link
          href="/produk"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            background: "var(--surface-md)", color: "var(--text)",
            padding: "0.65rem 1.25rem", borderRadius: 10,
            fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
            border: "1px solid var(--border)", transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hi)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          Lihat Produk
        </Link>
      </div>
    </div>
  );
}

/* ── Related post card (hover) ── */
export function RelatedPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, overflow: "hidden", backdropFilter: "blur(12px)",
          transition: "border-color 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hi)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
        </div>
        <div style={{ padding: "1rem" }}>
          <p style={{
            fontSize: "0.82rem", fontWeight: 700, color: "var(--text)",
            margin: "0 0 0.35rem", lineHeight: 1.4,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.title}
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)", margin: 0 }}>
            {formatDateId(post.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ── Back link ── */
export function BackLink() {
  return (
    <Link
      href="/blog"
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.4rem",
        fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "none",
        marginBottom: "2rem", fontFamily: "var(--font-dm-mono)",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7H2M6 3L2 7l4 4" />
      </svg>
      Kembali ke Blog
    </Link>
  );
}
