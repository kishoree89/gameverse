import { Gamepad2, Globe2, Trophy, Users } from 'lucide-react';
import HeroSection from '../../components/home/HeroSection';
import FeaturedGames from '../../components/home/FeaturedGames';
import TrendingGames from '../../components/home/TrendingGames';
import CategoryCard from '../../components/home/CategoryCard';
import Newsletter from '../../components/home/Newsletter';
import StatsSection, { type Stat } from '../../components/home/StatsSection';
import GameListItem from '../../components/home/GameListItem';
import SectionHeading from '../../components/common/SectionHeading';
import Reveal from '../../components/common/Reveal';
import GameGrid from '../../components/games/GameGrid';
import { byRating, byRelease, byPopularity } from '../../data/games';
import { categories } from '../../data/categories';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star } from 'lucide-react';

const STATS: Stat[] = [
  { Icon: Users, value: 12.8, decimals: 1, suffix: 'M', label: 'Registered players' },
  { Icon: Gamepad2, value: 4500, suffix: '+', label: 'Games tracked' },
  { Icon: Trophy, value: 320, suffix: '+', label: 'Tournaments hosted' },
  { Icon: Globe2, value: 140, label: 'Countries' },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedGames />
      <TrendingGames />

      <section className="container-gv py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { title: 'Recently Released', Icon: Clock, list: byRelease.slice(0, 5), meta: 'date' as const, to: '/explore' },
            { title: 'Top Rated', Icon: Star, list: byRating.slice(0, 5), meta: 'rating' as const, to: '/top-games' },
          ].map(({ title, Icon, list, meta, to }, i) => (
            <Reveal key={title} delay={i * 0.1} className="glass rounded-3xl p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-3 font-display text-xl font-bold text-white">
                  <Icon className="h-6 w-6 text-cyber" /> {title}
                </h2>
                <Link to={to} className="flex items-center gap-1 text-sm font-semibold text-neon hover:text-cyber">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="space-y-1">
                {list.map((g, idx) => (
                  <GameListItem key={g.id} game={g} index={idx} meta={meta} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-gv py-20">
        <SectionHeading eyebrow="Pick your playstyle" title="Popular Categories" link={{ to: '/categories', label: 'All categories' }} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </section>

      <section className="container-gv py-20">
        <SectionHeading eyebrow="Most played" title="Popular This Month" subtitle="The games with the most monthly active players on GameVerse." link={{ to: '/top-games', label: 'View leaderboard' }} />
        <GameGrid games={byPopularity.slice(0, 6)} />
      </section>

      <section className="container-gv py-20">
        <SectionHeading center eyebrow="By the numbers" title="The GameVerse Network" subtitle="One of the fastest-growing gaming communities on the planet." />
        <StatsSection stats={STATS} />
      </section>

      <Newsletter />
    </>
  );
}
