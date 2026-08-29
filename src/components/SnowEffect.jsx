import React, { useMemo } from "react";

import flowerWhite from "../assets/images/flower-white.png";
import flowerBlue from "../assets/images/flower-blue.png";
import flowerPink from "../assets/images/flower-pink.png";

const FLOWERS = [flowerWhite, flowerBlue, flowerPink];

export default function SnowEffect({ count = 15, color = "#f472b6", opacity = 0.3 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 20,
      duration: Math.random() * 8 + 14,
      delay: Math.random() * 10,
      swayDistance: Math.random() * 40 + 30,
      swayDuration: Math.random() * 3 + 4,
      rotateDuration: Math.random() * 6 + 8,
      flower: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-30px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity,
            filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
            animation: `flower-fall ${p.duration}s linear ${p.delay}s infinite`,
            "--sway-distance": `${p.swayDistance}px`,
            "--sway-duration": `${p.swayDuration}s`,
            "--rotate-duration": `${p.rotateDuration}s`,
          }}
        >
          <img
            src={p.flower}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              animation: `flower-sway var(--sway-duration) ease-in-out infinite alternate, flower-rotate var(--rotate-duration) linear infinite`,
            }}
          />
        </span>
      ))}

      <style>{`
        @keyframes flower-fall {
          0% { transform: translateY(-30px); }
          100% { transform: translateY(110vh); }
        }
        @keyframes flower-sway {
          0% { margin-left: 0px; }
          100% { margin-left: var(--sway-distance); }
        }
        @keyframes flower-rotate {
          0% { rotate: 0deg; }
          100% { rotate: 360deg; }
        }
      `}</style>
    </div>
  );
}