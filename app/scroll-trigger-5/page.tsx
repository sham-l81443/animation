'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger2() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const sentence = "Welcome to the future of interactive design and animation";
  const words = sentence.split(' ');

  useEffect(() => {
    if (containerRef.current) {
      wordsRef.current.forEach((word, index) => {
        if (word) {
          const progress = index / words.length;
          
          gsap.fromTo(
            word,
            {
              opacity: 0.4,
              scale: 1,
              z: -1000,
            },
            {
              opacity: 1,
              scale: 1,
              z: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${progress * 80}% top`,
                end: `top+=${(progress + 0.1) * 80}% top`,
                scrub: 1,
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className='h-[500vh]'>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center perspective-[1000px]">
        <div className="text-white text-8xl text-center max-w-4xl">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                wordsRef.current[index] = el;
              }}
              className="inline-block mx-2 my-1"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}