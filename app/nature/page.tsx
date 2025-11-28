'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Nature = () => {

    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        if (!containerRef.current || !imageRef.current) return;
        gsap.set(imageRef.current, {
            scale: 20,
        })
        gsap.to(imageRef.current, {
           scale: 1,
           duration: 1,
           ease: 'power2.inOut',
           scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
           },
        })
    })

  return (
    <div ref={containerRef} className="relative h-[400vh]">
    <div className="fixed inset-0 w-full h-full bg-black">
        <Image ref={imageRef} className='w-full h-full object-cover' src="/nature.png" alt="Nature" width={1000} height={1000} />
    </div>
    </div>
  )
}

export default Nature