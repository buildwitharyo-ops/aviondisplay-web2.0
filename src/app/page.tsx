import HeroSection from "@/components/home/HeroSection";
import TickerBanner from "@/components/home/TickerBanner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import UseCases from "@/components/home/UseCases";
import TrustSection from "@/components/home/TrustSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "AVION Display — Interactive Flat Panel & Smart Display Solutions Indonesia",
  description:
    "AVION Interactive Flat Panel menghadirkan kejernihan 4K, kolaborasi AI, dan Dual OS untuk ruang meeting dan kelas modern. Solusi AV terpercaya di Indonesia.",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TickerBanner />
      <FeaturedProduct />
      <UseCases />
      <TrustSection />
      <CTABanner />
    </main>
  );
}
