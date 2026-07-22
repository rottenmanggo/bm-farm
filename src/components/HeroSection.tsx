'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/site-content';

export default function HeroSection() {
  const { hero, brand, navigation } = siteContent;

  const waUrl = `https://wa.me/${brand.waNumber}?text=${encodeURIComponent(
    brand.waDefaultMessage
  )}`;

  return (
    <section className="relative w-full h-screen min-h-[560px] max-h-[900px] overflow-hidden flex flex-col">
      {/* ── Full-Screen Background Image ── */}
      <div className="absolute inset-0 -z-0">
        <Image
          src={hero.image}
          alt={hero.headline}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Multi-layer gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col justify-between h-full">

        {/* Top Spacer (accounts for fixed navbar) */}
        <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 md:px-16 lg:px-24 pb-4 pt-20">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 max-w-2xl"
          >
            {hero.headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-sm sm:text-base md:text-lg text-white/85 max-w-md sm:max-w-lg mb-8 leading-relaxed"
          >
            {hero.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform duration-300">
                chat
              </span>
              {hero.ctaPrimary}
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 active:scale-95"
            >
              {hero.ctaSecondary}
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
