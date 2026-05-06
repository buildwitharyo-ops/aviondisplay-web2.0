import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne } from "next/font/google";
import "./globals.css";
import SceneBackground from "@/components/ui/SceneBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aviondisplay.com"),
  title: {
    default: "AVION Display — Interactive Flat Panel & AV Solutions Indonesia",
    template: "%s | AVION Display",
  },
  description:
    "AVION Display menghadirkan Interactive Flat Panel 4K, Digital Signage, LED Wall, dan solusi AV enterprise terbaik di Indonesia. Konsultasi gratis untuk kebutuhan display Anda.",
  keywords: [
    "interactive flat panel",
    "smartboard indonesia",
    "layar interaktif",
    "digital signage",
    "LED wall",
    "AV solution",
    "AVION display",
    "interactive display",
  ],
  authors: [{ name: "AVION Display" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aviondisplay.com",
    siteName: "AVION Display",
    title: "AVION Display — Interactive Flat Panel & AV Solutions Indonesia",
    description:
      "AVION Display menghadirkan Interactive Flat Panel 4K, Digital Signage, LED Wall, dan solusi AV enterprise terbaik di Indonesia. Konsultasi gratis untuk kebutuhan display Anda.",
    images: [
      {
        url: "/assets/image/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "AVION Display — Interactive Flat Panel & AV Solutions Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVION Display — Interactive Flat Panel & AV Solutions Indonesia",
    description:
      "AVION Display menghadirkan Interactive Flat Panel 4K, Digital Signage, LED Wall, dan solusi AV enterprise terbaik di Indonesia.",
    images: ["/assets/image/og-home.jpg"],
  },
  robots: { index: true, follow: true },
  verification: { google: "PLACEHOLDER_GOOGLE_VERIFICATION" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${dmMono.variable} ${syne.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AVION Display",
              url: "https://aviondisplay.com",
              logo: "https://aviondisplay.com/assets/image/NEW-AVION.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-815-6390-5555",
                contactType: "sales",
                availableLanguage: ["Indonesian", "English"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tangerang",
                addressCountry: "ID",
              },
            }),
          }}
        />
        <SceneBackground />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
