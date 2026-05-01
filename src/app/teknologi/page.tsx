import TeknologiHero from "@/components/teknologi/TeknologiHero";
import TechSpecsSection from "@/components/teknologi/TechSpecsSection";
import FeatureHighlightsSection from "@/components/teknologi/FeatureHighlightsSection";
import SmartAccessoriesSection from "@/components/teknologi/SmartAccessoriesSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "Spesifikasi AVION AX Series — Interactive Flat Panel 4K Dual OS Indonesia",
  description:
    'Spesifikasi lengkap AVION AX Series: 4K UHD, 40-point touch, Android 14 + Intel i7 OPS, 360° audio. Tersedia ukuran 65", 75", 86", 98".',
};

const TOKOPEDIA_URL =
  "https://www.tokopedia.com/aviondisplay";

const TOKOPEDIA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#42b549" />
    <path
      d="M7 8h10M7 12h6M7 16h4"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function TeknologiPage() {
  return (
    <main>
      <TeknologiHero />
      <TechSpecsSection />
      <FeatureHighlightsSection />
      <SmartAccessoriesSection />
      <CTABanner
        title="Ready to Experience the AX Series?"
        subtitle="Konsultasikan kebutuhan ruangan Anda bersama tim AVION dan temukan konfigurasi yang tepat."
        buttonText="Konsultasi Sekarang"
        secondaryButton={{
          label: "Order via Tokopedia",
          href: TOKOPEDIA_URL,
          icon: TOKOPEDIA_ICON,
        }}
      />
    </main>
  );
}
