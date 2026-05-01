import ProdukHero from "@/components/produk/ProdukHero";
import AXSeriesSection from "@/components/produk/AXSeriesSection";
import AXProSection from "@/components/produk/AXProSection";
import DigitalSignageSection from "@/components/produk/DigitalSignageSection";
import BroadcastSection from "@/components/produk/BroadcastSection";
import LEDWallSection from "@/components/produk/LEDWallSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "Produk AVION Display — Interactive Flat Panel, Digital Signage, LED Wall Indonesia",
  description:
    "Temukan lengkap produk AVION: Interactive Flat Panel AX Series, Digital Signage, Broadcast Devices, dan LED Wall. Solusi display enterprise untuk setiap kebutuhan.",
};

const WA_CONSULT =
  "https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+konsultasi+produk+AVION+Display!";

export default function ProdukPage() {
  return (
    <main>
      <ProdukHero />
      <AXSeriesSection />
      <AXProSection />
      <DigitalSignageSection />
      <BroadcastSection />
      <LEDWallSection />
      <CTABanner
        title="Not Sure Which Product Fits Your Space?"
        subtitle="Tim kami siap membantu Anda menemukan solusi yang tepat — dari satu ruang meeting hingga implementasi satu gedung penuh."
        buttonText="Free Consultation"
        waUrl={WA_CONSULT}
      />
    </main>
  );
}
