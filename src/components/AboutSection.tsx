'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteContent } from '@/content/site-content';

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <section id="about" className="px-4 md:px-8 py-16 md:py-24 bg-surface relative">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-1"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border aspect-[4/3] group">
            <Image
              src={about.image}
              alt={about.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Column: Information & Key Points */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="order-2 flex flex-col justify-center"
        >
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary mb-6 tracking-tight leading-snug">
            {about.title}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-base text-text-secondary leading-relaxed mb-8">
            {about.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Points Checklist */}
          <ul className="space-y-3.5 border-t border-border pt-6">
            {about.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-success text-[18px]">
                    check_circle
                  </span>
                </div>
                <span className="font-semibold text-text-primary text-sm sm:text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
