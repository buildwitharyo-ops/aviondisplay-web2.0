import { SITE_URL, SITE_NAME } from "./seo";

const LOGO_URL = `${SITE_URL}/assets/image/NEW-AVION.png`;
const PHONE = "+62-815-6390-5555";

export const ORG_SAMEAS = [
  "https://www.instagram.com/aviondisplay",
  "https://www.linkedin.com/company/aviondisplay",
  "https://www.youtube.com/@aviondisplay",
  "https://www.tiktok.com/@aviondisplay",
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: ORG_SAMEAS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "sales",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: SITE_NAME,
    image: LOGO_URL,
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
      { "@type": "City", name: "Jakarta" },
      { "@type": "City", name: "Tangerang" },
      { "@type": "City", name: "Bandung" },
      { "@type": "City", name: "Surabaya" },
    ],
    sameAs: ORG_SAMEAS,
  };
}

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

type ProductSchemaInput = {
  name: string;
  description: string;
  image: string | string[];
  slug: string;
  sku?: string;
  brand?: string;
  category?: string;
};

export function productSchema({
  name,
  description,
  image,
  slug,
  sku,
  brand = "AVION",
  category,
}: ProductSchemaInput) {
  const images = (Array.isArray(image) ? image : [image]).map((img) =>
    img.startsWith("http") ? img : `${SITE_URL}${img}`,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: images,
    brand: { "@type": "Brand", name: brand },
    ...(sku ? { sku } : {}),
    ...(category ? { category } : {}),
    url: `${SITE_URL}/produk/${slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/produk/${slug}`,
      seller: { "@id": `${SITE_URL}#organization` },
    },
  };
}

type BlogPostingSchemaInput = {
  title: string;
  description: string;
  image: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
};

export function blogPostingSchema({
  title,
  description,
  image,
  slug,
  datePublished,
  dateModified,
  authorName,
}: BlogPostingSchemaInput) {
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };
}

type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
