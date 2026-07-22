'use client';

import { useState, useEffect, useRef } from 'react';
import { siteContent } from '@/content/site-content';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const waUrl = `https://wa.me/${siteContent.brand.waNumber}?text=${encodeURIComponent(
    siteContent.brand.waDefaultMessage
  )}`;

  // 1. Smart Navbar Hide on Scroll Down / Show on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling Down -> Hide Navbar
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling Up -> Show Navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Active Section Highlight Observer
  useEffect(() => {
    const sectionIds = ['about', 'benefits', 'gallery', 'location'];

    const handleObserve = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleObserve, { passive: true });
    handleObserve();

    return () => window.removeEventListener('scroll', handleObserve);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? 'top-3 left-4 right-4 md:left-8 md:right-8 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-lg'
          : 'top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border shadow-xs'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+12px)]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-xl font-extrabold text-primary tracking-tight transition-transform hover:scale-105"
        >
          {siteContent.brand.name}
        </a>

        {/* Desktop Links with Active Section Indicator */}
        <nav className="hidden md:flex items-center gap-2">
          {siteContent.navigation.links.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 relative ${
                  isActive
                    ? 'bg-primary-light text-primary font-bold shadow-2xs'
                    : 'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* WhatsApp Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-200 flex items-center gap-2 shadow-xs active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary p-2 hover:bg-surface rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with Active Section Highlight */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 py-4 space-y-2 shadow-md">
          {siteContent.navigation.links.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary-light text-primary font-bold'
                    : 'text-text-primary hover:text-primary hover:bg-surface'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
