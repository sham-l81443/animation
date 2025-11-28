'use client'
import { useGSAP } from '@gsap/react'
import React, { useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroTextAnim = ({ tl }: { tl: gsap.core.Timeline }) => {
    const wordsContainerRef = useRef<HTMLDivElement>(null)
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
    const sentence = "I engineer high-performance interfaces and reliable backend systems";
    const words = sentence.split('');
    const textContainerRef = useRef<HTMLDivElement>(null)
    const fixedContainerRef = useRef<HTMLDivElement>(null)
    const redContainerRef = useRef<HTMLDivElement>(null)
    const scaleContainerRef = useRef<HTMLDivElement>(null)
    const skillIconsRef = useRef<(HTMLDivElement | null)[]>([])
    const javascriptIconRef = useRef<HTMLDivElement>(null)

    // Skills array - JavaScript in center, others surrounding
    // Using Simple Icons CDN for real technology logos
    const skills = [
        {
            name: 'React',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
            color: '#61DAFB'
        },
        {
            name: 'Next.js',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
            color: '#000000'
        },
        {
            name: 'TypeScript',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
            color: '#3178C6'
        },
        {
            name: 'Express.js',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg',
            color: '#000000'
        },
        {
            name: 'PostgreSQL',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
            color: '#4169E1'
        },
        {
            name: 'GraphQL',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg',
            color: '#E10098'
        },
        {
            name: 'Tailwind',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
            color: '#06B6D4'
        },
        {
            name: 'React Query',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reactquery.svg',
            color: '#FF4154'
        },
        {
            name: 'Zustand',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zustand.svg',
            color: '#443F37'
        },
        {
            name: 'React Native',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
            color: '#61DAFB'
        },
        {
            name: 'React Hook Form',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reacthookform.svg',
            color: '#EC5990'
        },
        {
            name: 'Git',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg',
            color: '#F05032'
        },
    ]

    const javascriptIcon = 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg'

    // Generate beautifully scattered positions for skills with minimum distance
    const skillPositions = useMemo(() => {
        const positions: Array<{ left: number; top: number }> = [];
        const minDistance = 12; // Minimum distance between icons in percentage
        const padding = 8; // Padding from edges
        const centerRadius = 8; // Avoid center area where JavaScript is (50% ± radius)
        const maxAttempts = 200; // Maximum attempts to find a valid position

        // Helper function to check if a position is too close to existing positions or center
        const isTooClose = (x: number, y: number, existingPositions: Array<{ left: number; top: number }>) => {
            // Check distance from center (where JavaScript is)
            const centerDistance = Math.sqrt(
                Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
            );
            if (centerDistance < centerRadius) {
                return true;
            }

            // Check distance from other icons
            for (const pos of existingPositions) {
                const distance = Math.sqrt(
                    Math.pow(x - pos.left, 2) + Math.pow(y - pos.top, 2)
                );
                if (distance < minDistance) {
                    return true;
                }
            }
            return false;
        };

        // Generate positions with minimum distance constraint
        for (let i = 0; i < skills.length; i++) {
            let attempts = 0;
            let left: number, top: number;

            do {
                // Use a more balanced distribution - create zones for visual interest
                // Most icons in mid-range, some near edges, avoid center
                const zone = Math.random();
                if (zone < 0.5) {
                    // Mid zone - most icons here (20-80%)
                    left = Math.random() * 60 + 20; // 20% to 80%
                    top = Math.random() * 60 + 20; // 20% to 80%
                } else if (zone < 0.8) {
                    // Wider zone (10-90%)
                    left = Math.random() * 80 + 10; // 10% to 90%
                    top = Math.random() * 80 + 10; // 10% to 90%
                } else {
                    // Edge zone - fewer icons (8-92%)
                    left = Math.random() * 84 + padding; // 8% to 92%
                    top = Math.random() * 84 + padding; // 8% to 92%
                }

                // If too close to center, try again
                const centerDist = Math.sqrt(Math.pow(left - 50, 2) + Math.pow(top - 50, 2));
                if (centerDist < centerRadius) {
                    // Push away from center
                    const angle = Math.atan2(top - 50, left - 50);
                    left = 50 + Math.cos(angle) * (centerRadius + 2);
                    top = 50 + Math.sin(angle) * (centerRadius + 2);
                }

                attempts++;
            } while (isTooClose(left, top, positions) && attempts < maxAttempts);

            positions.push({ left, top });
        }

        return positions;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only generate once on mount

    useGSAP(() => {
        if (!wordsContainerRef.current) return;

       
        // Wait for all words to be rendered
        const checkWords = () => {
            // if (wordsRef.current.length !== words.length) {
            //     setTimeout(checkWords, 0);
            //     return;
            // }

            // Set initial state for all words (opacity: 0)
            wordsRef.current.forEach((word) => {
                if (word) {
                    tl.set(word, {
                        opacity: 0,
                        scale: 0,
                    });
                }
            });

            // Fade in each word with random duration
            wordsRef.current.forEach((word, index) => {
                if (word) {
                    tl.to(word, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.04,
                        ease: 'circ',
                    });
                }
            });
        };
        gsap.to(textContainerRef.current, {
            scale: 150,
            ease: 'power1.in',
            duration: 5,
            scrollTrigger: {
                trigger: wordsContainerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                markers: true, // Uncomment to debug
            },
        });


            // wordsRef.current.forEach((word, index) => {
            //     if (word) {
            //         gsap.to(word, {
            //             opacity: 1,
            //             scale: 0.5,
            //             duration: 1,
            //             ease: 'circ',
            //             scrollTrigger: {
            //                 trigger: wordsContainerRef.current,
            //                 start: 'top top',
            //                 end: 'bottom bottom',
            //                 scrub: 1,
            //                 markers: true, // Uncomment to debug
            //             },
            //         });
            //     }
            // });


        // gsap.to(wordsContainerRef.current, {
        //     opacity: 0,
        //     pointerEvents: 'none',
        //     scrollTrigger: {
        //         trigger: wordsContainerRef.current,
        //         start: 'bottom bottom',
        //         end: 'bottom top',
        //         scrub: true,
        //         markers: true,
        //     },
        // });
        // gsap.to(fixedContainerRef.current, {
        //     opacity: 0,
        //     pointerEvents: 'none',
        //     scrollTrigger: {
        //         trigger: wordsContainerRef.current,
        //         start: 'bottom bottom',
        //         end: 'bottom top',
        //         scrub: true,
        //     },
        //     markers: true,
        // });

        

        

        checkWords();
    }, { scope: wordsContainerRef })



    return (
        <>
            <div ref={wordsContainerRef} className='h-[500vh] relative bg-black'>
                <div ref={fixedContainerRef} className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden px-4 py-8">
                    <div
                        ref={textContainerRef}
                        className="md:text-7xl text-3xl text-center font-black max-w-5xl leading-relaxed bg-clip-text text-transparent bg-linear-to-r from-zinc-800 via-zinc-300 to-zinc-800"
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {words.map((word, index) => (
                            <span
                                key={index}
                                ref={(el) => {
                                    wordsRef.current[index] = el;
                                }}
                                style={{
                                    opacity: 0,
                                }}
                                className='capitalize'
                            >
                                {word === ' ' ? '\u00A0' : word}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default HeroTextAnim


