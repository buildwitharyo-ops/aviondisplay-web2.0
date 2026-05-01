import SolusiHero from "@/components/solusi/SolusiHero";
import SolusiSections from "@/components/solusi/SolusiSections";

export const metadata = {
  title: "Solusi AVION Display — Smart Classroom, Meeting Room, Digital Signage, LED Wall Indonesia",
  description:
    "AVION menawarkan solusi lengkap: Smart Classroom, Meeting Room System, Digital Signage CMS, LED Display, dan Integrated AV Control untuk enterprise Indonesia.",
};

export default function SolusiPage() {
  return (
    <main>
      <SolusiHero />
      <SolusiSections />
    </main>
  );
}
