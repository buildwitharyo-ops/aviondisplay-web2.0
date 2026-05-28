import KontakHero from "@/components/kontak/KontakHero";
import KontakContent from "@/components/kontak/KontakContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontak AVION Display — Konsultasi Gratis Display & AV Solution",
  description:
    "Hubungi tim AVION Display untuk konsultasi gratis, demo produk, atau penawaran khusus. WhatsApp, email, atau isi form di sini.",
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <main>
      <KontakHero />
      <KontakContent />
    </main>
  );
}
