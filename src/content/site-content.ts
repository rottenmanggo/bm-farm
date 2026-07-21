export interface StatItem {
  value: string;
  label: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  side: 'left' | 'right';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  src: string;
}

export interface View360Item {
  id: string;
  title: string;
  src: string;
  badge: string;
}

export interface FaqItem {
  keywords: string[];
  answer: string;
  escalate: boolean;
  mapsCta?: boolean;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    owner: string;
    location: string;
    waNumber: string;
    waDefaultMessage: string;
    mapsUrl: string;
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    qualityBadgeTitle: string;
    qualityBadgeSubtitle: string;
    stats: {
      ducks: StatItem;
      established: StatItem;
      customers: StatItem;
    };
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    keyPoints: string[];
    image: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    eggCrackSequencePath: string;
    totalFrames: number;
    items: BenefitItem[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryItem[];
    views360: View360Item[];
  };
  location: {
    title: string;
    subtitle: string;
    description: string;
    address: string;
    ctaMaps: string;
    ctaWa: string;
    mapImage: string;
  };
  chatbot: {
    adminName: string;
    status: string;
    welcomeMessage: string;
    faqs: FaqItem[];
    escalationText: string;
  };
}

export const siteContent: SiteContent = {
  brand: {
    name: "B.M Farm",
    tagline: "Peternakan Telur Bebek Omega Segar & Berkualitas",
    owner: "Pak Ryan",
    location: "Indralaya, Ogan Ilir, Sumatera Selatan",
    waNumber: "6281234567890",
    waDefaultMessage: "Halo Pak Ryan, saya ingin bertanya/memesan telur bebek omega B.M Farm.",
    mapsUrl: "https://maps.app.goo.gl/qrb15aPX9TRLnnjN7"
  },
  navigation: {
    links: [
      { label: "Tentang", href: "#about" },
      { label: "Kelebihan", href: "#benefits" },
      { label: "Galeri", href: "#gallery" },
      { label: "Lokasi", href: "#location" }
    ]
  },
  hero: {
    badge: "Peternakan Lokal Indralaya",
    headline: "Telur Bebek Omega Segar dari Peternakan Indralaya",
    description: "Kualitas nutrisi premium dengan kandungan Omega-3 yang tinggi untuk kesehatan keluarga Anda. Langsung dari tangan peternak lokal yang berdedikasi.",
    ctaPrimary: "Hubungi via WhatsApp",
    ctaSecondary: "Lihat Produk",
    image: "/images/hero/hero-duck-eggs.jpg",
    qualityBadgeTitle: "Kualitas Terjamin",
    qualityBadgeSubtitle: "Grade A+ Premium",
    stats: {
      ducks: { value: "5.000+", label: "Ekor Bebek" },
      established: { value: "2018", label: "Tahun Berdiri" },
      customers: { value: "10.000+", label: "Pelanggan Puas" }
    }
  },
  about: {
    title: "Apa itu Telur Bebek Omega?",
    subtitle: "Nutrisi Lebih Baik untuk Keluarga Anda",
    paragraphs: [
      "Telur Bebek Omega kami bukan sekadar telur biasa. Melalui proses pemberian pakan khusus yang kaya akan asam lemak esensial, bebek kami menghasilkan telur dengan kandungan Omega-3, EPA, dan DHA yang jauh lebih tinggi dibandingkan telur standar.",
      "Warna kuning telurnya yang lebih pekat (jingga kemerahan) menjadi bukti nyata tingginya kadar nutrisi dan antioksidan di dalamnya. Sangat baik untuk perkembangan otak anak, kesehatan jantung dewasa, serta menjaga imunitas tubuh."
    ],
    keyPoints: [
      "Pakan Organik Terstandarisasi",
      "Tanpa Hormon Pertumbuhan",
      "Segar Setiap Hari (H+1 Panen)"
    ],
    image: "/images/hero/omega-egg-yolk.jpg"
  },
  benefits: {
    title: "Keunggulan B.M Farm",
    subtitle: "Komitmen kami dalam menghadirkan kualitas terbaik di setiap butir.",
    eggCrackSequencePath: "/images/egg-crack/",
    totalFrames: 5,
    items: [
      {
        id: "omega3",
        title: "Tinggi Omega-3 & DHA",
        category: "Super Nutrisi",
        description: "Membantu menyehatkan fungsi jantung, perkembangan otak anak, dan menjaga imunitas.",
        icon: "health_and_safety",
        side: "left"
      },
      {
        id: "protein",
        title: "Protein Lebih Tinggi",
        category: "Sumber Energi",
        description: "Kandungan protein padat dan asam amino esensial untuk pembentukan otot optimal.",
        icon: "fitness_center",
        side: "left"
      },
      {
        id: "yolk",
        title: "Kuning Telur Pekat",
        category: "Kualitas Visual",
        description: "Warna jingga tua yang kaya akan Beta-Karoten alami dan rasa lebih gurih tidak amis.",
        icon: "palette",
        side: "right"
      },
      {
        id: "trusted",
        title: "Peternakan Terpercaya",
        category: "Asli Lokal",
        description: "Dikelola dengan standar higienis di wilayah Indralaya langsung oleh Pak Ryan.",
        icon: "verified",
        side: "right"
      }
    ]
  },
  gallery: {
    title: "Galeri Peternakan",
    subtitle: "Melihat lebih dekat lingkungan & fasilitas B.M Farm.",
    images: [
      {
        id: "1",
        title: "Fasilitas Kandang Bebek",
        description: "Kandang yang bersih dan berlokasi di area asri Indralaya",
        src: "/images/gallery/duck-farm-countryside.jpg"
      },
      {
        id: "2",
        title: "Sorting & Quality Control",
        description: "Pembersihan dan seleksi telur bebek kelas A+",
        src: "/images/gallery/stacked-duck-eggs.jpg"
      },
      {
        id: "3",
        title: "Peternakan Sehat",
        description: "Bebek dijaga agar tetap sehat dan produktif di lingkungan yang bersih",
        src: "/images/gallery/farmer-portrait.jpg"
      },
      {
        id: "4",
        title: "Kuning Telur Omega Pekat",
        description: "Bukti visual warna jingga tua kaya kandungan gizi",
        src: "/images/hero/omega-egg-yolk.jpg"
      }
    ],
    views360: [
      {
        id: "jualan",
        title: "360° Area Jualan & Retail",
        src: "/images/360/jualan-360.jpg",
        badge: "360° View"
      },
      {
        id: "kandang",
        title: "360° Kandang & Area Pakan",
        src: "/images/360/kandang-360.jpg",
        badge: "360° View"
      }
    ]
  },
  location: {
    title: "Dapatkan Telur Omega Segar Hari Ini",
    subtitle: "Kunjungi Kami",
    description: "Kami melayani pembelian retail dan grosir untuk restoran, hotel, maupun kebutuhan rumah tangga di seluruh area Indralaya dan sekitarnya.",
    address: "Desa Muara Penimbung Ilir (Dekat SD Negeri 1 Indralaya), Kec. Indralaya, Kab. Ogan Ilir",
    ctaMaps: "Lihat Lokasi di Google Maps",
    ctaWa: "Chat via WhatsApp",
    mapImage: "/images/hero/indralaya-map.jpg"
  },
  chatbot: {
    adminName: "Admin B.M Farm",
    status: "Online Sekarang",
    welcomeMessage: "Halo! Ada yang bisa kami bantu seputar telur bebek omega B.M Farm hari ini? 😊",
    faqs: [
      {
        keywords: ["harga", "berapa", "biaya", "pricelist", "eceran"],
        answer: "Telur bebek omega B.M Farm dijual Rp 2.500 per butir. Untuk info harga terbaru hari ini, silakan hubungi  via WhatsApp.",
        escalate: true
      },
      {
        keywords: ["beda", "omega", "biasa", "manfaat", "gizi", "keunggulan"],
        answer: "Telur bebek omega memiliki kadar Omega-3, DHA, dan EPA lebih tinggi dengan kuning telur pekat jingga kemerahan. Rasanya lebih gurih dan tidak amis!",
        escalate: false
      },
      {
        keywords: ["lokasi", "alamat", "dimana", "indralaya", "toko", "kandang", "muara penimbung"],
        answer: "B.M Farm berlokasi di Desa Muara Penimbung Ilir (Dekat dengan SD Negeri 1 Indralaya), Kec. Indralaya, Kabupaten Ogan Ilir. Anda bisa langsung datang ke tempat atau memesan via WhatsApp.",
        escalate: false,
        mapsCta: true
      },
      {
        keywords: ["kirim", "ongkir", "pesan", "order", "beli", "antar"],
        answer: "Kami melayani pengiriman area Indralaya & sekitarnya. Untuk pemesanan dan konfirmasi alamat, langsung chat via WhatsApp ya!",
        escalate: true
      },
      {
        keywords: ["grosir", "b2b", "restoran", "katering", "hotel", "partai", "reseller", "kerjasama", "diskon"],
        answer: "Untuk pemesanan grosir dan kemitraan, bisa mengajukan penawaran khusus langsung!",
        escalate: true
      }
    ],
    escalationText: "Untuk info terbaru & pemesanan langsung, silakan hubungi via WhatsApp."
  }
};
