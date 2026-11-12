import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, UserCheck, UserPlus } from 'lucide-react';
import type { CommunityUser } from '../../types';
import SmartImage from '../common/SmartImage';
import { compact } from '../../utils/format';

export default function ProfileCard({ user, index = 0 }: { user: CommunityUser; index?: number }) {
  const [following, setFollowing] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 text-center"
    >
      <div className="animated-gradient absolute inset-x-0 top-0 h-16 opacity-40" />
      <div className="relative mx-auto h-20 w-20">
        <SmartImage src={user.avatar} alt={user.name} width={160} height={160} className="h-20 w-20 rounded-full object-cover ring-4 ring-void" />
        <span className="absolute -right-1 -bottom-1 rounded-full bg-gradient-to-r from-neon to-cyber px-2 py-0.5 text-[10px] font-black text-white">Lv {user.level}</span>
      </div>
      <p className="mt-3 font-semibold text-white">{user.name}</p>
      <p className="text-xs text-muted">{user.handle}</p>
      <p className="mt-2 text-xs font-bold tracking-wider text-amber-300 uppercase">{user.rank}</p>
      <p className="mt-2 flex items-center justify-center gap-1.5 truncate text-xs text-slate-300">
        <Gamepad2 className="h-3.5 w-3.5 shrink-0 text-cyber" /> {user.favoriteGame}
      </p>
      <p className="mt-1 text-xs text-muted">{compact(user.followers + (following ? 1 : 0))} followers</p>
      <button
        onClick={() => setFollowing((f) => !f)}
        aria-pressed={following}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          following ? 'border border-cyber/50 text-cyber' : 'animated-gradient text-white'
        }`}
      >
        {following ? <><UserCheck className="h-4 w-4" /> Following</> : <><UserPlus className="h-4 w-4" /> Follow</>}
      </button>
    </motion.div>
  );
}
