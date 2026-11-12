import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, Trophy } from 'lucide-react';
import CustomButton from '../common/CustomButton';
import SmartImage from '../common/SmartImage';
import FloatingOrbs from '../common/FloatingOrbs';
import { IMG } from '../../utils/images';
import { getGame } from '../../data/games';

const WORDS = ['ENTER', 'THE', 'WORLD', 'OF', 'GAMING'];
const FLOATING = ['skyward-expanse', 'velocity-rush-x', 'neon-requiem'].map((id) => getGame(id)!);

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        >
          <SmartImage src={IMG.esportsPlayer} alt="" width={1920} height={1080} priority className="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/85 to-void/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-transparent to-void/60" />
      <div className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <FloatingOrbs />

      <motion.div style={{ opacity: fade }} className="container-gv grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-cyber uppercase"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> 2.4M players online now
          </motion.span>
          <h1 className="font-display text-[2.6rem] leading-[1.05] font-black text-white sm:text-6xl lg:text-7xl">
            {WORDS.map((w, i) => (
              <motion.span
                key={w}
                className={`mr-[0.25em] inline-block ${w === 'GAMING' ? 'text-gradient' : ''}`}
                initial={{ opacity: 0, y: 60, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg"
          >
            Discover the hottest releases, track your favorites, follow esports and join a community of millions, all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <CustomButton to="/explore" size="lg">
              <Play className="h-5 w-5 fill-white" /> Explore Games
            </CustomButton>
            <CustomButton to="/top-games" variant="ghost" size="lg">
              <Trophy className="h-5 w-5 text-amber-300" /> Top Charts
            </CustomButton>
          </motion.div>
        </div>

        <div className="relative hidden h-[460px] lg:block" aria-hidden>
          {FLOATING.map((g, i) => (
            <motion.div
              key={g.id}
              className="glass absolute w-60 overflow-hidden rounded-2xl p-2 shadow-2xl shadow-neon/20"
              style={{ top: `${i * 28}%`, left: `${[30, 0, 45][i]}%`, zIndex: 3 - i }}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0, y: [0, -14, 0] }}
              transition={{
                opacity: { delay: 0.8 + i * 0.2 },
                x: { delay: 0.8 + i * 0.2, duration: 0.8 },
                y: { delay: 1.6 + i * 0.4, duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <SmartImage src={g.cover} alt="" width={480} height={280} className="aspect-[16/9] w-full rounded-xl object-cover" />
              <div className="flex items-center justify-between px-2 pt-2 pb-1">
                <span className="truncate text-sm font-semibold text-white">{g.title}</span>
                <span className="text-xs font-bold text-amber-300">★ {g.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#featured"
        aria-label="Scroll to featured games"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
