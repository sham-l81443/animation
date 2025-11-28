'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger2() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          scale: 1,
          opacity: 0.5,
        },
        {
          scale: 1000,
          opacity: 1,
          ease: 'circ.in',
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
    <div ref={containerRef} className='h-[1200vh]'>
      <div className="fixed overflow-hidden top-0 left-0 w-full h-full flex items-center justify-center">
        <span ref={textRef} className='text-white text-4xl'>Test</span>
      </div>
    </div>
  );
}