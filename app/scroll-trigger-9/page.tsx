"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContainerScroll({
  titleComponent,
  children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
  }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollContainerRef.current || !containerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    
    // Wait for layout to calculate scroll width properly
    const calculateMaxScroll = () => {
      return scrollContainer.scrollWidth - scrollContainer.clientWidth;
    };
    
    // Calculate max scroll after a brief delay to ensure DOM is ready
    const maxScrollLeft = calculateMaxScroll();
    
    gsap.to(scrollContainer, {
      scrollLeft: maxScrollLeft || 0,
      ease: "none",
      scale: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 1000px",
        scrub: 1, // Enable scrubbing for smooth scroll-linked animation
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });
  }, [])

  return (
    <div
      className="h-[1000vh] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="fixed inset-0">
        <div 
          ref={scrollContainerRef} 
          className="w-full h-full overflow-x-auto overflow-y-hidden flex gap-10 items-center px-20"
          style={{ scrollBehavior: 'auto' }} // Disable smooth scroll for GSAP control
        >
          {
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="min-w-[400px] h-56 bg-zinc-900 flex items-center justify-center text-white text-2xl font-bold">
                {index}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};