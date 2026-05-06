"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/blog";
import { formatDateId } from "@/lib/utils";

/* ── Featured card (full width) ── */
export function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none" }}>
      <article
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
          backdropFilter: "blur(16px)",
          transition: "border-color 0.25s, transform 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hi)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Cover image */}
        <div style={{ position: "relative", aspectRatio: "16/9", minHeight: 240 }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, rgba(10,10,15,0.6))",
          }} />
        </div>

        {/* Content */}
        <div style={{
          padding: "2.5rem",
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "1.1rem",
        }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{
              background: "rgba(124,109,255,0.15)", border: "1px solid rgba(124,109,255,0.3)",
              borderRadius: 999, padding: "0.25rem 0.75rem",
              fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)",
              color: "var(--accent-2)", fontWeight: 600, letterSpacing: "0.06em",
            }}>
              {post.category}
            </span>
            <span style={{
              background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: 999, padding: "0.25rem 0.75rem",
              fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)",
              color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em",
            }}>
              ✦ Featured
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 800,
            lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--text)", margin: 0,
          }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-sub)", margin: 0 }}>
            {post.excerpt}
          </p>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {formatDateId(post.date)}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {post.readTime} min read
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-2)", fontSize: "0.875rem", fontWeight: 600 }}>
            Baca Selengkapnya
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Post grid card ── */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
      <article
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          backdropFilter: "blur(16px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.25s, transform 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hi)";
          e.currentTarget.style.transform = "translateY(-5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Cover */}
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
          <span style={{
            display: "inline-block", alignSelf: "flex-start",
            background: "rgba(124,109,255,0.1)", border: "1px solid rgba(124,109,255,0.22)",
            borderRadius: 999, padding: "0.2rem 0.65rem",
            fontSize: "0.67rem", fontFamily: "var(--font-dm-mono)",
            color: "var(--accent-2)", fontWeight: 600, letterSpacing: "0.06em",
          }}>
            {post.category}
          </span>

          <h3 style={{
            fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.4,
            letterSpacing: "-0.01em", color: "var(--text)", margin: 0,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.title}
          </h3>

          <p style={{
            fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-sub)", margin: 0, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.excerpt}
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: "0.65rem",
            marginTop: "auto", paddingTop: "0.5rem",
            borderTop: "1px solid var(--border)",
          }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {formatDateId(post.date)}
            </span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {post.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
