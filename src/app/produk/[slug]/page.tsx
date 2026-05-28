import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
  buildWhatsappUrl,
} from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import Breadcrumb from "@/components/produk/detail/Breadcrumb";
import CTABanner from "@/components/sections/CTABanner";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — Spesifikasi & Harga di Indonesia`,
    description: product.shortDescription,
    path: `/produk/${product.slug}`,
    image: product.image,
    imageAlt: product.imageAlt,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const waUrl = buildWhatsappUrl(product.whatsappMessage);

  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/produk" },
    { label: product.shortName },
  ];

  return (
    <main style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.shortDescription,
            image: product.image,
            slug: product.slug,
            sku: product.sku,
            category: product.categoryLabel,
          }),
          breadcrumbSchema(
            breadcrumbs.map((b) => ({
              name: b.label,
              url: b.href ?? `/produk/${product.slug}`,
            })),
          ),
        ]}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <Breadcrumb items={breadcrumbs} />

        <header
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "3rem", alignItems: "center", marginBottom: "4rem" }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-20%",
                background:
                  "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(107,92,255,0.18) 0%, transparent 65%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={580}
              height={420}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-dm-mono)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              {product.categoryLabel}
            </p>
            <h1
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "var(--accent-2)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {product.tagline}
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "var(--text-sub)",
                margin: 0,
              }}
            >
              {product.longDescription}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "0.75rem" }}>
              {product.highlights.map(({ value, label }) => (
                <div
                  key={label}
                  className="glass"
                  style={{ padding: "0.9rem 0.75rem", borderRadius: 12, textAlign: "center" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      lineHeight: 1.2,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-sub)",
                      fontFamily: "var(--font-dm-mono)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {product.features.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(124,109,255,0.08)",
                    border: "1px solid rgba(124,109,255,0.2)",
                    borderRadius: 999,
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.75rem",
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-dm-mono)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--accent-grad)",
                  color: "#fff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: 10,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Minta Penawaran
              </a>
              <Link
                href="/kontak"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--surface-md)",
                  color: "var(--text)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: 10,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </header>

        {/* Specifications */}
        <section style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.015em",
              color: "var(--text)",
              margin: "0 0 1.5rem",
            }}
          >
            Spesifikasi {product.shortName}
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.95rem",
                background: "var(--surface-md)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
                backdropFilter: "blur(12px)",
              }}
            >
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    style={{
                      borderBottom:
                        i === product.specs.length - 1 ? "none" : "1px solid var(--border)",
                    }}
                  >
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "0.85rem 1.1rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        width: "35%",
                        verticalAlign: "top",
                      }}
                    >
                      {spec.label}
                    </th>
                    <td
                      style={{
                        padding: "0.85rem 1.1rem",
                        color: "var(--text-sub)",
                        lineHeight: 1.6,
                      }}
                    >
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related products */}
        <RelatedProducts currentSlug={product.slug} />
      </div>

      <CTABanner
        title={`Tertarik dengan ${product.shortName}?`}
        subtitle="Hubungi tim AVION untuk konsultasi spesifikasi, demo produk, atau penawaran khusus untuk volume besar."
        buttonText="Hubungi via WhatsApp"
        waUrl={waUrl}
      />
    </main>
  );
}

function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const others = getAllProducts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (others.length === 0) return null;

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--text)",
          margin: "0 0 1.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        Produk Lainnya
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "1rem" }}
      >
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/produk/${p.slug}`}
            style={{
              display: "block",
              background: "var(--surface-md)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.1rem",
              textDecoration: "none",
              color: "var(--text)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent-2)",
                margin: "0 0 0.4rem",
              }}
            >
              {p.categoryLabel}
            </p>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.4rem" }}>
              {p.shortName}
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--text-sub)",
                margin: 0,
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {p.tagline}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
