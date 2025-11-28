'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger2() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  const lines = [
    "This is the first line of text",
    "Here comes the second line",
    "And now the third line appears",
    "The fourth line follows",
    "Finally the last line fades in"
  ];

  useEffect(() => {
    if (containerRef.current) {
      linesRef.current.forEach((line, index) => {
        if (line) {
          gsap.fromTo(
            line,
            {
              opacity: 0.1,
            },
            {
              opacity: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${index * 10}% top`,
                end: `top+=${(index + 1) * 10}% top`,
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
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-white text-7xl font-bold text-center space-y-4">
          {lines.map((line, index) => (
            <div key={index}>
              <span
                ref={(el) => {
                  linesRef.current[index] = el;
                }}
                className="block"
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}