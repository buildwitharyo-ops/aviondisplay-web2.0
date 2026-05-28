import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/lib/products";

const BASE = "https://aviondisplay.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const products = getAllProducts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE}/produk/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    { url: `${BASE}`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/produk`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/solusi`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/teknologi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/kontak`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    ...productUrls,
    ...blogUrls,
  ];
}
