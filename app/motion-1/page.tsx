'use client';
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip);

const cards = [
  { id: 1, title: "Design", icon: "🎨", color: "from-blue-500 to-cyan-500", description: "Beautiful UI/UX" },
  { id: 2, title: "Code", icon: "💻", color: "from-purple-500 to-pink-500", description: "Clean & Efficient" },
  { id: 3, title: "Build", icon: "🚀", color: "from-orange-500 to-red-500", description: "Fast Performance" },
  { id: 4, title: "Launch", icon: "⭐", color: "from-green-500 to-emerald-500", description: "Success!" },
];

export default function FlipExample() {
  const [layout, setLayout] = useState<'grid' | 'list' | 'expanded'>('grid');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLayoutChange = (newLayout: 'grid' | 'list' | 'expanded') => {
    if (!containerRef.current) return;
    
    // Get the current state
    const state = Flip.getState(".card, .card-flip");
    
    // Change layout
    setLayout(newLayout);
    
    // Animate to new state
    Flip.to(state, {
      duration: 0.8,
      ease: "power2.inOut",
      scale: true,
      stagger: 0.1,
    });
  };

    const handleCardFlip = (cardId: number) => {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!card) return;
    
    const flipContainer = card.querySelector(".card-flip");
    if (!flipContainer) return;
    
    const newFlipped = new Set(flippedCards);
    const isFlipped = newFlipped.has(cardId);
    
    if (isFlipped) {
      newFlipped.delete(cardId);
    } else {
      newFlipped.add(cardId);
    }
    setFlippedCards(newFlipped);
    
    // Use GSAP to animate the flip
    gsap.to(flipContainer, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleCardExpand = (cardId: number) => {
    const cards = document.querySelectorAll(".card");
    const state = Flip.getState(cards);
    
    setSelectedCard(selectedCard === cardId ? null : cardId);
    
    Flip.to(state, {
      duration: 0.8,
      ease: "back.out(1.7)",
      scale: true,
      stagger: 0.05,
    });
  };

  useGSAP(() => {
    // Auto-flip cards on load
    const autoFlip = () => {
      cards.forEach((card, index) => {
        gsap.delayedCall(0.5 + index * 0.3, () => {
          if (!flippedCards.has(card.id)) {
            handleCardFlip(card.id);
          }
        });
      });
    };
    
    // Auto-flip back after delay
    const autoFlipBack = () => {
      cards.forEach((card, index) => {
        gsap.delayedCall(4 + index * 0.2, () => {
          if (flippedCards.has(card.id)) {
            handleCardFlip(card.id);
          }
        });
      });
    };
    
    autoFlip();
    autoFlipBack();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          GSAP Flip Plugin
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Smooth layout transitions and card flips
        </p>

        {/* Layout Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleLayoutChange('grid')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              layout === 'grid'
                ? 'bg-purple-600 text-white scale-110'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Grid Layout
          </button>
          <button
            onClick={() => handleLayoutChange('list')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              layout === 'list'
                ? 'bg-purple-600 text-white scale-110'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            List Layout
          </button>
          <button
            onClick={() => handleLayoutChange('expanded')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              layout === 'expanded'
                ? 'bg-purple-600 text-white scale-110'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Expanded
          </button>
        </div>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className={`transition-all duration-300 ${
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
              : layout === 'list'
              ? 'flex flex-col gap-4'
              : 'grid grid-cols-1 gap-6'
          }`}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              data-card-id={card.id}
              className={`card cursor-pointer ${
                layout === 'list' ? 'flex-row' : ''
              } ${selectedCard === card.id ? 'col-span-full' : ''}`}
              onClick={() => handleCardExpand(card.id)}
            >
              <div className="relative w-full h-64" style={{ perspective: '1000px' }}>
                <div
                  className="card-flip absolute inset-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Front */}
                  <div
                    className="card-front absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div
                      className={`h-full rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow-2xl flex flex-col justify-between transform transition-transform hover:scale-105`}
                    >
                      <div className="text-6xl mb-4">{card.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Click to flip
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div
                    className="card-back absolute inset-0 backface-hidden rotate-y-180"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div
                      className={`h-full rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow-2xl flex flex-col justify-center items-center text-center`}
                    >
                      <div className="text-4xl mb-4">{card.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {card.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardFlip(card.id);
                        }}
                        className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors"
                      >
                        Flip Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
