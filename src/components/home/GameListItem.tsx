import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Game } from '../../types';
import SmartImage from '../common/SmartImage';
import { getCategory } from '../../data/categories';
import { formatDate } from '../../utils/format';

interface Props {
  game: Game;
  index: number;
  meta?: 'date' | 'rating';
}

/** Compact horizontal row used in "Recently released" / "Top rated" lists. */
export default function GameListItem({ game, index, meta = 'rating' }: Props) {
  return (
    <motion.li initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
      <Link to={`/games/${game.id}`} className="group flex items-center gap-4 rounded-xl p-2 transition hover:bg-white/5">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
          <SmartImage src={game.cover} alt="" width={200} height={130} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white transition group-hover:text-cyber">{game.title}</p>
          <p className="text-xs text-muted">{getCategory(game.category)?.name} · {game.developer}</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-amber-300">
          {meta === 'date' ? <span className="text-xs text-slate-300">{formatDate(game.releaseDate)}</span> : `★ ${game.rating.toFixed(1)}`}
        </span>
      </Link>
    </motion.li>
  );
}
