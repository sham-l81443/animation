"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

export default function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  
  useGSAP(() => {
    if (!videoRef.current || !containerRef.current) return;
    
    const video = videoRef.current;
    
    const setupAnimation = () => {
      if (video.duration) {
        gsap.to(video, {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Smooth out the scrubbing with a small delay
            invalidateOnRefresh: true,
          },
        });
      }
    };
    
    if (video.readyState >= 1) {
      setupAnimation();
    } else {
      video.addEventListener("loadedmetadata", setupAnimation);
    }
    
    return () => {
      video.removeEventListener("loadedmetadata", setupAnimation);
    };
  }, [isMobile]);

  return (
    <div
      className="h-[500vh] relative"
      ref={containerRef}
    >
      {/* Fixed video background */}
      <div className="fixed inset-0 w-full h-screen">
        <video 
          ref={videoRef} 
          src="/v1.mp4" 
          muted 
          playsInline 
          autoPlay
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            willChange: 'transform',
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center p-2 md:p-20">
        {titleComponent}
        {children}
      </div>
    </div>
  );
}