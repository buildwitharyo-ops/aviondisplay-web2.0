import type { NextConfig } from "next";

function getSupabaseStorageHostname() {
  const rawUrl = process.env.SUPABASE_URL;
  if (!rawUrl) return undefined;

  try {
    return new URL(rawUrl).hostname;
  } catch {
    return undefined;
  }
}

const supabaseStorageHostname = getSupabaseStorageHostname();
const supabaseRemotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = supabaseStorageHostname
  ? [
      {
        protocol: "https",
        hostname: supabaseStorageHostname,
        port: "",
        pathname: `/storage/v1/object/public/${process.env.SUPABASE_BUCKET ?? "blog-images"}/**`,
        search: "",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseRemotePatterns,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
