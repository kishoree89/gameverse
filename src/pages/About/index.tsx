import { motion } from 'framer-motion';
import { Compass, Gamepad2, Globe2, HeartHandshake, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import SectionHeading from '../../components/common/SectionHeading';
import Reveal from '../../components/common/Reveal';
import SmartImage from '../../components/common/SmartImage';
import CustomButton from '../../components/common/CustomButton';
import StatsSection, { type Stat } from '../../components/home/StatsSection';
import { IMG } from '../../utils/images';

const STATS: Stat[] = [
  { Icon: Users, value: 12.8, decimals: 1, suffix: 'M', label: 'Players worldwide' },
  { Icon: Gamepad2, value: 4500, suffix: '+', label: 'Games catalogued' },
  { Icon: Trophy, value: 320, suffix: '+', label: 'Tournaments' },
  { Icon: Globe2, value: 140, label: 'Countries reached' },
];

const VALUES = [
  { Icon: Compass, title: 'Discovery first', text: 'Smart curation that helps every player find their next favorite game, not just the biggest ones.' },
  { Icon: HeartHandshake, title: 'Community driven', text: 'Players shape our charts, our features and our roadmap through reviews and feedback.' },
  { Icon: ShieldCheck, title: 'Safe & inclusive', text: 'Strong moderation and accessibility built in, so everyone has a seat at the table.' },
  { Icon: Sparkles, title: 'Always evolving', text: 'We ship improvements weekly and celebrate the craft of game-making with every release.' },
];

const TEAM = [
  { name: 'Ethan Cole', role: 'Founder & CEO', img: IMG.avatar3 },
  { name: 'Sofia Reyes', role: 'Head of Design', img: IMG.avatar2 },
  { name: 'Marcus Hale', role: 'Lead Engineer', img: IMG.avatar4 },
  { name: 'Elena Morris', role: 'Community Director', img: IMG.avatar8 },
];

const TIMELINE = [
  { year: '2021', text: 'GameVerse starts as a weekend Discord server for 40 friends.' },
  { year: '2023', text: 'The website launches with 1,000 games and our first community awards.' },
  { year: '2025', text: 'We pass 10 million players and host our first global tournament.' },
  { year: '2026', text: 'Live leaderboards, creator programs and a fully redesigned platform.' },
];

export default function About() {
  return (
    <>
      <PageBanner
        eyebrow="Our story"
        title={<>About <span className="text-gradient">GameVerse</span></>}
        subtitle="Built by gamers, for gamers. We're on a mission to connect every player with the games and people they'll love."
        image={IMG.roomNeon}
      />

      <section className="container-gv">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-cyber uppercase">Who we are</p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">A universe for every kind of player</h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              GameVerse began with a simple question: why is it so hard to find great games? Today we are one of the fastest-growing gaming hubs in the world, combining
              expert curation, real player reviews and a vibrant community in one place.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Whether you play ranked every night or a cosy farming sim on a Sunday, GameVerse helps you discover, track and share the games that matter to you.
            </p>
            <div className="mt-8"><CustomButton to="/explore">Start exploring</CustomButton></div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <SmartImage src={IMG.streamSetup} alt="A streamer's gaming setup" width={500} height={620} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <SmartImage src={IMG.tabletPlay} alt="Gamer playing on a tablet" width={500} height={620} className="mt-10 aspect-[4/5] w-full rounded-2xl object-cover" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="glass absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-navy/80 px-6 py-4 text-center"
            >
              <p className="font-display text-2xl font-black text-gradient">5 years</p>
              <p className="text-xs text-muted">of leveling up</p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="container-gv py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <SmartImage src={IMG.arena} alt="" width={1600} height={700} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void/40" />
          <Reveal className="relative max-w-2xl p-8 sm:p-14">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-cyber uppercase">Our mission</p>
            <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">Connect every player with the games &amp; people they'll love.</h2>
            <p className="mt-5 text-slate-300">
              We believe games are the most powerful shared experience of our time. Our mission is to make discovering them effortless, talking about them joyful and
              competing in them fair.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-gv">
        <SectionHeading center eyebrow="What drives us" title="Our Values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="glass h-full rounded-2xl p-6 transition hover:border-neon/40">
              <span className="animated-gradient mb-4 grid h-12 w-12 place-items-center rounded-xl"><Icon className="h-6 w-6 text-white" /></span>
              <h3 className="font-display text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-gv py-24">
        <SectionHeading center eyebrow="Platform stats" title="GameVerse in Numbers" />
        <StatsSection stats={STATS} />
      </section>

      <section className="container-gv">
        <SectionHeading center eyebrow="Our journey" title="Milestones" />
        <ol className="relative mx-auto max-w-3xl space-y-8 border-l border-white/10 pl-8">
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.year}
              className="relative"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="animated-gradient absolute top-1 -left-[41px] h-4 w-4 rounded-full ring-4 ring-void" />
              <p className="font-display text-xl font-black text-gradient">{t.year}</p>
              <p className="mt-1 text-slate-300">{t.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="container-gv py-24">
        <SectionHeading center eyebrow="The crew" title="Meet the Team" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                <SmartImage src={m.img} alt={m.name} width={500} height={620} className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-cyber">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
