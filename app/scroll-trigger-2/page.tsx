'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger2() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (childRef.current && containerRef.current) {
      gsap.fromTo(
        childRef.current,
        {
          scale: 0.1,
          opacity: 0.5,
        },
        {
          scale: 2.5,
          opacity: 1,
          ease: 'back',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      {/* Spacer before */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Scroll Down to See Zoom Effect
        </h1>
      </div>

      {/* Scroll Zoom Container */}
      <div ref={containerRef} className="h-[200vh] flex items-center justify-center">
        <div
          ref={childRef}
          className="w-[80vw] h-[60vh] bg-black rounded-3xl flex items-center justify-center shadow-2xl"
          // style={{ scale: 0.5, opacity: 0.5 }}
        >
          <div className="text-center p-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Zoom Effect
            </h2>
            <p className="text-xl md:text-2xl text-white/80">
              This container scales smoothly as you scroll
            </p>
          </div>
        </div>
      </div>

      {/* Spacer after */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Keep Scrolling
        </h1>
      </div>
    </div>
  );
}