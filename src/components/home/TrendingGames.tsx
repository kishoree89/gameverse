import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { trendingGames } from '../../data/games';
import SmartImage from '../common/SmartImage';
import SectionHeading from '../common/SectionHeading';

export default function TrendingGames() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <section className="py-20">
      <div className="container-gv">
        <SectionHeading eyebrow="Hot right now" title="Trending Games" subtitle="What the GameVerse community is playing this week." />
        <div className="-mt-4 mb-6 flex justify-end gap-2">
          {([-1, 1] as const).map((d) => (
            <button key={d} onClick={() => scroll(d)} className="glass grid h-10 w-10 place-items-center rounded-xl text-white transition hover:border-neon/50" aria-label={d === 1 ? 'Scroll right' : 'Scroll left'}>
              {d === 1 ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={scroller}
        className="container-gv flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {trendingGames.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="w-[78%] shrink-0 snap-start sm:w-80"
          >
            <Link to={`/games/${g.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 transition hover:border-neon/60">
              <SmartImage src={g.cover} alt={`${g.title} cover`} width={480} height={640} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
              <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold text-white">
                <Flame className="h-3.5 w-3.5" /> #{i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-xl font-bold text-white">{g.title}</p>
                <p className="mt-1 text-sm text-slate-300">{g.tagline}</p>
                <p className="mt-3 text-sm font-semibold text-amber-300">★ {g.rating.toFixed(1)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
