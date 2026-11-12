import { motion } from 'framer-motion';

const ORBS = [
  { cls: 'top-10 -left-24 h-72 w-72 bg-neon/30', x: [0, 40, 0], y: [0, 30, 0], d: 14 },
  { cls: 'top-1/3 -right-24 h-80 w-80 bg-cyber/20', x: [0, -50, 0], y: [0, 40, 0], d: 18 },
  { cls: 'bottom-0 left-1/3 h-64 w-64 bg-electric/25', x: [0, 30, 0], y: [0, -40, 0], d: 16 },
];

/** Decorative blurred neon orbs drifting in the background. */
export default function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {ORBS.map((o) => (
        <motion.div
          key={o.cls}
          className={`absolute rounded-full blur-3xl ${o.cls}`}
          animate={{ x: o.x, y: o.y }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
