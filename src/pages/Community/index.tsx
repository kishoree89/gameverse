import { useState } from 'react';
import { MessageSquare, MessagesSquare, TrendingUp, Trophy, Users } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import SectionHeading from '../../components/common/SectionHeading';
import Reveal from '../../components/common/Reveal';
import CustomButton from '../../components/common/CustomButton';
import StatsSection, { type Stat } from '../../components/home/StatsSection';
import CommunityCard from '../../components/community/CommunityCard';
import ProfileCard from '../../components/community/ProfileCard';
import { popularDiscussions, posts, users } from '../../data/community';
import { IMG } from '../../utils/images';

const STATS: Stat[] = [
  { Icon: Users, value: 3.2, decimals: 1, suffix: 'M', label: 'Community members' },
  { Icon: MessageSquare, value: 48000, suffix: '+', label: 'Posts this week' },
  { Icon: Trophy, value: 1250, label: 'Active clans' },
  { Icon: TrendingUp, value: 96, suffix: '%', label: 'Positive vibes' },
];

const TAGS = ['All', ...new Set(posts.map((p) => p.tag))];

export default function Community() {
  const [tag, setTag] = useState('All');

  return (
    <>
      <PageBanner
        eyebrow="Player hub"
        title={<>Join the <span className="text-gradient">Community</span></>}
        subtitle="Share builds, find your squad, debate endings and celebrate wins with millions of players."
        image={IMG.lanParty}
      >
        <CustomButton size="lg" onClick={() => document.getElementById('discussions')?.scrollIntoView({ behavior: 'smooth' })}>
          <MessagesSquare className="h-5 w-5" /> Join the discussion
        </CustomButton>
      </PageBanner>

      <section className="container-gv">
        <StatsSection stats={STATS} />
      </section>

      <section className="container-gv py-20">
        <SectionHeading eyebrow="Hall of fame" title="Top Players" subtitle="The most active and respected members this season." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {users.map((u, i) => (
            <ProfileCard key={u.id} user={u} index={i} />
          ))}
        </div>
      </section>

      <section id="discussions" className="container-gv scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <SectionHeading eyebrow="Feed" title="Discussions" />
            <div className="mb-6 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  aria-pressed={tag === t}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${tag === t ? 'border-neon/60 bg-neon/20 text-white' : 'border-white/10 text-muted hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-6">
              {/* Keep every card mounted so likes/comments survive tag switching. */}
              {posts.map((p, i) => (
                <div id={p.id} key={p.id} className={`scroll-mt-24 ${tag === 'All' || p.tag === tag ? '' : 'hidden'}`}>
                  <CommunityCard post={p} index={i} />
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal className="glass rounded-2xl p-6">
              <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
                <TrendingUp className="h-5 w-5 text-orange-400" /> Popular Discussions
              </h2>
              <ol className="space-y-4">
                {popularDiscussions.map((d, i) => (
                  <li key={d.title} className="flex gap-3">
                    <span className="font-display text-xl font-black text-white/30">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{d.title}</p>
                      <p className="text-xs text-muted"><span className="text-cyber">{d.tag}</span> · {d.replies.toLocaleString('en-US')} replies</p>
                    </div>
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
