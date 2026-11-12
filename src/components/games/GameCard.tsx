import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import type { Game } from '../../types';
import SmartImage from '../common/SmartImage';
import RatingComponent from '../common/RatingComponent';
import FavoriteButton from './FavoriteButton';
import { getCategory } from '../../data/categories';
import { compact, formatPrice } from '../../utils/format';

export default function GameCard({ game }: { game: Game }) {
  const category = getCategory(game.category);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color,box-shadow] hover:border-neon/50 hover:shadow-2xl hover:shadow-neon/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={game.cover}
          alt={`${game.title} cover art`}
          width={640}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        <span className={`absolute top-3 left-3 rounded-lg bg-gradient-to-r ${category?.accent} px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow`}>
          {category?.name}
        </span>
        <div className="absolute top-3 right-3">
          <FavoriteButton game={game} />
        </div>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold text-cyber backdrop-blur">
          {formatPrice(game.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-snug text-white">{game.title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted" title="Monthly players">
            <Users className="h-3.5 w-3.5" /> {compact(game.players * 1000)}
          </span>
        </div>
        <RatingComponent value={game.rating} reviews={game.reviews} />
        <p className="line-clamp-2 text-sm text-muted">{game.description}</p>
        <Link
          to={`/games/${game.id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:border-neon/50 group-hover:bg-neon/20"
        >
          View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
