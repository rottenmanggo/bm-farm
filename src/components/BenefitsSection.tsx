'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteContent } from '@/content/site-content';

export default function BenefitsSection() {
  const { benefits } = siteContent;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollStep, setScrollStep] = useState(0);

  // Frame paths array: egg-01.jpg .. egg-05.jpg (or transparent PNGs)
  const frames = Array.from({ length: benefits.totalFrames }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `${benefits.eggCrackSequencePath}egg-${num}.jpg`;
  });

  // Preload images for seamless frame switching
  useEffect(() => {
    frames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform scroll [0, 1] -> frame index [0, totalFrames - 1]
  const frameIndexTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, benefits.totalFrames - 1]
  );

  // Transform scroll [0, 1] -> step index [0, 4] for 1-by-1 benefit item reveal
  const stepTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 0.95],
    [0, 1, 2, 3, 4]
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubFrame = frameIndexTransform.on('change', (latest) => {
      const idx = Math.min(
        benefits.totalFrames - 1,
        Math.max(0, Math.round(latest))
      );
      setCurrentFrameIndex(idx);
    });

    const unsubStep = stepTransform.on('change', (latest) => {
      setScrollStep(Math.round(latest));
    });

    return () => {
      unsubFrame();
      unsubStep();
    };
  }, [frameIndexTransform, stepTransform, shouldReduceMotion, benefits.totalFrames]);

  const allItems = benefits.items;

  // Reduced motion fallback view
  if (shouldReduceMotion) {
    return (
      <section id="benefits" className="px-4 md:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            {benefits.title}
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">{benefits.subtitle}</p>
        </div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.items.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-surface rounded-2xl border border-border shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="benefits"
      ref={containerRef}
      className="relative bg-white min-h-[350vh]"
    >
      {/* Sticky Main Viewport Container - 100% Vertically Centered */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-[1280px] w-full mx-auto text-center mb-6 md:mb-10 shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            {benefits.title}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto mt-2">
            {benefits.subtitle}
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
          {/* Left Column Benefits (Items 0 & 1) */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 text-left lg:text-right min-h-[220px]">
            {allItems.slice(0, 2).map((item, idx) => {
              const isVisible = scrollStep >= idx + 1;
              return (
                <motion.div
                  key={item.id}
                  animate={{
                    opacity: isVisible ? 1 : 0.15,
                    scale: isVisible ? 1 : 0.94,
                    x: isVisible ? 0 : -15,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`group flex flex-col lg:items-end gap-2 p-4 lg:p-0 rounded-2xl transition-colors ${
                    isVisible ? 'bg-surface lg:bg-transparent shadow-xs lg:shadow-none border lg:border-none border-border' : 'opacity-20'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 ${
                      isVisible
                        ? 'bg-primary text-white scale-105'
                        : 'bg-primary-light text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column: Egg Image Sequence Frame (No border/circle frame for transparent PNGs) */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative py-2">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              <Image
                src={frames[currentFrameIndex]}
                alt={`Telur Omega Frame ${currentFrameIndex + 1}`}
                fill
                className="object-contain transition-opacity duration-150"
                priority
                sizes="320px"
              />
            </div>
          </div>

          {/* Right Column Benefits (Items 2 & 3) */}
          <div className="flex flex-col gap-6 md:gap-8 order-3 text-left min-h-[220px]">
            {allItems.slice(2, 4).map((item, idx) => {
              const itemStepIndex = idx + 3;
              const isVisible = scrollStep >= itemStepIndex;
              return (
                <motion.div
                  key={item.id}
                  animate={{
                    opacity: isVisible ? 1 : 0.15,
                    scale: isVisible ? 1 : 0.94,
                    x: isVisible ? 0 : 15,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`group flex flex-col items-start gap-2 p-4 lg:p-0 rounded-2xl transition-colors ${
                    isVisible ? 'bg-surface lg:bg-transparent shadow-xs lg:shadow-none border lg:border-none border-border' : 'opacity-20'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 ${
                      isVisible
                        ? 'bg-secondary text-white scale-105'
                        : 'bg-secondary-light text-secondary-dark'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
