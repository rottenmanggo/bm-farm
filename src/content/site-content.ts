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
  bullets?: string[];
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
    name: "BM Farm",
    tagline: "Menjual Telur Bebek Omega",
    owner: "Pak Ryan",
    location: "Desa Muara Penimbung Ilir, Kec. Indralaya, Kabupaten Ogan Ilir, Sumatera Selatan",
    waNumber: "6282175432777",
    waDefaultMessage: "Halo, saya ingin bertanya/memesan telur bebek omega BM Farm.",
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
    headline: "Telur Bebek Omega",
    description: "Kualitas nutrisi premium dengan kandungan Omega-3 yang tinggi untuk kesehatan keluarga Anda. Langsung dari tangan peternak lokal yang berdedikasi.",
    ctaPrimary: "Hubungi via WhatsApp",
    ctaSecondary: "Lihat Produk",
    image: "/images/hero/hero-image.png",
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
    title: "Keunggulan Telur Bebek Omega",
    subtitle: "Menghadirkan kualitas terbaik di setiap butir.",
    eggCrackSequencePath: "/images/egg-crack/",
    totalFrames: 5,
    items: [
      {
        id: "cardiovascular",
        title: "Kesehatan Kardiovaskular",
        category: "Jantung & Arteri",
        description: "Menurunkan trigliserida, menekan kolesterol LDL, serta mengurangi risiko jantung koroner, stroke, dan hipertensi.",
        bullets: [
          "Menurunkan kadar trigliserida pemicu penyumbatan pembuluh darah",
          "Menekan kolesterol jahat (LDL) & menjaga kelenturan arteri",
          "Mengurangi risiko jantung koroner, stroke, dan hipertensi"
        ],
        icon: "favorite",
        side: "left"
      },
      {
        id: "brain_nerve",
        title: "Fungsi Otak & Saraf",
        category: "DHA & Vitamin B12",
        description: "DHA mendukung kognitif anak sejak dini, Vitamin B12 optimalkan fungsi saraf, serta bantu pencegahan demensia lansia.",
        bullets: [
          "DHA mendukung perkembangan kognitif anak sejak dini",
          "Vitamin B12 mengoptimalkan fungsi sistem saraf tubuh",
          "Membantu pencegahan demensia & penurunan kognitif lansia"
        ],
        icon: "psychology",
        side: "left"
      },
      {
        id: "muscle_cell",
        title: "Pembentukan Otot & Sel",
        category: "Protein & Asam Amino",
        description: "Profil asam amino lengkap dan kuantitas protein padat untuk pembentukan jaringan otot serta regenerasi sel.",
        bullets: [
          "Profil asam amino lengkap dengan protein lebih tinggi & padat",
          "Sangat baik untuk pembentukan jaringan otot",
          "Mendukung regenerasi sel secara optimal"
        ],
        icon: "fitness_center",
        side: "right"
      },
      {
        id: "energy_metabolism",
        title: "Energi & Metabolisme",
        category: "Zat Besi & Stamina",
        description: "Zat besi melimpah cegah anemia, Vitamin B12 optimalkan metabolisme energi, serta pilihan protein hewani yang aman.",
        bullets: [
          "Zat besi (iron) melimpah untuk cegah anemia & tingkatkan stamina",
          "Vitamin B12 tinggi mengoptimalkan metabolisme energi tubuh",
          "Pilihan protein hewani yang lebih aman dan fungsional"
        ],
        icon: "bolt",
        side: "right"
      }
    ]
  },
  gallery: {
    title: "Galeri Peternakan",
    subtitle: "Melihat lebih dekat lingkungan & fasilitas BM Farm.",
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
        title: "Bebek Sehat, Telur Berkualitas",
        description: "Komitmen terhadap kesehatan bebek untuk hasil telur omega terbaik",
        src: "/images/gallery/farmer-portrait.jpg"
      },
      {
        id: "4",
        title: "Kuning Telur Omega Pekat",
        description: "Bukti visual warna kuning telur kaya kandungan gizi",
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
    description: "Kami melayani pembelian retail dan grosir di seluruh area Indralaya dan sekitarnya.",
    address: "Desa Muara Penimbung Ilir (Dekat SD Negeri 1 Indralaya), Kec. Indralaya, Kab. Ogan Ilir",
    ctaMaps: "Lihat Lokasi di Google Maps",
    ctaWa: "Chat via WhatsApp",
    mapImage: "/images/hero/indralaya-map.jpg"
  },
  chatbot: {
    adminName: "Admin BM Farm",
    status: "Online Sekarang",
    welcomeMessage: "Halo! Ada yang bisa kami bantu seputar telur bebek omega BM Farm hari ini? 😊",
    faqs: [
      {
        keywords: ["harga", "berapa", "biaya", "pricelist", "eceran"],
        answer: "Telur bebek omega BM Farm dijual dengan harga Rp 2.500 per butir. Untuk info harga terbaru atau penawaran khusus, silakan hubungi via WhatsApp.",
        escalate: true
      },
      {
        keywords: ["beda", "omega", "biasa", "manfaat", "gizi", "keunggulan", "kardiovaskular", "otak"],
        answer: "Manfaat Telur Bebek Omega yaitu bisa menjaga kesehatan kardiovaskular (cegah jantung koroner/hypertensi), merawat fungsi otak & saraf, membantu pembentukan otot & sel, menjadikan energi dan metabolisme untuk cegah anemia serta tingkatkan stamina",
        escalate: false
      },
      {
        keywords: ["lokasi", "alamat", "dimana", "indralaya", "toko", "kandang", "muara penimbung"],
        answer: "BM Farm berlokasi di Desa Muara Penimbung Ilir (Dekat dengan SD Negeri 1 Indralaya), Kec. Indralaya, Kabupaten Ogan Ilir. Anda bisa langsung datang ke tempat atau memesan via WhatsApp.",
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
        answer: "Untuk pemesanan grosir dan kemitraan, hubungi via WhatsApp untuk mendapatkan penawaran khusus langsung.",
        escalate: true
      }
    ],
    escalationText: "Untuk info terbaru & pemesanan langsung, silakan hubungi via WhatsApp."
  }
};
