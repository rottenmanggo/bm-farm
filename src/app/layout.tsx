import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteContent } from '@/content/site-content';

export const metadata: Metadata = {
  title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
  description: siteContent.hero.description,
  keywords: ['B.M Farm', 'Telur Bebek Omega', 'Indralaya', 'Telur Bebek Segar', 'Ogan Ilir', 'Telur Omega 3'],
  openGraph: {
    title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
    description: siteContent.hero.description,
    type: 'website',
    locale: 'id_ID',
    siteName: siteContent.brand.name,
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
