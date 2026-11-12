import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../../components/common/PageBanner';
import SectionHeading from '../../components/common/SectionHeading';
import Reveal from '../../components/common/Reveal';
import NewsCard from '../../components/news/NewsCard';
import { news } from '../../data/news';
import { byRelease } from '../../data/games';
import { IMG } from '../../utils/images';
import { formatDate } from '../../utils/format';
import type { NewsType } from '../../types';

const FILTERS: ('All' | NewsType)[] = ['All', 'Release', 'Upcoming', 'Update', 'Esports', 'Industry'];

const UPCOMING = [
  { title: 'Velocity Rush X — Season 2 “Ridgeline”', date: '2026-11-20', platform: 'All platforms' },
  { title: 'Chronicles of Aether — “Skyforged” update', date: '2026-12-10', platform: 'PC, PS5, Xbox' },
  { title: 'Skyward Expanse — Sunken Peaks', date: '2027-02-12', platform: 'PC, PS5, Xbox' },
  { title: 'Starfall Legacy II', date: '2027-10-01', platform: 'PC, Consoles' },
];

export default function News() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [lead, ...sideFeatured] = news.filter((n) => n.featured);
  const list = news.filter((n) => filter === 'All' || n.type === filter);

  return (
    <>
      <PageBanner
        eyebrow="Newsroom"
        title={<>Gaming <span className="text-gradient">News</span></>}
        subtitle="Launches, patches, esports results and industry moves, curated by the GameVerse editorial team."
        image={IMG.proGamer}
      />

      <section className="container-gv">
        <SectionHeading eyebrow="Editor's picks" title="Featured Stories" />
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <NewsCard article={lead} variant="featured" />
          <div className="grid gap-6">
            {sideFeatured.map((a, i) => (
              <NewsCard key={a.id} article={a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-gv py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <SectionHeading eyebrow="All coverage" title="Latest Updates" />
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter news">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition ${filter === f ? 'text-white' : 'glass text-muted hover:text-white'}`}
                >
                  {filter === f && <motion.span layoutId="news-filter" className="animated-gradient absolute inset-0 -z-10 rounded-xl" />}
                  {f}
                </button>
              ))}
            </div>
            <motion.div layout className="grid gap-6 sm:grid-cols-2">
              <AnimatePresence>
                {list.map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="glass rounded-2xl p-6">
              <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
                <Rocket className="h-5 w-5 text-emerald-400" /> Latest Releases
              </h2>
              <ul className="space-y-4">
                {byRelease.slice(0, 4).map((g) => (
                  <li key={g.id}>
                    <Link to={`/games/${g.id}`} className="group block">
                      <p className="font-semibold text-white transition group-hover:text-cyber">{g.title}</p>
                      <p className="text-xs text-muted">Released {formatDate(g.releaseDate)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="glass rounded-2xl p-6">
              <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
                <CalendarClock className="h-5 w-5 text-violet-400" /> Upcoming
              </h2>
              <ol className="relative space-y-5 border-l border-white/10 pl-5">
                {UPCOMING.map((u) => (
                  <li key={u.title} className="relative">
                    <span className="absolute top-1.5 -left-[25px] h-2.5 w-2.5 rounded-full bg-gradient-to-r from-neon to-cyber ring-4 ring-void" />
                    <p className="text-xs font-semibold text-cyber">{formatDate(u.date)}</p>
                    <p className="text-sm font-semibold text-white">{u.title}</p>
                    <p className="text-xs text-muted">{u.platform}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
