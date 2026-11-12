import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Flame, Medal, Star, TrendingUp, Users } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import SmartImage from '../../components/common/SmartImage';
import RatingComponent from '../../components/common/RatingComponent';
import FavoriteButton from '../../components/games/FavoriteButton';
import { byPopularity, byRating, trendingGames } from '../../data/games';
import { getCategory } from '../../data/categories';
import { compact } from '../../utils/format';
import { IMG } from '../../utils/images';
import type { Game } from '../../types';

const TABS = [
  { id: 'rated', label: 'Top Rated', Icon: Star, list: byRating },
  { id: 'popular', label: 'Most Popular', Icon: Users, list: byPopularity },
  { id: 'trending', label: 'Trending', Icon: Flame, list: [...trendingGames].sort((a, b) => b.players * b.rating - a.players * a.rating) },
] as const;

const PODIUM_STYLE = [
  { ring: 'from-amber-300 to-yellow-600', Icon: Crown, label: '1st', h: 'md:mt-0' },
  { ring: 'from-slate-200 to-slate-500', Icon: Medal, label: '2nd', h: 'md:mt-10' },
  { ring: 'from-orange-400 to-amber-800', Icon: Medal, label: '3rd', h: 'md:mt-16' },
];

// Deterministic, mock "rank change since last week".
const delta = (g: Game) => ((g.reviews % 7) - 3) | 0;

function Podium({ games }: { games: Game[] }) {
  // Visual order on desktop: 2nd, 1st, 3rd
  const order = [1, 0, 2];
  return (
    <div className="grid gap-5 md:grid-cols-3 md:items-start">
      {order.map((idx) => {
        const g = games[idx];
        const s = PODIUM_STYLE[idx];
        return (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * (idx + 1) }}
            className={`${s.h} ${idx === 0 ? 'order-first md:order-none' : ''}`}
          >
            <Link to={`/games/${g.id}`} className={`group relative block rounded-3xl bg-gradient-to-b ${s.ring} p-[2px] transition hover:-translate-y-2`}>
              <div className="overflow-hidden rounded-[calc(1.5rem-2px)] bg-navy">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage src={g.cover} alt={`${g.title} cover`} width={640} height={400} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                  <span className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r ${s.ring} px-3 py-1 text-sm font-black text-black`}>
                    <s.Icon className="h-4 w-4" /> {s.label}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold text-white">{g.title}</p>
                  <p className="mb-3 text-xs text-muted">{getCategory(g.category)?.name} · {g.developer}</p>
                  <RatingComponent value={g.rating} reviews={g.reviews} />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function TopGames() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('rated');
  const active = TABS.find((t) => t.id === tab)!;
  const list = active.list.slice(0, 10);

  return (
    <>
      <PageBanner
        eyebrow="Leaderboard"
        title={<>The <span className="text-gradient">Top Games</span> Right Now</>}
        subtitle="Live rankings powered by player ratings, monthly activity and community buzz."
        image={IMG.esportsStage}
      />
      <section className="container-gv">
        <div className="mb-10 flex justify-center">
          <div className="glass inline-flex flex-wrap justify-center gap-1 rounded-2xl p-1.5" role="tablist" aria-label="Ranking type">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:px-6 ${tab === id ? 'text-white' : 'text-muted hover:text-white'}`}
              >
                {tab === id && <motion.span layoutId="top-tab" className="animated-gradient absolute inset-0 -z-10 rounded-xl" />}
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <Podium games={list} />

            <ol className="mt-12 space-y-3">
              {list.slice(3).map((g, i) => {
                const d = delta(g);
                return (
                  <motion.li
                    key={g.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="glass group flex items-center gap-3 rounded-2xl p-3 transition hover:border-neon/40 hover:bg-white/[0.07] sm:gap-5 sm:p-4"
                  >
                    <span className="w-10 shrink-0 text-center font-display text-2xl font-black text-white/40 transition group-hover:text-cyber sm:w-14 sm:text-3xl">
                      {String(i + 4).padStart(2, '0')}
                    </span>
                    <Link to={`/games/${g.id}`} className="h-14 w-20 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-28">
                      <SmartImage src={g.cover} alt="" width={220} height={130} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to={`/games/${g.id}`} className="block truncate font-semibold text-white hover:text-cyber">{g.title}</Link>
                      <p className="truncate text-xs text-muted">{getCategory(g.category)?.name} · {g.developer}</p>
                      <div className="mt-2 hidden h-1.5 max-w-xs overflow-hidden rounded-full bg-white/10 sm:block">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-neon to-cyber" initial={{ width: 0 }} animate={{ width: `${(g.rating / 5) * 100}%` }} transition={{ delay: 0.5 + i * 0.06, duration: 0.8 }} />
                      </div>
                    </div>
                    <div className="hidden shrink-0 text-right md:block">
                      <p className="font-semibold text-amber-300">★ {g.rating.toFixed(1)}</p>
                      <p className="text-xs text-muted">{compact(g.players * 1000)} players</p>
                    </div>
                    <span className={`hidden w-12 shrink-0 items-center justify-end gap-1 text-xs font-semibold sm:flex ${d > 0 ? 'text-emerald-400' : d < 0 ? 'text-rose-400' : 'text-muted'}`} title="Rank change this week">
                      {d !== 0 && <TrendingUp className={`h-3.5 w-3.5 ${d < 0 ? 'rotate-180' : ''}`} />}
                      {d === 0 ? '–' : Math.abs(d)}
                    </span>
                    <FavoriteButton game={g} />
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
