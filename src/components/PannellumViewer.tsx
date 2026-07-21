'use client';

import { useEffect, useRef, useState } from 'react';

interface PannellumViewerProps {
  imageSrc: string;
  title: string;
}

declare global {
  interface Window {
    pannellum?: {
      viewer: (
        container: HTMLElement | string,
        config: Record<string, unknown>
      ) => unknown;
    };
  }
}

export default function PannellumViewer({ imageSrc, title }: PannellumViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const viewerInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    // Dynamically inject Pannellum CSS & JS if not already loaded
    const loadPannellum = async () => {
      if (!document.getElementById('pannellum-css')) {
        const link = document.createElement('link');
        link.id = 'pannellum-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
        document.head.appendChild(link);
      }

      if (!window.pannellum) {
        if (!document.getElementById('pannellum-js')) {
          const script = document.createElement('script');
          script.id = 'pannellum-js';
          script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
          script.onload = () => initViewer();
          document.body.appendChild(script);
        } else {
          // Script tag exists, wait for window.pannellum
          const interval = setInterval(() => {
            if (window.pannellum) {
              clearInterval(interval);
              initViewer();
            }
          }, 100);
        }
      } else {
        initViewer();
      }
    };

    const initViewer = () => {
      if (!containerRef.current || !window.pannellum) return;

      try {
        // Destroy previous viewer if exists
        if (viewerInstanceRef.current && typeof (viewerInstanceRef.current as { destroy?: () => void }).destroy === 'function') {
          (viewerInstanceRef.current as { destroy: () => void }).destroy();
        }

        containerRef.current.innerHTML = '';

        const viewer = window.pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: imageSrc,
          autoLoad: true,
          autoRotate: -2,
          compass: false,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          mouseZoom: true,
          hfov: 110,
        });

        viewerInstanceRef.current = viewer;
        setIsLoaded(true);
      } catch (err) {
        console.error('Pannellum init error:', err);
      }
    };

    loadPannellum();

    return () => {
      if (viewerInstanceRef.current && typeof (viewerInstanceRef.current as { destroy?: () => void }).destroy === 'function') {
        (viewerInstanceRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [imageSrc]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-slate-900">
      <div ref={containerRef} className="w-full h-full" />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white gap-3 z-10">
          <div className="w-8 h-8 border-4 border-primary-light border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-300">Memuat Visual 360° {title}...</p>
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 pointer-events-none z-20">
        <span className="material-symbols-outlined text-[18px]">360</span>
        <span>{title}</span>
      </div>
    </div>
  );
}
