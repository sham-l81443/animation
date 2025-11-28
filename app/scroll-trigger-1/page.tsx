'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger1() {
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    textRefs.current.forEach((text) => {
      if (text) {
        gsap.fromTo(
          text,
          {
            opacity: 0,
            color: '#666666',
          },
          {
            opacity: 1,
            color: '#ffffff',
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 100%',
              end: 'top 30%',
              scrub: 20,
              toggleActions: '',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const texts = [
    "Welcome to GSAP ScrollTrigger",
    "Each line fades in as you scroll",
    "Starting from a faded gray state",
    "Transforming into bright white",
    "Creating a smooth animation effect",
    "Scroll down to see more",
    "Each element animates independently",
    "The opacity increases gradually",
    "Along with the color change",
    "Making it visually engaging",
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-32">
          {texts.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className="text-4xl md:text-6xl font-bold text-center"
              style={{ opacity: 0.2, color: '#666666' }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}