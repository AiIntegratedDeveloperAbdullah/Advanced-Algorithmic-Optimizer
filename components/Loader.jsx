'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const letterRef = useRef(null);
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
      }
    });

    // Initial state
    gsap.set(letterRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });

    tl.to(letterRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    }, 0)
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1
    })
    .to(containerRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "expo.inOut",
      delay: 0.2
    });

    return () => tl.kill();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-32 h-32 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            ref={letterRef}
            d="M30 20 C 30 20, 70 20, 70 40 C 70 60, 30 60, 30 80 C 30 100, 70 100, 70 100"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
            className="drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]"
          />
        </svg>
      </div>

      <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
        <div
          ref={progressRef}
          className="absolute left-0 top-0 h-full w-0 bg-gold"
        />
      </div>

      <div className="mt-6 flex flex-col items-center overflow-hidden">
        <span
          ref={textRef}
          className="text-[9px] tracking-eyebrow text-gold uppercase opacity-0 translate-y-4"
        >
          Shapes Community Club
        </span>
      </div>
    </div>
  );
};

export default Loader;
