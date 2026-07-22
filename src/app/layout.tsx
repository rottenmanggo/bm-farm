import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteName = 'B.M Farm Indralaya';
const siteDescription =
  'Telur Bebek Omega segar berkualitas premium dari peternakan lokal Indralaya. Kandungan Omega-3, EPA, dan DHA tinggi untuk kesehatan keluarga Anda. Langsung dari tangan peternak yang berdedikasi.';
const siteUrl = 'https://bm-farm.vercel.app';

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  keywords: [
    'BM Farm',
    'B.M Farm',
    'Telur Bebek Omega',
    'Indralaya',
    'Telur Bebek Segar',
    'Ogan Ilir',
    'Telur Omega 3',
    'Peternakan Bebek',
    'Sumatera Selatan',
  ],
  metadataBase: new URL(siteUrl),

  // ── Open Graph (WhatsApp, Telegram, Facebook, etc.) ──
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B.M Farm Indralaya – Telur Bebek Omega Premium',
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: ['/og-image.jpg'],
  },

  // ── Favicon / Browser Tab Icons ──
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-text-primary antialiased font-sans selection:bg-primary-light selection:text-primary">
        {children}
      </body>
    </html>
  );
}
