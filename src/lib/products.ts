export type ProductCategory =
  | "interactive-flat-panel"
  | "digital-signage"
  | "broadcast"
  | "led-wall";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: { value: string; label: string }[];
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  sku?: string;
  whatsappMessage: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "ax-series",
    name: "AVION AX Series Interactive Flat Panel",
    shortName: "AVION AX Series",
    category: "interactive-flat-panel",
    categoryLabel: "Interactive Flat Panel",
    tagline: "Solusi layar interaktif untuk meeting dan presentasi modern.",
    shortDescription:
      'AVION AX Series adalah Interactive Flat Panel 4K UHD dengan multi-touch 40 titik, Dual OS Android 14 + Intel i7 OPS, microphone array 360°, dan AI meeting tools. Tersedia ukuran 65", 75", 86", 98".',
    longDescription:
      "AVION AX Series adalah interactive flat panel yang dirancang untuk transformasi ruang kerja dan ruang belajar modern. Dibekali dengan panel 4K UHD anti-glare, sistem Dual OS Android 14 dan Windows berbasis Intel i7 OPS, serta teknologi multi-touch 40 titik dengan akurasi ±1mm — AX Series menghadirkan pengalaman kolaborasi yang intuitif dan produktif. Dilengkapi dengan AI meeting tools, microphone array 360°, dan opsi kamera 48MP untuk video conference berkualitas tinggi.",
    highlights: [
      { value: "4K UHD", label: "Display" },
      { value: "40pt", label: "Multi-touch" },
      { value: "Dual OS", label: "System" },
      { value: "48MP", label: "Camera (Opt.)" },
    ],
    features: [
      "Android 14",
      "Intel i7 OPS",
      "360° Audio",
      "Infinite Whiteboard",
      "AI Meeting Tools",
    ],
    specs: [
      { label: "Resolusi", value: "4K UHD (3840 × 2160)" },
      { label: "Multi-touch", value: "40 titik, akurasi ±1mm" },
      { label: "Sistem Operasi", value: "Dual OS — Android 14 + Windows (Intel i7 OPS)" },
      { label: "Audio", value: "360° microphone array" },
      { label: "Kamera", value: "48MP (opsional)" },
      { label: "Ukuran tersedia", value: '65", 75", 86", 98"' },
      { label: "Konektivitas", value: "HDMI, USB-C, Wi-Fi, Bluetooth, LAN" },
      { label: "Fitur kolaborasi", value: "Infinite Whiteboard, screen sharing, AI Meeting Tools" },
    ],
    image: "/assets/image/AVION AX SERIES.png",
    imageAlt: "AVION AX Series Interactive Flat Panel 4K UHD",
    whatsappMessage: "Halo, saya mau bertanya tentang AVION AX Series!",
  },
  {
    slug: "ax-pro",
    name: "AVION AX Pro Series Interactive Flat Panel",
    shortName: "AVION AX Pro Series",
    category: "interactive-flat-panel",
    categoryLabel: "Interactive Flat Panel · Premium",
    tagline: "Dirancang untuk penggunaan intensif dan kebutuhan skala besar.",
    shortDescription:
      "AVION AX Pro Series adalah Interactive Flat Panel commercial-grade premium dengan panel high-brightness, processing enhanced, dan ketahanan 16 jam pemakaian harian — ideal untuk auditorium, ruang pelatihan skala besar, dan deployment enterprise multi-unit.",
    longDescription:
      "AVION AX Pro Series adalah evolusi dari AX Series — dibangun dengan standar commercial grade untuk lingkungan yang menuntut performa tinggi setiap hari. Dengan panel premium high-brightness, processing yang ditingkatkan, dan ketahanan hingga 16 jam pemakaian harian, AX Pro adalah pilihan utama untuk auditorium, ruang pelatihan skala besar, dan deployment enterprise multi-unit.",
    highlights: [
      { value: "Pro", label: "Grade Panel" },
      { value: "4K UHD", label: "Display" },
      { value: "High", label: "Brightness" },
      { value: "16hr", label: "Daily Use" },
    ],
    features: [
      "Enhanced Processing",
      "Commercial Grade",
      "AI Integration",
      "Premium Build",
    ],
    specs: [
      { label: "Panel grade", value: "Commercial-grade premium" },
      { label: "Resolusi", value: "4K UHD" },
      { label: "Brightness", value: "High-brightness panel" },
      { label: "Daily use", value: "Hingga 16 jam pemakaian harian" },
      { label: "Sistem Operasi", value: "Dual OS — Android + Windows (OPS)" },
      { label: "AI", value: "Integrated AI meeting & collaboration tools" },
      { label: "Build", value: "Premium commercial-grade chassis" },
    ],
    image: "/assets/image/AVION AX SERIES.png",
    imageAlt: "AVION AX Pro Series Interactive Flat Panel premium commercial-grade",
    whatsappMessage: "Halo, saya mau bertanya tentang AVION AX Pro Series!",
  },
  {
    slug: "digital-signage",
    name: "AVION Digital Signage & CMS System",
    shortName: "Digital Signage",
    category: "digital-signage",
    categoryLabel: "Digital Communication",
    tagline: "Brand Anda selalu aktif. Pesan Anda selalu tepat sasaran.",
    shortDescription:
      "AVION Digital Signage adalah hardware display + Cloud CMS untuk mengelola jaringan layar di banyak lokasi dari satu dashboard. Penjadwalan konten, monitoring real-time, dan update jarak jauh untuk retail, hotel, dan gedung perkantoran.",
    longDescription:
      "Kelola jaringan display Anda dari satu dashboard cloud yang powerful. Jadwalkan konten, monitor performa layar secara real-time, dan perbarui pesan ke seluruh lokasi seketika — tanpa perlu hadir di tempat. Ideal untuk retail, hotel, rumah sakit, dan gedung perkantoran dengan kebutuhan komunikasi visual yang dinamis.",
    highlights: [
      { value: "Cloud", label: "CMS" },
      { value: "4K", label: "Content" },
      { value: "Multi", label: "Screen" },
      { value: "24/7", label: "Uptime" },
    ],
    features: [
      "Cloud-based CMS",
      "Remote Management",
      "Content Scheduling",
      "Multi-location",
      "Real-time Updates",
    ],
    specs: [
      { label: "Manajemen konten", value: "Cloud-based CMS dengan dashboard terpadu" },
      { label: "Konten support", value: "4K UHD, video, image, HTML5, RSS" },
      { label: "Multi-screen", value: "Mendukung deployment multi-lokasi" },
      { label: "Uptime", value: "24/7 operation" },
      { label: "Akses", value: "Web dashboard + mobile app" },
      { label: "Use case", value: "Retail, hotel, rumah sakit, perkantoran, transportasi" },
    ],
    image: "/assets/image/og-home.jpg",
    imageAlt: "AVION Digital Signage dengan Cloud CMS untuk multi-lokasi",
    whatsappMessage: "Halo, saya mau bertanya tentang Digital Signage AVION!",
  },
  {
    slug: "broadcast",
    name: "AVION Broadcast & Streaming Devices",
    shortName: "Broadcast Devices",
    category: "broadcast",
    categoryLabel: "Live Production",
    tagline: "Siaran langsung 4K profesional ke berbagai platform sekaligus.",
    shortDescription:
      "AVION Broadcast & Streaming Devices adalah hardware encoder profesional untuk live streaming 4K ke YouTube, Zoom, Teams, dan RTMP. Input HDMI/SDI, low-latency, ideal untuk acara korporat, webinar, dan produksi konten skala besar.",
    longDescription:
      "Perangkat broadcast profesional yang memudahkan siaran langsung berkualitas 4K ke berbagai platform sekaligus. Dengan encoder hardware bertenaga tinggi, input HDMI dan SDI, serta latensi ultra-rendah — ideal untuk acara korporat, webinar, siaran kampus, dan produksi konten skala besar.",
    highlights: [
      { value: "4K", label: "Stream" },
      { value: "Low", label: "Latency" },
      { value: "Multi", label: "Platform" },
      { value: "Pro", label: "Grade Encoder" },
    ],
    features: [
      "4K Encoding",
      "HDMI / SDI Input",
      "Low Latency",
      "YouTube / Zoom",
      "Plug & Play",
    ],
    specs: [
      { label: "Encoder", value: "Hardware-based H.265, hingga 4K 60fps" },
      { label: "Input", value: "HDMI, SDI, USB-C, Audio" },
      { label: "Output platforms", value: "YouTube, Zoom, Teams, RTMP custom" },
      { label: "Latency", value: "Ultra-low untuk live broadcast" },
      { label: "Operasi", value: "Plug & play, tidak memerlukan PC dedicated" },
      { label: "Use case", value: "Acara korporat, webinar, siaran kampus, gereja, produksi konten" },
    ],
    image: "/assets/image/og-home.jpg",
    imageAlt: "AVION Broadcast & Streaming Device — encoder 4K untuk live streaming profesional",
    whatsappMessage: "Halo, saya mau bertanya tentang Broadcast & Streaming Devices AVION!",
  },
  {
    slug: "led-wall",
    name: "AVION LED Wall Indoor & Outdoor",
    shortName: "LED Wall",
    category: "led-wall",
    categoryLabel: "Large Format Display",
    tagline: "Perluas kehadiran Anda. Kuasai setiap ruangan — dan setiap sudut jalan.",
    shortDescription:
      "AVION LED Wall adalah panel LED modular indoor dan outdoor hingga 5000 nits, IP65 weatherproof. Pixel pitch indoor P2.5/P3/P4, outdoor P4/P6/P8. Ukuran custom tanpa batas — untuk lobby, auditorium, billboard, dan venue event.",
    longDescription:
      "Dari instalasi indoor resolusi tinggi di lobby dan auditorium, hingga LED wall outdoor tahan cuaca skala besar untuk billboard dan venue event — AVION LED Wall menghadirkan visual yang memukau di segala kondisi. Panel modular memungkinkan ukuran dan bentuk custom tanpa batas, dengan brightness hingga 5000 nits untuk keterbacaan optimal di siang hari.",
    highlights: [
      { value: "HD+", label: "Resolution" },
      { value: "5000+", label: "Nits" },
      { value: "IP65", label: "Weatherproof" },
      { value: "∞", label: "Scalable" },
    ],
    features: [
      "Modular Panels",
      "Indoor & Outdoor",
      "IP65 Rated",
      "Custom Size",
      "High Brightness",
    ],
    specs: [
      { label: "Pixel pitch indoor", value: "P2.5 · P3 · P4" },
      { label: "Pixel pitch outdoor", value: "P4 · P6 · P8" },
      { label: "Brightness", value: "Hingga 5000+ nits" },
      { label: "Weather rating", value: "IP65 (outdoor)" },
      { label: "Konstruksi", value: "Panel modular, ukuran & bentuk custom" },
      { label: "Use case", value: "Lobby, auditorium, billboard, venue event, stadion, fasad bangunan" },
    ],
    image: "/assets/image/og-home.jpg",
    imageAlt: "AVION LED Wall Indoor & Outdoor — panel modular hingga 5000 nits IP65",
    whatsappMessage: "Halo, saya mau bertanya tentang LED Wall AVION!",
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

export function buildWhatsappUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=6281563905555&text=${encodeURIComponent(message)}`;
}
