'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const Step1 = () => {
    const blockref = useRef<(HTMLDivElement | null)[]>([])
    const infoRef = useRef<HTMLDivElement>(null)
    const skillRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const experienceRef = useRef<HTMLDivElement>(null)
    const journeyRef = useRef<HTMLDivElement>(null)
    const educationRef = useRef<HTMLDivElement>(null)

    const [currentInfo, setCurrentInfo] = useState<string>('info')
    const prevInfoRef = useRef<string>('info')

    useGSAP(() => {
        if (!blockref.current || blockref.current.length === 0) return

        // Animate boxes sliding in from right with fade and stagger
        gsap.to(blockref.current, {
            x: 0,
            opacity: 1,
            duration: 5,
            ease: '',
            stagger: 0.4, // Delay between each box animation
        })
    })

    // Animate section transitions: exit left, then enter from top
    useEffect(() => {
        const sectionRefs: Record<string, HTMLDivElement | null> = {
            info: infoRef.current,
            skills: skillRef.current,
            projects: projectsRef.current,
            experience: experienceRef.current,
            journey: journeyRef.current,
            education: educationRef.current,
        }

        const previousRef = sectionRefs[prevInfoRef.current]
        const currentRef = sectionRefs[currentInfo]

        // If this is the initial mount, just animate the current section in
        if (prevInfoRef.current === currentInfo) {
            if (currentRef) {
                gsap.set(currentRef, {
                    y: -400,
                    opacity: 0,
                    x: 0,
                })
                gsap.to(currentRef, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                })
            }
            // Hide other sections initially
            Object.entries(sectionRefs).forEach(([key, ref]) => {
                if (key !== currentInfo && ref) {
                    gsap.set(ref, {
                        opacity: 0,
                        x: 0,
                        y: 0,
                    })
                }
            })
            prevInfoRef.current = currentInfo
            return
        }

        // Animate previous section out to the left
        if (previousRef) {
            gsap.to(previousRef, {
                x: -400,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
            })
        }

        // After delay, animate new section in from top
        if (currentRef) {
            // Set initial state: section off-screen to the top and invisible
            gsap.set(currentRef, {
                y: -400,
                opacity: 0,
                x: 0,
            })

            // Animate section sliding in from top after delay
            gsap.to(currentRef, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.3, // Delay after previous section exits
            })
        }

        prevInfoRef.current = currentInfo
    }, [currentInfo])

    const handleMouseEnter = (section: string) => {
        setTimeout(() => {
            setCurrentInfo(section)
        }, 200)
    }

    const center = "flex items-center justify-center text-2xl font-black tracking-widest cursor-pointer bg-gradient-to-br from-zinc-300 to-zinc-900"
    
    return (
        <div className='grid grid-cols-4 h-screen w-full p-5'>
            <div className="col-span-3 md:col-span-2 relative">
                <div ref={(el) => { infoRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'info' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Anusha</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Anusha is a software engineer with a passion for building web applications. She is a quick learner and a team player.</p>
                </div>
                <div ref={(el) => { skillRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'skills' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Skills</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div>
                <div ref={(el) => { projectsRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'projects' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Projects</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Anusha is a software engineer with a passion for building web applications. She is a quick learner and a team player.</p>
                </div>
                <div ref={(el) => { experienceRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'experience' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Experience</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Anusha is a software engineer with a passion for building web applications. She is a quick learner and a team player.</p>
                </div>
                <div ref={(el) => { journeyRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'journey' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Journey</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Anusha is a software engineer with a passion for building web applications. She is a quick learner and a team player.</p>
                </div>
                <div ref={(el) => { educationRef.current = el }} className={`absolute inset-0 p-4 flex flex-col ${currentInfo !== 'education' ? 'pointer-events-none' : ''}`}>
                    <h1 className="text-5xl text-zinc-700 font-extrabold pt-10">Education</h1>
                    <p className="text-4xl font-medium text-zinc-500 pt-5 max-w-xl">Anusha is a software engineer with a passion for building web applications. She is a quick learner and a team player.</p>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-5 grid-rows-5 h-full p-5 gap-y-0.5">
                <div onClick={() => handleMouseEnter('skills')}  ref={(el) => { blockref.current[4] = el }} className={` opacity-0 col-span-1 col-start-5 -ml-5 ${center}`}>Skills</div>
                <div onClick={() => handleMouseEnter('projects')}  ref={(el) => { blockref.current[3] = el }} className={` opacity-0 col-span-1 col-start-4  -ml-5 ${center}`}>Projects</div>
                <div onClick={() => handleMouseEnter('experience')}  ref={(el) => { blockref.current[2] = el }} className={` opacity-0 col-span-1 col-start-3  -ml-5 ${center}`}>Experience</div>
                <div onClick={() => handleMouseEnter('journey')}  ref={(el) => { blockref.current[1] = el }} className={` opacity-0 col-span-1 col-start-2  -ml-5 ${center}`}>Journey</div>
                <div onClick={() => handleMouseEnter('education')}  ref={(el) => { blockref.current[0] = el }} className={` opacity-0 col-span-1 col-start-1  -ml-5 ${center}`}>Education</div>
            </div>

        </div>
    )
}

export default Step1