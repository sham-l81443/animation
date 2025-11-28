"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContainerScroll({
  titleComponent,
  children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
  }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current || !cardRef.current || !headerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const scaleStart = isMobile ? 0.7 : 1.05;
    const scaleEnd = isMobile ? 0.9 : 1;

    // Animate the card
    gsap.fromTo(
      cardRef.current,
      {
        rotateX: 50,
        scale: scaleStart,
        z: 200,
      },
      {
        rotateX: 0,
        z: 0,
        scale: scaleEnd,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(

      imageRef.current,
      {
        scale: 1,
      },
      {
        scale: 1.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );
    // Animate the header
    gsap.fromTo(
      headerRef.current,
      {
        y: 0,
      },
      {
        y: -100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="h-[200vh]  flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <div ref={headerRef} className="max-w-5xl mx-auto text-center">
          <div className="text-white text-7xl font-bold mb-20">Scroll Down to See More</div>
        </div>
        <div
          ref={cardRef}
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
        >
          <div ref={imageRef} className="h-full w-full  overflow-hidden! rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl ">
            <img className="h-full w-full object-cover" src="https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg" alt="" />
            
          </div>
        </div>
      </div>
    </div>
  );
};