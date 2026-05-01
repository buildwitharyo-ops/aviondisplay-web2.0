import { getAllPosts } from "@/lib/blog";
import { FeaturedCard, PostCard } from "@/components/blog/BlogCards";

export const metadata = {
  title: "Blog AVION Display — Insight Dunia Interactive Display & AV Technology",
  description:
    "Baca artikel terbaru seputar interactive flat panel, digital signage, teknologi AV, dan tips kolaborasi modern dari tim AVION Display.",
};

function EmptyState() {
  return (
    <div style={{
      textAlign: "center", padding: "5rem 1rem",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
    }}>
      <div style={{ fontSize: "3rem" }}>📝</div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>
        Belum ada artikel
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", margin: 0 }}>
        Segera hadir! Tim kami sedang menyiapkan konten terbaik untuk Anda.
      </p>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Hero */}
        <div style={{
          textAlign: "center", marginBottom: "4rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(124,109,255,0.12)", border: "1px solid rgba(124,109,255,0.25)",
            borderRadius: 999, padding: "0.35rem 1rem",
            fontSize: "0.72rem", fontFamily: "var(--font-dm-mono)",
            fontWeight: 500, letterSpacing: "0.1em",
            color: "var(--accent-2)", textTransform: "uppercase",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "var(--accent)",
              display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            Insights & Resources
          </span>

          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            margin: 0,
          }}>
            The AVION Blog
          </h1>

          <p style={{
            fontSize: "1.05rem", lineHeight: 1.75,
            color: "var(--text-sub)", maxWidth: 520, margin: 0,
          }}>
            Tips, insight, dan update terbaru seputar teknologi display interaktif dan solusi AV modern.
          </p>
        </div>

        {/* Content */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {featured && <FeaturedCard post={featured} />}

            {rest.length > 0 && (
              <div>
                <h2 style={{
                  fontSize: "1rem", fontWeight: 700, color: "var(--text)",
                  margin: "0 0 1.5rem", letterSpacing: "-0.01em",
                }}>
                  Artikel Lainnya
                </h2>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: "1.25rem" }}
                >
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </main>
  );
}
