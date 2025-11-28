'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTrigger1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  
  // Define navigation points for the rocket (section positions)
  const sections = [
    { x: '10%', y: '20%', rotate: 0 },      // Section 1
    { x: '50%', y: '30%', rotate: 45 },     // Section 2
    { x: '80%', y: '50%', rotate: 90 },     // Section 3
    { x: '20%', y: '70%', rotate: 135 },    // Section 4
    { x: '70%', y: '80%', rotate: 180 },    // Section 5
  ];
  
  useGSAP(() => {
    if (!rocketRef.current || !containerRef.current) return;
    
    const rocket = rocketRef.current;
    
    // Create timeline for rocket navigation through sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 10,
      },
    });
    
    // Animate rocket navigating through each section
    sections.forEach((section, index) => {
      if (index === 0) {
        // Set initial position
        gsap.set(rocket, {
          left: section.x,
          top: section.y,
          xPercent: -50, // Center the rocket
          yPercent: -50,
          rotation: section.rotate,
        });
      } else {
        // Animate to each subsequent section
        tl.to(rocket, {
          left: section.x,
          top: section.y,
          xPercent: -50, // Keep rocket centered
          yPercent: -50,
          rotation: section.rotate,
          ease: 'power2.inOut',
        });
      }
    });
    
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-[500vh] bg-gradient-to-b from-black via-purple-900 to-black relative overflow-hidden">
      {/* Sections with markers */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 rounded-full bg-yellow-400 opacity-50"
          style={{
            left: section.x,
            top: section.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Rocket */}
      <div 
        ref={rocketRef}
        className="fixed img pointer-events-none z-50"
      >
        <Image 
          src="/rocket.png"
          alt="Rocket"
          width={150}
          height={150}
          className="drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        />
      </div>
      
      {/* Section content */}
      {sections.map((section, index) => (
        <div
          key={`section-${index}`}
          className="absolute text-white p-8 rounded-lg bg-white/10 backdrop-blur-sm"
          style={{
            left: section.x,
            top: section.y,
            transform: 'translate(-50%, -50%)',
            marginTop: '100px',
          }}
        >
          <h2 className="text-2xl font-bold mb-2">Section {index + 1}</h2>
          <p className="text-sm opacity-80">Rocket navigates here</p>
        </div>
      ))}
      
      {/* Spacer for scroll height */}
      <div className="h-[400vh]" />
    </div>
  );
}