import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, Building2, Calendar, ChevronLeft, ChevronRight, Cpu, Expand, HardDrive, MemoryStick, Monitor, MonitorSmartphone, Tag, Users, X } from 'lucide-react';
import { getGame, games } from '../../data/games';
import { getCategory } from '../../data/categories';
import SmartImage from '../../components/common/SmartImage';
import RatingComponent from '../../components/common/RatingComponent';
import SectionHeading from '../../components/common/SectionHeading';
import Reveal from '../../components/common/Reveal';
import GameGrid from '../../components/games/GameGrid';
import FavoriteButton from '../../components/games/FavoriteButton';
import TrailerPreview from '../../components/games/TrailerPreview';
import CustomButton from '../../components/common/CustomButton';
import NotFound from '../NotFound';
import { compact, formatDate, formatPrice } from '../../utils/format';
import type { Game, SystemRequirements } from '../../types';

const REQ_ROWS: { key: keyof SystemRequirements; label: string; Icon: typeof Cpu }[] = [
  { key: 'os', label: 'OS', Icon: Monitor },
  { key: 'cpu', label: 'Processor', Icon: Cpu },
  { key: 'ram', label: 'Memory', Icon: MemoryStick },
  { key: 'gpu', label: 'Graphics', Icon: MonitorSmartphone },
  { key: 'storage', label: 'Storage', Icon: HardDrive },
];

function related(game: Game) {
  const score = (g: Game) => (g.category === game.category ? 3 : 0) + g.genres.filter((x) => game.genres.includes(x)).length;
  return games
    .filter((g) => g.id !== game.id)
    .sort((a, b) => score(b) - score(a) || b.rating - a.rating)
    .slice(0, 3);
}

export default function GameDetails() {
  const { id = '' } = useParams();
  const game = getGame(id);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!game) return <NotFound message="We couldn’t find that game. It may have been moved or never existed." />;

  const category = getCategory(game.category);
  const shots = game.screenshots;
  const step = (d: number) => setLightbox((i) => (i === null ? i : (i + d + shots.length) % shots.length));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-36">
        <motion.div className="absolute inset-0 -z-20" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6 }}>
          <SmartImage src={game.cover} alt="" width={1920} height={900} priority className="h-full w-full object-cover blur-[2px]" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/60 via-void/85 to-void" />

        <div className="container-gv">
          <Link to="/explore" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyber">
            <ArrowLeft className="h-4 w-4" /> Back to games
          </Link>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-neon/30"
            >
              <SmartImage src={game.cover} alt={`${game.title} cover art`} width={1200} height={750} priority className="aspect-[16/10] w-full object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <Link to={`/explore?category=${game.category}`} className={`mb-4 inline-block rounded-lg bg-gradient-to-r ${category?.accent} px-3 py-1 text-xs font-bold tracking-wider text-white uppercase`}>
                {category?.name}
              </Link>
              <h1 className="font-display text-3xl font-black text-white sm:text-5xl">{game.title}</h1>
              <p className="mt-2 text-lg text-cyber italic">{game.tagline}</p>
              <div className="mt-4">
                <RatingComponent value={game.rating} reviews={game.reviews} size="medium" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {game.genres.map((g) => (
                  <span key={g} className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    <Tag className="h-3 w-3 text-neon" /> {g}
                  </span>
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                {[
                  { Icon: Calendar, label: 'Release date', value: formatDate(game.releaseDate) },
                  { Icon: Building2, label: 'Developer', value: game.developer },
                  { Icon: Users, label: 'Monthly players', value: compact(game.players * 1000) },
                  { Icon: Monitor, label: 'Platforms', value: game.platforms.join(', ') },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="glass rounded-xl p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted"><Icon className="h-3.5 w-3.5 text-cyber" />{label}</dt>
                    <dd className="mt-1 font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="font-display text-2xl font-black text-white">{formatPrice(game.price)}</span>
                <FavoriteButton game={game} withLabel />
                <CustomButton variant="outline" onClick={() => document.getElementById('trailer')?.scrollIntoView({ behavior: 'smooth' })}>
                  Watch Trailer
                </CustomButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About + trailer */}
      <section id="trailer" className="container-gv scroll-mt-24 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-cyber uppercase">About the game</p>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Story &amp; Gameplay</h2>
            <p className="mt-5 leading-relaxed text-slate-300">{game.description}</p>
            <p className="mt-4 leading-relaxed text-muted">
              Developed by {game.developer}, {game.title} has earned a {game.rating.toFixed(1)}/5 average from {game.reviews.toLocaleString('en-US')} player reviews and
              is available on {game.platforms.join(', ')}.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TrailerPreview title={game.title} tagline={game.tagline} frames={[game.cover, ...shots]} />
          </Reveal>
        </div>
      </section>

      {/* Screenshots */}
      <section className="container-gv py-16">
        <SectionHeading eyebrow="Gallery" title="Screenshots" subtitle="Click any screenshot to view it full size." />
        {/* First shot spans the full row; the rest share one row below it. */}
        <div className={`grid gap-4 ${shots.length % 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {shots.map((s, i) => (
            <Reveal key={s} delay={i * 0.08} className={i === 0 ? 'col-span-full' : ''}>
              <button onClick={() => setLightbox(i)} className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10" aria-label={`Open screenshot ${i + 1}`}>
                <SmartImage src={s} alt={`${game.title} screenshot ${i + 1}`} width={i === 0 ? 1400 : 600} height={i === 0 ? 600 : 340} className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? 'aspect-[21/9]' : 'aspect-video'}`} />
                <span className="absolute inset-0 grid place-items-center bg-void/50 opacity-0 transition group-hover:opacity-100">
                  <Expand className="h-7 w-7 text-white" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Dialog
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        maxWidth="lg"
        fullWidth
        slotProps={{ paper: { sx: { bgcolor: 'transparent', boxShadow: 'none', m: 1, width: 'calc(100% - 16px)' } }, backdrop: { sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(5,6,15,0.85)' } } }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        aria-label="Screenshot viewer"
      >
        {lightbox !== null && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}>
                <SmartImage src={shots[lightbox]} alt={`${game.title} screenshot ${lightbox + 1}`} width={1600} height={900} className="aspect-video w-full rounded-2xl object-cover" />
              </motion.div>
            </AnimatePresence>
            <IconButton onClick={() => setLightbox(null)} aria-label="Close" sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,.6)' }}>
              <X className="h-5 w-5 text-white" />
            </IconButton>
            <IconButton onClick={() => step(-1)} aria-label="Previous screenshot" sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,.6)' }}>
              <ChevronLeft className="h-6 w-6 text-white" />
            </IconButton>
            <IconButton onClick={() => step(1)} aria-label="Next screenshot" sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,.6)' }}>
              <ChevronRight className="h-6 w-6 text-white" />
            </IconButton>
            <p className="mt-3 text-center text-sm text-slate-300">{lightbox + 1} / {shots.length}</p>
          </div>
        )}
      </Dialog>

      {/* System requirements */}
      <section className="container-gv py-16">
        <SectionHeading eyebrow="PC specs" title="System Requirements" />
        <div className="grid gap-6 md:grid-cols-2">
          {(['minimum', 'recommended'] as const).map((tier, i) => (
            <Reveal key={tier} delay={i * 0.1} className={`glass rounded-2xl p-6 ${tier === 'recommended' ? 'border-neon/40' : ''}`}>
              <h3 className="mb-5 font-display text-lg font-bold text-white capitalize">
                {tier}
                {tier === 'recommended' && <span className="ml-3 rounded-md bg-neon/20 px-2 py-0.5 align-middle font-sans text-xs text-neon">Best experience</span>}
              </h3>
              <dl className="space-y-4">
                {REQ_ROWS.map(({ key, label, Icon }) => (
                  <div key={key} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyber" />
                    <div>
                      <dt className="text-xs text-muted">{label}</dt>
                      <dd className="text-sm text-white">{game.requirements[tier][key]}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-gv py-16">
        <SectionHeading eyebrow="You might also like" title="Related Games" link={{ to: `/explore?category=${game.category}`, label: `More ${category?.name}` }} />
        <GameGrid games={related(game)} />
      </section>
    </>
  );
}
