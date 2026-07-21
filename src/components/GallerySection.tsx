'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent, GalleryItem } from '@/content/site-content';
import { X, Eye } from 'lucide-react';

// Dynamic import PannellumViewer client-side only (ssr: false)
const PannellumViewer = dynamic(() => import('./PannellumViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl bg-surface-dim flex flex-col items-center justify-center text-text-secondary gap-3">
      <div className="w-8 h-8 border-4 border-primary-light border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-medium">Memuat Module 360° Viewer...</p>
    </div>
  ),
});

export default function GallerySection() {
  const { gallery } = siteContent;
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [active360Tab, setActive360Tab] = useState<'jualan' | 'kandang'>('jualan');

  const images = gallery.images; // 5 photos
  // Tripled list for a 100% seamless, unbroken infinite continuous marquee loop
  const infiniteImages = [...images, ...images, ...images];

  const current360 = gallery.views360.find((v) => v.id === active360Tab) || gallery.views360[0];

  return (
    <section id="gallery" className="px-4 md:px-8 py-16 md:py-24 bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
              {gallery.title}
            </h2>
            <p className="text-base text-text-secondary mt-2 max-w-lg">
              {gallery.subtitle}
            </p>
          </div>
        </div>

        {/* 1. Continuous Infinite Marquee Carousel */}
        <div className="relative mb-16 overflow-hidden py-2">
          {/* Edge Blur Fades for smooth entry/exit */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{
              x: ['0%', '-33.333%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            }}
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing w-max"
          >
            {infiniteImages.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border bg-white transition-all duration-300 aspect-[4/3]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  sizes="380px"
                />

                {/* Hover Overlay Card Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white pointer-events-none">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Eye size={18} />
                    </div>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2. Interactive 360° Viewer Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-text-primary">
                Tur 360° Peternakan
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Geser/drag pada layar untuk melihat sekeliling 360 derajat
              </p>
            </div>

            {/* 360° Location Tabs */}
            <div className="flex bg-surface p-1 rounded-full border border-border self-start sm:self-auto">
              {gallery.views360.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive360Tab(tab.id as 'jualan' | 'kandang')}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    active360Tab === tab.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {tab.id === 'jualan' ? 'storefront' : 'agriculture'}
                  </span>
                  {tab.title.replace('360° ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Pannellum 360° Viewer Container */}
          <PannellumViewer
            key={current360.id}
            imageSrc={current360.src}
            title={current360.title}
          />
        </div>
      </div>

      {/* Lightbox Modal Popup for Photo Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 md:p-8 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Lightbox Image */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  sizes="1200px"
                />
              </div>

              {/* Lightbox Caption */}
              <div className="p-6 bg-slate-950 text-white border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
