import SolusiHero from "@/components/solusi/SolusiHero";
import SolusiSections from "@/components/solusi/SolusiSections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solusi AVION Display — Smart Classroom, Meeting Room, Digital Signage, LED Wall Indonesia",
  description:
    "AVION menawarkan solusi lengkap: Smart Classroom, Meeting Room System, Digital Signage CMS, LED Display, dan Integrated AV Control untuk enterprise Indonesia.",
  path: "/solusi",
});

export default function SolusiPage() {
  return (
    <main>
      <SolusiHero />
      <SolusiSections />
    </main>
  );
}
