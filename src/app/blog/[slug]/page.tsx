import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, formatDateId } from "@/lib/blog";
import {
  BackLink,
  SidebarCTA,
  SharePanel,
  ArticleFooterCTA,
  RelatedPostCard,
} from "@/components/blog/BlogPostClient";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

/* ── Static params ── */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    imageAlt: post.title,
    type: "article",
    publishedTime: new Date(post.date).toISOString(),
    authors: [post.author],
  });
}

/* ── MDX custom components ── */
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{
      fontSize: "1.5rem", fontWeight: 800, color: "var(--text)",
      lineHeight: 1.25, letterSpacing: "-0.02em",
      margin: "2.5rem 0 1rem",
      paddingLeft: "1rem", borderLeft: "3px solid var(--accent)",
    }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{
      fontSize: "1.15rem", fontWeight: 700, color: "var(--text)",
      lineHeight: 1.35, margin: "2rem 0 0.75rem",
    }} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{
      fontSize: "1.0625rem", lineHeight: 1.85,
      color: "var(--text-sub)", margin: "0 0 1.25rem",
    }} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} style={{ color: "var(--accent-2)", textDecoration: "underline", textUnderlineOffset: 3 }} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} style={{ paddingLeft: "1.5rem", margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} style={{ paddingLeft: "1.5rem", margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-sub)" }} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} style={{
      borderLeft: "3px solid var(--accent)",
      background: "var(--surface-md)", backdropFilter: "blur(12px)",
      borderRadius: "0 12px 12px 0", padding: "1rem 1.25rem",
      margin: "1.5rem 0", fontStyle: "italic", color: "var(--text-sub)",
    }} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} style={{
      fontFamily: "var(--font-dm-mono)", fontSize: "0.85em",
      background: "rgba(124,109,255,0.1)", border: "1px solid rgba(124,109,255,0.2)",
      borderRadius: 6, padding: "0.15em 0.45em", color: "var(--accent-2)",
    }} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
      <table {...props} style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} style={{ textAlign: "left", padding: "0.65rem 1rem", background: "var(--surface-md)", color: "var(--text)", fontWeight: 700, borderBottom: "1px solid var(--border)" }} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} style={{ padding: "0.65rem 1rem", color: "var(--text-sub)", borderBottom: "1px solid var(--border)" }} />
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} style={{ width: "100%", borderRadius: 12, margin: "1.5rem 0" }} alt={props.alt ?? ""} />
  ),
};

/* ── Related posts (server, uses client card) ── */
async function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const all = await getAllPosts();
  const related = all
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", margin: "0 0 1.5rem", letterSpacing: "-0.01em" }}>
        Artikel Terkait
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1rem" }}>
        {related.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const shareUrl = `https://aviondisplay.com/blog/${post.slug}`;

  return (
    <main style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            slug: post.slug,
            datePublished: new Date(post.date).toISOString(),
            authorName: post.author,
          }),
          breadcrumbSchema([
            { name: "Beranda", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <BackLink />

        {/* Article header */}
        <header style={{ maxWidth: 760, marginBottom: "2rem" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(124,109,255,0.12)", border: "1px solid rgba(124,109,255,0.25)",
            borderRadius: 999, padding: "0.25rem 0.75rem",
            fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)",
            color: "var(--accent-2)", fontWeight: 600, letterSpacing: "0.06em",
            marginBottom: "1rem",
          }}>
            {post.category}
          </span>

          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800,
            lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "var(--text)", margin: "0 0 1.25rem",
          }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {post.author}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {formatDateId(post.date)}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-dm-mono)" }}>
              {post.readTime} min read
            </span>
          </div>
        </header>

        {/* Cover image */}
        <div className="aspect-video lg:aspect-[21/9]" style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: "3rem" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        </div>

        {/* 2-col: article + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]" style={{ gap: "3rem", alignItems: "start" }}>
          {/* Article body */}
          <article style={{ maxWidth: 720 }}>
            <MDXRemote source={post.content} components={mdxComponents} />

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.7rem", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
                  Tags
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{
                      background: "var(--surface-md)", border: "1px solid var(--border)",
                      borderRadius: 999, padding: "0.3rem 0.75rem",
                      fontSize: "0.75rem", color: "var(--text-sub)", fontFamily: "var(--font-dm-mono)",
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ArticleFooterCTA />
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </article>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "6rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <SharePanel title={post.title} url={shareUrl} />
            <SidebarCTA />
          </aside>
        </div>
      </div>
    </main>
  );
}
