import Image from 'next/image';
import { siteContent } from '@/content/site-content';

export default function Footer() {
  const { brand, navigation } = siteContent;

  return (
    <footer className="bg-surface border-t border-border py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
        {/* Left Column: Brand Info & Telok-O Button */}
        <div>
          <a href="#" className="flex items-center gap-2.5 mb-2 group w-fit">
            <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/logo/bm-farm-logo.png"
                alt="BM Farm Logo"
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            </div>
            <span className="text-xl font-extrabold text-primary tracking-tight group-hover:underline">
              {brand.name}
            </span>
          </a>
          <p className="text-sm text-text-secondary max-w-sm mb-5 leading-relaxed">
            {brand.tagline}. Berkomitmen menghadirkan nutrisi segar berkualitas tinggi langsung dari peternakan Indralaya.
          </p>

          {/* Telok-O Button in Footer */}
          <div className="mb-5">
            <a
              href="https://telok-o.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-secondary-light/60 text-text-primary border border-border hover:border-secondary/40 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-2xs hover:shadow-md hover:scale-105 active:scale-95 group"
            >
              <div className="relative w-6 h-6 shrink-0 overflow-hidden rounded-full border border-secondary/30 bg-white shadow-2xs">
                <Image
                  src="/images/logo/telok-o-logo.png"
                  alt="Telok-O Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span>
                <strong className="text-secondary-dark font-extrabold group-hover:underline">
                  Telok-O →
                </strong>
              </span>
            </a>
          </div>

          <p className="text-xs font-semibold text-text-primary">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>

        {/* Right Column: Navigation Links & Address */}
        <div className="flex flex-col md:items-end justify-between gap-4">
          <nav className="flex flex-wrap gap-6 text-sm font-medium text-text-secondary">
            {navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">{brand.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
