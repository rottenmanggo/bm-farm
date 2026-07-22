'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/content/site-content';

export default function LocationCtaSection() {
  const { location, brand } = siteContent;

  const waUrl = `https://wa.me/${brand.waNumber}?text=${encodeURIComponent(
    brand.waDefaultMessage
  )}`;

  return (
    <section id="location" className="px-4 md:px-8 py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-primary text-white rounded-[32px] p-8 md:p-12 lg:p-14 overflow-hidden relative shadow-2xl"
        >
          {/* Ambient Background Blur Blobs */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-dark/60 rounded-full opacity-40 blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
                {location.title}
              </h2>

              <p className="text-primary-light text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
                {location.description}
              </p>

              {/* Action Buttons (Strictly Single-Line Text) */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                <a
                  href={brand.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-on-secondary-fixed px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:bg-secondary-dark hover:text-white transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 group"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:bounce">
                    map
                  </span>
                  <span>{location.ctaMaps}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all active:scale-95 whitespace-nowrap shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chat
                  </span>
                  <span>{location.ctaWa}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Live Embedded Google Maps Preview (Clean View) */}
            <div className="h-72 sm:h-80 lg:h-[360px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 relative border border-white/20">
              <iframe
                src="https://maps.google.com/maps?q=BM%20Farm%20Indralaya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps BM Farm Indralaya"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
