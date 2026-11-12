import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import SmartImage from '../common/SmartImage';

interface Props {
  title: string;
  frames: string[];
  tagline: string;
}

const FRAME_MS = 3500;

/**
 * Cinematic "trailer" built from the game's own screenshots: crossfades with a
 * Ken Burns pan. shortcut: no real video, swap in a <video> once local trailer files exist.
 */
export default function TrailerPreview({ title, frames, tagline }: Props) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(!reduce);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % frames.length), FRAME_MS);
    return () => window.clearTimeout(t);
  }, [playing, i, frames.length]);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.15, x: i % 2 ? '-3%' : '3%' }}
            animate={playing ? { scale: 1, x: '0%' } : undefined}
            transition={{ duration: FRAME_MS / 1000 + 1, ease: 'linear' }}
          >
            <SmartImage src={frames[i]} alt={`${title} trailer frame ${i + 1}`} width={1280} height={720} className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-md bg-black/60 px-2.5 py-1 text-xs font-bold tracking-widest text-white">
        <span className={`h-2 w-2 rounded-full ${playing ? 'animate-pulse bg-rose-500' : 'bg-slate-500'}`} /> TRAILER
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-6 bottom-14 left-6 font-display text-lg font-bold text-white sm:text-2xl"
        >
          {i === 0 ? title : i === frames.length - 1 ? 'Available now' : tagline}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 grid place-items-center"
        aria-label={playing ? 'Pause trailer' : 'Play trailer'}
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`animated-gradient grid h-16 w-16 place-items-center rounded-full text-white shadow-2xl shadow-neon/50 transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        >
          {playing ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7 fill-white" />}
        </motion.span>
      </button>

      <div className="absolute right-4 bottom-4 left-4 flex gap-1.5">
        {frames.map((_, n) => (
          <span key={n} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            {n < i && <span className="block h-full w-full bg-cyber" />}
            {n === i && (
              <motion.span
                key={`${i}-${playing}`}
                className="block h-full bg-gradient-to-r from-neon to-cyber"
                initial={{ width: '0%' }}
                animate={{ width: playing ? '100%' : '0%' }}
                transition={{ duration: playing ? FRAME_MS / 1000 : 0, ease: 'linear' }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
