import KontakHero from "@/components/kontak/KontakHero";
import KontakContent from "@/components/kontak/KontakContent";

export const metadata = {
  title: "Kontak AVION Display — Konsultasi Gratis Display & AV Solution",
  description:
    "Hubungi tim AVION Display untuk konsultasi gratis, demo produk, atau penawaran khusus. WhatsApp, email, atau isi form di sini.",
};

export default function KontakPage() {
  return (
    <main>
      <KontakHero />
      <KontakContent />
    </main>
  );
}
