'use client'
import Navbar from '@/components/others/navbar';
import BallFallAnim from '@/components/others/ball-fall-anim';
import HeroTextAnim from '@/components/others/hero-text-anim';
import { gsap } from 'gsap';
import { useRef } from 'react';

const Motion2 = () => {
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    
    // Create timeline once and reuse it
    if (!tlRef.current) {
        tlRef.current = gsap.timeline();
    }
    
    return (
        <main className='overflow-auto bg-white'>
            {/* <Navbar /> */}
            <BallFallAnim tl={tlRef.current} />
            {/* <HeroTextAnim tl={tlRef.current} /> */}
        </main>
    )
}

export default Motion2