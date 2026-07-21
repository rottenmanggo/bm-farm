'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/site-content';

export default function HeroSection() {
  const { hero, brand } = siteContent;

  const waUrl = `https://wa.me/${brand.waNumber}?text=${encodeURIComponent(
    brand.waDefaultMessage
  )}`;

  return (
    <section className="relative overflow-hidden px-4 md:px-8 pt-6 md:pt-10 pb-12 md:pb-16 bg-background">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary-light/50 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-secondary-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
        {/* Left Column: Headline, Description & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="z-10 flex flex-col justify-start"
        >
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-text-primary mb-5 tracking-tight leading-[1.15]">
            {hero.headline}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary mb-8 max-w-xl leading-relaxed">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-3 active:scale-95 group"
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform duration-300">
                chat
              </span>
              {hero.ctaPrimary}
            </a>

            <a
              href="#about"
              className="bg-secondary-light text-secondary-dark border border-secondary-dark/20 px-8 py-4 rounded-full font-bold text-base hover:bg-secondary/20 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              {hero.ctaSecondary}
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Image aligned to right boundary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative flex justify-center md:justify-end items-center"
        >
          {/* Main Circle Frame */}
          <div className="relative w-full max-w-[460px] lg:max-w-[500px] aspect-square rounded-full overflow-hidden border-[12px] border-surface shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src={hero.image}
              alt={hero.headline}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Floating Decorative Quality Badge */}
          <div className="absolute -bottom-2 left-4 md:-left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 z-20 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center text-secondary-dark shadow-2xs">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
            <div>
              <p className="font-bold text-sm text-text-primary">{hero.qualityBadgeTitle}</p>
              <p className="text-xs font-medium text-text-secondary">{hero.qualityBadgeSubtitle}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
