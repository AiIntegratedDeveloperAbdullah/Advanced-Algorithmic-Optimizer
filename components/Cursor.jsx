'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Instant movement for the inner dot
      gsap.set(dot.current, {
        x: mouse.x,
        y: mouse.y
      });
    };

    const animate = () => {
      // Lerp for the outer ring (0.1 coefficient)
      ringPos.x += (mouse.x - ringPos.x) * 0.1;
      ringPos.y += (mouse.y - ringPos.y) * 0.1;

      gsap.set(ring.current, {
        x: ringPos.x,
        y: ringPos.y
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    // Hover states
    const onMouseEnter = () => {
      gsap.to(ring.current, {
        scale: 1.5,
        backgroundColor: 'rgba(201, 168, 76, 0.1)',
        duration: 0.3
      });
      gsap.to(dot.current, {
        scale: 0.5,
        duration: 0.3
      });
    };

    const onMouseLeave = () => {
      gsap.to(ring.current, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3
      });
      gsap.to(dot.current, {
        scale: 1,
        duration: 0.3
      });
    };

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 bg-gold pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-10 h-10 border border-gold/30 pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default Cursor;
