# Animation System Documentation

## Overview

This animation system creates a sequential animation sequence using GSAP (GreenSock Animation Platform). It consists of three main components that work together using a shared timeline.

## Architecture

```
Motion2 (Parent Component)
├── Creates shared GSAP Timeline
├── Navbar Component
├── BallFallAnim Component (uses shared timeline)
└── HeroTextAnim Component (uses shared timeline + ScrollTrigger)
```

## Components

### 1. Motion2 (Parent Component)
**Location:** `app/motion-2/page.tsx`

**Purpose:** Creates and shares a GSAP timeline between child components.

**Key Features:**
- Creates a single timeline using `useRef` to persist across renders
- Passes the timeline to child components as a prop
- Ensures all animations are synchronized on the same timeline

```typescript
const tlRef = useRef<gsap.core.Timeline | null>(null);
if (!tlRef.current) {
    tlRef.current = gsap.timeline();
}
```

### 2. BallFallAnim Component
**Location:** `components/others/ball-fall-anim.tsx`

**Purpose:** Animates a black ball falling and scaling to cover the screen.

**Animation Sequence:**
1. **Initial State:** Ball positioned at screen center (100px × 100px)
2. **Step 1:** Ball falls to bottom with bounce effect (1.2s duration)
3. **Step 2:** Ball scales up to cover entire screen (1.5s duration)
   - Calculates scale needed using screen diagonal
   - Moves ball back to center while scaling

**Key Code:**
```typescript
tl.to(ball, {
    y: viewportHeight - ballSize,
    duration: 1.2,
    ease: 'bounce.out',
})
.to(ball, {
    scale: scaleNeeded,
    x: centerX,
    y: centerY,
    duration: 1.5,
    ease: 'power2.out',
})
```

### 3. HeroTextAnim Component
**Location:** `components/others/hero-text-anim.tsx`

**Purpose:** Animates text appearing with typing effect and scroll-triggered reveals.

**Animation Sequence:**

#### Part 1: "Hi" Typing Effect (Timeline-based)
- **Initial State:** All letters start with `opacity: 0`
- **"H" appears:** Fades in at `-0.5s` relative to ball scaling completion (0.3s duration)
- **"i" appears:** Fades in at `-0.2s` relative to "H" completion (0.3s duration)

#### Part 2: Rest of Text (ScrollTrigger-based)
- Letters from index 2 onwards (after "Hi") use ScrollTrigger
- Each letter fades in based on scroll position
- Uses `scrub: 2` for smooth scroll-linked animation

**Key Code:**
```typescript
// "Hi" typing effect
tl.to(lettersRef.current[0], {
    opacity: 1,
    duration: 0.3,
}, '-=0.5')
.to(lettersRef.current[1], {
    opacity: 1,
    duration: 0.3,
}, '-=0.2')

// Scroll-triggered letters
gsap.to(letter, {
    opacity: 1,
    scrollTrigger: {
        trigger: lettersContainerRef.current,
        start: `top+=${progress * 80}% top+=320px`,
        scrub: 2,
    },
});
```

## How It Works

### Timeline Sharing
The timeline is created once in the parent component and shared via props. This ensures:
- All animations are on the same timeline
- Animations execute in the correct sequence
- No timing conflicts between components

### Animation Timing
The animations use relative positioning (`-=0.5`, `-=0.2`) to overlap:
- "H" starts 0.5s before ball scaling completes
- "i" starts 0.2s after "H" starts
- Creates a smooth typing effect

### ScrollTrigger Setup
- Container has `h-[800vh]` (8x viewport height) to enable scrolling
- Each letter's ScrollTrigger is calculated based on its position in the sentence
- `scrub: 2` creates smooth scroll-linked animation

## Animation Flow

```
1. Page Loads
   ↓
2. Ball appears at center
   ↓
3. Ball falls to bottom (1.2s)
   ↓
4. Ball scales to cover screen (1.5s)
   ↓
5. "H" fades in (0.3s, starts at -0.5s from step 4)
   ↓
6. "i" fades in (0.3s, starts at -0.2s from step 5)
   ↓
7. User scrolls → Rest of text reveals letter by letter
```

## Key Concepts

### useGSAP Hook
- Automatically handles cleanup
- Runs after component mounts
- Provides scope for animations

### Timeline Positioning
- `'-=0.5'` means "start 0.5 seconds before the previous animation ends"
- Creates overlapping animations for smooth transitions

### ScrollTrigger
- Links animations to scroll position
- `scrub: 2` makes animation follow scroll smoothly
- Each letter has a unique trigger point based on scroll progress

## Dependencies

- `gsap` - Animation library
- `@gsap/react` - React hooks for GSAP
- `ScrollTrigger` - GSAP plugin for scroll-based animations

## Notes

- All letters start with `opacity: 0` in CSS and GSAP
- The timeline is created once and reused (not recreated on each render)
- Components wait for DOM elements to be ready before animating
- The ball container is fixed and covers the entire screen initially

