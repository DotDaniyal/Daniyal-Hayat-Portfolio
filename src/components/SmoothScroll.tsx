import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animId: number | null = null;
    let lenis: Lenis | null = null;

    const startLenis = () => {
      if (mediaQuery.matches) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        animId = requestAnimationFrame(raf);
      }

      animId = requestAnimationFrame(raf);
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    };

    const stopLenis = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };

    startLenis();

    const handleMotionChange = () => {
      stopLenis();
      startLenis();
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      stopLenis();
    };
  }, []);

  return <>{children}</>;
}
