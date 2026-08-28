import { useEffect, useState, useRef } from 'react';

export default function useSequentialTypewriter(texts, { speed = 55, speedVariance = 35, gap = 700 } = {}) {
  const [typed, setTyped] = useState(texts.map(() => ''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTyped(texts.map(() => ''));
    setActiveIndex(0);
    setIsDone(false);
    let cancelled = false;

    const randomDelay = () => speed + Math.random() * speedVariance;

    const typeSegment = (index) => {
      if (cancelled) return;
      if (index >= texts.length) {
        setIsDone(true);
        return;
      }
      setActiveIndex(index);
      const text = texts[index] || '';
      let charIndex = 0;

      const tick = () => {
        if (cancelled) return;
        charIndex++;
        setTyped((prev) => {
          const next = [...prev];
          next[index] = text.slice(0, charIndex);
          return next;
        });
        if (charIndex < text.length) {
          // Jeda sedikit lebih lama setelah tanda baca, meniru ritme menulis natural
          const lastChar = text[charIndex - 1];
          const punctuationPause = /[.,!?]/.test(lastChar) ? 250 : 0;
          timeoutRef.current = setTimeout(tick, randomDelay() + punctuationPause);
        } else {
          timeoutRef.current = setTimeout(() => typeSegment(index + 1), gap);
        }
      };

      if (text.length === 0) {
        timeoutRef.current = setTimeout(() => typeSegment(index + 1), gap);
      } else {
        tick();
      }
    };

    typeSegment(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts.join('|~|'), speed, speedVariance, gap]);

  return { typed, activeIndex, isDone };
}