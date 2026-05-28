import type { Metadata } from "next";

export const SITE_URL = "https://aviondisplay.com";
export const SITE_NAME = "AVION Display";
export const SITE_LOCALE = "id_ID";
export const DEFAULT_OG_IMAGE = "/assets/image/og-home.jpg";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
