import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Monitor } from 'lucide-react';
import { featuredGames } from '../../data/games';
import { getCategory } from '../../data/categories';
import SmartImage from '../common/SmartImage';
import SectionHeading from '../common/SectionHeading';
import RatingComponent from '../common/RatingComponent';
import CustomButton from '../common/CustomButton';
import FavoriteButton from '../games/FavoriteButton';
import { formatDate, formatPrice } from '../../utils/format';

export default function FeaturedGames() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const game = featuredGames[index];

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % featuredGames.length), 6000);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  return (
    <section id="featured" className="container-gv scroll-mt-24 py-20">
      <SectionHeading eyebrow="Spotlight" title="Featured Games" subtitle="Hand-picked by our editors this week." link={{ to: '/explore', label: 'Browse all games' }} />
      <div
        className="glass relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative min-h-[540px] sm:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 6 }}>
                <SmartImage src={game.cover} alt={`${game.title} key art`} width={1600} height={800} className="h-full w-full object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent md:bg-gradient-to-r md:from-void md:via-void/80 md:to-transparent" />
              <div className="relative flex h-full max-w-2xl flex-col justify-end p-6 sm:p-10 md:justify-center">
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={`mb-4 w-fit rounded-lg bg-gradient-to-r ${getCategory(game.category)?.accent} px-3 py-1 text-xs font-bold tracking-wider text-white uppercase`}>
                  {getCategory(game.category)?.name}
                </motion.span>
                <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-3xl font-black text-white sm:text-5xl">
                  {game.title}
                </motion.h3>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-2 text-lg text-cyber italic">
                  {game.tagline}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
                  <RatingComponent value={game.rating} reviews={game.reviews} />
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-neon" />{formatDate(game.releaseDate)}</span>
                  <span className="flex items-center gap-1.5"><Monitor className="h-4 w-4 text-neon" />{game.platforms.length} platforms</span>
                </motion.div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4 line-clamp-3 hidden text-slate-300 sm:block">
                  {game.description}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 flex flex-wrap items-center gap-3">
                  <CustomButton to={`/games/${game.id}`}>View Details <ArrowRight className="h-4 w-4" /></CustomButton>
                  <FavoriteButton game={game} />
                  <span className="font-display text-lg font-bold text-white">{formatPrice(game.price)}</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute right-4 bottom-4 flex gap-2 sm:right-8 sm:bottom-8" role="tablist" aria-label="Featured games">
          {featuredGames.map((g, i) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={i === index}
              aria-label={g.title}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-10 bg-gradient-to-r from-neon to-cyber' : 'w-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
