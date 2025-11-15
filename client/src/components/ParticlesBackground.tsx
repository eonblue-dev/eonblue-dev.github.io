import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: oklch(0.7 0.2 ${Math.random() * 60 + 180});
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        opacity: ${Math.random() * 0.3 + 0.1};
        pointer-events: none;
      `;
      
      canvasRef.current.appendChild(particle);
      particles.push(particle);

      // Animación continua de partículas
      animate(particle, {
        translateX: [
          { value: `${(Math.random() - 0.5) * 100}px`, duration: 300 },
          { value: 0, duration: 300 }
        ],
        translateY: [
          { value: `${(Math.random() - 0.5) * 100}px`, duration: 300 },
          { value: 0, duration: 300 }
        ],
        opacity: [
          { value: Math.random() * 0.5 + 0.2, duration: 300 },
          { value: Math.random() * 0.3 + 0.1, duration: 300 }
        ],
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
