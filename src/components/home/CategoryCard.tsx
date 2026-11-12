import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';
import SmartImage from '../common/SmartImage';
import { games } from '../../data/games';

interface Props {
  category: Category;
  index?: number;
  large?: boolean;
}

export default function CategoryCard({ category, index = 0, large }: Props) {
  const count = games.filter((g) => g.category === category.id).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 5) * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to={`/explore?category=${category.id}`}
        className={`group relative block h-full overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/30 ${large ? 'aspect-[4/3]' : 'aspect-square'}`}
      >
        <SmartImage src={category.image} alt={`${category.name} games`} width={large ? 800 : 500} height={large ? 600 : 500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60`} />
        <span className="glass absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <span className={`mb-2 block h-1 w-10 rounded-full bg-gradient-to-r ${category.accent} transition-all duration-500 group-hover:w-20`} />
          <h3 className="font-display text-lg font-bold text-white sm:text-xl">{category.name}</h3>
          <p className="text-xs text-slate-300">{count} {count === 1 ? 'game' : 'games'}</p>
          {large && <p className="mt-2 hidden text-sm text-slate-300 sm:block">{category.description}</p>}
        </div>
      </Link>
    </motion.div>
  );
}
