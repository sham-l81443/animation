'use client'
import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const BallFallAnim = ({ tl }: { tl: gsap.core.Timeline }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const ballRef = useRef<HTMLDivElement>(null)
    const [isBallFall, setIsBallFall] = useState(false)
    const centerPointRef = useRef<HTMLDivElement>(null)
    // word
    const words = "I engineer high-performance interfaces and reliable backend systems"
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
    const mainContainerRef = useRef<HTMLDivElement>(null)
    const contentContainerRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLHeadingElement>(null)
    const socialsContainerRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        if (!ballRef.current || !containerRef.current || !centerPointRef.current || !mainContainerRef.current || !contentContainerRef.current || !nameRef.current || !socialsContainerRef.current) return






        const ball = ballRef.current
        // Get viewport dimensions
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate center position
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 3

        // Ball size (assuming 100px diameter)
        const ballSize = 100
        const ballRadius = ballSize / 2

        // Set initial position to center
        gsap.set(ball, {
            x: centerX - ballRadius,
            y: centerY - ballRadius,
            scale: 1,
            borderRadius: '50%',
        })

        gsap.set(centerPointRef.current, {
            opacity: 0,
        })


        // Calculate scale needed to cover entire screen (diagonal + some padding)
        const diagonal = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2)
        const scaleNeeded = (diagonal / ballSize) * 1.2 // 1.2 for padding to ensure full coverage

        // Use the shared timeline instead of creating a new one
        // Step 1: Ball falls from center to bottom
        tl.to(ball, {
            y: viewportHeight - ballSize,
            duration: 1.2,
            ease: 'bounce.out',
        }).to(ball, {
            scale: scaleNeeded,
            x: centerX,
            y: centerY,
            duration: 1.5,
            ease: 'circ.in',
        }).call(() => {
            setIsBallFall(true)
        })
        const animateWords = () => {
            // Check if words are rendered
            if (wordsRef.current.length !== words.split('').length) {
                setTimeout(animateWords, 50) // Retry after 50ms
                return
            }

            // Set initial state for all words
            wordsRef.current.forEach((word) => {
                if (word) {
                    tl.set(word, {
                        opacity: 0,
                        scale: 0,
                    })
                }
            })
            if (socialsContainerRef.current) {
                tl.set(socialsContainerRef.current, {
                    opacity: 0,
                })
            }

            // Animate words with stagger (one by one)
            wordsRef.current.forEach((word, index) => {
                if (word) {
                    tl.to(word, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.1, // Slightly longer for visibility
                        ease: 'back.out(1.7)', // Bouncy effect
                    }, `-=${0.05}`) // Overlap slightly for smoother flow
                }
            })

            if (socialsContainerRef.current) {
                tl.to(socialsContainerRef.current, {
                    opacity: 1,
                    duration: 2,
                    delay: 1,
                    ease: 'power2.inOut',
                }, '-=2').call(() => {
                    // Create scroll-triggered timeline
                    const scrollTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: mainContainerRef.current,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 2,
                        }
                    })

                    // Scale up container
                    scrollTl.to(contentContainerRef.current, {
                        scale: 600,
                        ease: 'power2.inOut',
                    })

                    // Center point
                    scrollTl.to(centerPointRef.current, {
                        opacity: 1,
                        ease: 'power2.inOut',
                    },0)
                })
            }

        }


        if (nameRef.current) {
            // Set initial gradient background
            gsap.set(nameRef.current, {
                backgroundImage: 'linear-gradient(90deg, #222222 0%, #030303 50%, #222222 100%)',
                backgroundSize: '200% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundPosition: '200% 0',
            })

            // Animate the background position for shimmer effect
            gsap.to(nameRef.current, {
                backgroundPosition: '-250% 0',
                duration: 5,
                delay: 1,
                // repeat: -1,
                ease: 'sine',
            })
        }

        // Start checking for words after ball animation starts
        setTimeout(animateWords, 500) // Wait a bit for React to render
    }, { scope: containerRef })

    return (
        <>
            {!isBallFall && (
                <>
                    <div
                        ref={containerRef}
                        className="fixed inset-0 bg-white overflow-hidden z-50"
                    >
                        <div
                            ref={ballRef}
                            className="absolute w-[100px] h-[100px] bg-linear-to-r from-black  via-zinc-900 to-black z-10!"
                        />
                    </div>
                </>
            )}
            <div ref={mainContainerRef} className="relative h-[700vh]">
                <div ref={contentContainerRef} className="fixed h-screen grid grid-cols-4 grid-rows-3 inset-0 overflow-auto  bg-linear-to-tr from-black via-black to-zinc-900">

                    <div ref={centerPointRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black h-1 w-1 rounded-full">
                    <div className="grid grid-cols-2 grid-rows-2">
                        <Image className='scale-50' src="/Git.svg" alt="Git" width={20} height={20} />
                        <Image className='scale-50' src="/Git.svg" alt="Git" width={20} height={20} />
                        <Image className='scale-50' src="/Git.svg" alt="Git" width={20} height={20} />
                        <Image className='scale-50' src="/Git.svg" alt="Git" width={20} height={20} />
                    </div>
                    </div>

                    <div className="col-span-2 row-span-1 center flex items-center justify-center">
                        <h1 ref={nameRef} className='text-transparent text-9xl font-bold text-center font-roboto tracking-wide leading-snug origin-center'>Shameel</h1>
                    </div>
                    <div className="col-start-3 col-end-5 row-span-2 p-4 flex items-center justify-center">
                        <h1 className='  text-6xl font-semibold text-start font-roboto tracking-wide leading-snug'>
                            {
                                words.split('').map((word, index) => (
                                    <span key={index} ref={(el) => {
                                        wordsRef.current[index] = el
                                    }} className="bg-clip-text text-transparent bg-linear-to-r from-zinc-300 via-zinc-300 to-zinc-500 opacity-0">
                                        {word}
                                    </span>
                                ))
                            }
                        </h1>
                    </div>

                    <div ref={socialsContainerRef} className="col-start-3 col-span-2 [&>button]:hover:bg-transparent row-start-3 row-span-1 flex items-center justify-center gap-6">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="group relative"
                        >
                            <GithubIcon className="size-6 text-zinc-400 group-hover:-translate-y-1 duration-300 " />
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 blur-sm duration-400 group-hover:block hidden"></span>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="group relative"
                        >
                            <LinkedinIcon className="size-6 text-zinc-400 group-hover:-translate-y-1 duration-300 " />
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 blur-sm duration-300 group-hover:block hidden"></span>
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="group relative"
                        >
                            <MailIcon className="size-6 text-zinc-400 group-hover:-translate-y-1 duration-300 " />
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 blur-sm duration-300 group-hover:block hidden"></span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BallFallAnim