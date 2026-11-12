import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';

export interface Stat {
  Icon: LucideIcon;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export default function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ Icon, value, suffix, decimals, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass group relative overflow-hidden rounded-2xl p-5 text-center sm:p-8"
        >
          <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-neon/20 blur-2xl transition group-hover:bg-cyber/30" />
          <Icon className="mx-auto mb-3 h-8 w-8 text-cyber" />
          <p className="font-display text-2xl font-black text-white sm:text-4xl">
            <AnimatedCounter to={value} suffix={suffix} decimals={decimals} />
          </p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
