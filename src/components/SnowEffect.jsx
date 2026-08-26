import React, { useMemo } from "react";

const FLOWERS = ["🌸", "💮", "🌺"];

export default function SnowEffect({ count = 15, color = "#f472b6" }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 14,
      duration: Math.random() * 8 + 14, // 14s - 22s (lebih lambat)
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.15,
      swayDistance: Math.random() * 40 + 30, // 30px - 70px (goyangan lebih lebar)
      swayDuration: Math.random() * 3 + 4, // 4s - 7s (goyangan lebih pelan)
      rotateDuration: Math.random() * 6 + 8, // 8s - 14s (rotasi lebih pelan)
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
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
            animation: `flower-fall ${p.duration}s linear ${p.delay}s infinite`,
            "--sway-distance": `${p.swayDistance}px`,
            "--sway-duration": `${p.swayDuration}s`,
            "--rotate-duration": `${p.rotateDuration}s`,
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: `flower-sway var(--sway-duration) ease-in-out infinite alternate, flower-rotate var(--rotate-duration) linear infinite`,
            }}
          >
            {p.flower}
          </span>
        </span>
      ))}

      <style>{`
        @keyframes flower-fall {
          0% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(110vh);
          }
        }
        @keyframes flower-sway {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: var(--sway-distance);
          }
        }
        @keyframes flower-rotate {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }
      `}</style>
    </div>
  );
}