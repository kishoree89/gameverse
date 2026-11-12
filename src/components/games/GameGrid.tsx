import { AnimatePresence, motion } from 'framer-motion';
import { Ghost } from 'lucide-react';
import type { Game } from '../../types';
import GameCard from './GameCard';

interface Props {
  games: Game[];
  emptyText?: string;
  cols?: 3 | 4;
}

export default function GameGrid({ games, emptyText = 'No games match your filters.', cols = 3 }: Props) {
  if (games.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass flex flex-col items-center gap-4 rounded-2xl px-6 py-20 text-center">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
          <Ghost className="h-14 w-14 text-neon" />
        </motion.div>
        <p className="font-display text-lg text-white">Nothing here… yet</p>
        <p className="max-w-sm text-sm text-muted">{emptyText}</p>
      </motion.div>
    );
  }
  return (
    <motion.div
      layout
      className={`grid gap-6 sm:grid-cols-2 ${cols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'xl:grid-cols-3'}`}
    >
      <AnimatePresence>
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
