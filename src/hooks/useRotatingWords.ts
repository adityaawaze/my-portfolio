import { useEffect, useState } from 'react';

export function useRotatingWords(words: string[], intervalMs = 2800) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cycle = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setPhase('in');
      }, 400);
    }, intervalMs);

    return () => clearInterval(cycle);
  }, [words.length, intervalMs]);

  return { word: words[index], phase, index };
}
