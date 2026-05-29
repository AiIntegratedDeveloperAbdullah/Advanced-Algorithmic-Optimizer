'use client';

import { useEffect } from 'react';
import './globals.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from '@/components/Cursor';
import ParticleField from '@/components/ParticleField';
import Loader from '@/components/Loader';

export default function RootLayout({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Loader />
        <Cursor />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleField />
        </div>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
