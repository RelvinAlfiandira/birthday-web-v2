import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// GANTI path ini dengan gambar bunga kamu sendiri
import flower1 from "../assets/images/flower-white.png";
import flower2 from "../assets/images/flower-blue.png";
import flower3 from "../assets/images/flower-pink.png";

const FLOWERS = [flower1, flower2, flower3];

function buildSpiral({ revolutions, maxRadius, startAngle, steps = 10 }) {
  const xs = [], ys = [], rotates = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const eased = Math.pow(t, 0.75); // start pelan, makin cepat keluar
    const angle = startAngle + eased * revolutions * Math.PI * 2;
    const radius = eased * maxRadius;
    xs.push(Math.cos(angle) * radius);
    ys.push(Math.sin(angle) * radius);
    rotates.push((startAngle * 180) / Math.PI + eased * revolutions * 360);
  }
  return { xs, ys, rotates };
}

export default function FlowerBurst({ onFilled, count = 45 }) {
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  const particles = useMemo(() => {
    if (!dims.w) return [];
    const maxRadius = Math.hypot(dims.w, dims.h) / 2 + 80;

    return Array.from({ length: count }).map((_, i) => {
      const startAngle = Math.random() * Math.PI * 2;
      const revolutions = 1.4 + Math.random() * 1.2; // 1.4 - 2.6 putaran
      const { xs, ys, rotates } = buildSpiral({ revolutions, maxRadius, startAngle });
      const baseSize = Math.random() * 30 + 40;

      const scales = xs.map((_, idx) => {
        const t = idx / (xs.length - 1);
        return 0.3 + t * t * 3.2; // membesar drastis di akhir -> kesan zoom
      });
      const opacities = xs.map((_, idx) => (idx === 0 ? 0 : 1));

      return {
        id: i,
        image: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        xs, ys, rotates, scales, opacities, baseSize,
        delay: (i / count) * 0.9 + Math.random() * 0.15, // keluar berurutan
      };
    });
  }, [dims, count]);

  useEffect(() => {
    if (!particles.length) return;
    const lastDelay = Math.max(...particles.map((p) => p.delay));
    const totalTime = lastDelay + 1.1 + 0.3;
    const timer = setTimeout(() => onFilled?.(), totalTime * 1000);
    return () => clearTimeout(timer);
  }, [particles, onFilled]);

  if (!dims.w) return <div className="fixed inset-0 z-[999] bg-rose-50" />;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none bg-rose-50">
      {particles.map((p) => (
        <motion.img
          key={p.id}
          src={p.image}
          alt=""
          initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
          animate={{ x: p.xs, y: p.ys, scale: p.scales, rotate: p.rotates, opacity: p.opacities }}
          transition={{
            duration: 1.1,
            delay: p.delay,
            ease: "easeInOut",
            times: p.xs.map((_, idx) => idx / (p.xs.length - 1)),
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: p.baseSize,
            height: p.baseSize,
            objectFit: "contain",
            marginLeft: -p.baseSize / 2,
            marginTop: -p.baseSize / 2,
          }}
        />
      ))}
    </div>
  );
}