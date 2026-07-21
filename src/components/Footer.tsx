import { siteContent } from '@/content/site-content';

export default function Footer() {
  const { brand, navigation } = siteContent;

  return (
    <footer className="bg-surface border-t border-border py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
        <div>
          <a href="#" className="text-xl font-extrabold text-primary mb-2 block tracking-tight">
            {brand.name}
          </a>
          <p className="text-sm text-text-secondary max-w-sm mb-4 leading-relaxed">
            {brand.tagline}. Berkomitmen menghadirkan nutrisi segar berkualitas tinggi langsung dari peternakan Indralaya.
          </p>
          <p className="text-xs font-semibold text-text-primary">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>

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
            Lokasi: <span className="font-semibold text-text-primary">{brand.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
