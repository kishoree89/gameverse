import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  to: number;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ to, suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setValue(to);
    const controls = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
