import ProdukHero from "@/components/produk/ProdukHero";
import AXSeriesSection from "@/components/produk/AXSeriesSection";
import AXProSection from "@/components/produk/AXProSection";
import DigitalSignageSection from "@/components/produk/DigitalSignageSection";
import BroadcastSection from "@/components/produk/BroadcastSection";
import LEDWallSection from "@/components/produk/LEDWallSection";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { getAllProducts } from "@/lib/products";

export const metadata = buildMetadata({
  title:
    "Produk AVION Display — Interactive Flat Panel, Digital Signage, LED Wall Indonesia",
  description:
    "Lineup lengkap AVION: Interactive Flat Panel AX Series & AX Pro, Digital Signage CMS, Broadcast Devices, dan LED Wall indoor/outdoor untuk kebutuhan enterprise Indonesia.",
  path: "/produk",
});

const WA_CONSULT =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+konsultasi+produk+AVION+Display!";

export default function ProdukPage() {
  const products = getAllProducts();

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Produk AVION Display",
    description:
      "Daftar lengkap produk AVION: Interactive Flat Panel, Digital Signage, Broadcast Devices, dan LED Wall.",
    url: `${SITE_URL}/produk`,
    isPartOf: { "@id": `${SITE_URL}#website` },
    publisher: { "@id": `${SITE_URL}#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/produk/${p.slug}`,
        name: p.name,
      })),
    },
  };

  return (
    <main>
      <JsonLd
        data={[
          collectionPageSchema,
          breadcrumbSchema([
            { name: "Beranda", url: "/" },
            { name: "Produk", url: "/produk" },
          ]),
        ]}
      />
      <ProdukHero />
      <AXSeriesSection />
      <AXProSection />
      <DigitalSignageSection />
      <BroadcastSection />
      <LEDWallSection />
      <CTABanner
        title="Belum yakin produk mana yang cocok untuk ruangan Anda?"
        subtitle={`${SITE_NAME} siap membantu Anda menemukan solusi yang tepat — dari satu ruang meeting hingga implementasi satu gedung penuh.`}
        buttonText="Konsultasi Gratis"
        waUrl={WA_CONSULT}
      />
    </main>
  );
}
