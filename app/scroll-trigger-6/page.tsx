'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger2() {
  const lettersContainerRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const sentence = "Welcome to the future of interactive design and animation";
  const letters = sentence.split('');

  useEffect(() => {
    if (lettersContainerRef.current) {
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          const progress = index / letters.length;
          
          gsap.fromTo(
            letter,
            {
              opacity: 0,
              scale: 1,
            },
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: lettersContainerRef.current,
                start: `top+=${progress * 80}% bottom-=1000px`,
                // end: `top+=${(progress + 0.02) * 80}% bottom-=1000px`,
                scrub:2,
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
    <div ref={lettersContainerRef} className='h-[800vh]'>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
        <div className="text-white text-7xl text-center font-bold max-w-4xl leading-relaxed">
          {letters.map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className="inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}