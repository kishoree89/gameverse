import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { NewsArticle, NewsType } from '../../types';
import SmartImage from '../common/SmartImage';
import { formatDate } from '../../utils/format';

export const NEWS_TYPE_STYLE: Record<NewsType, string> = {
  Release: 'bg-emerald-500/90',
  Upcoming: 'bg-violet-500/90',
  Update: 'bg-sky-500/90',
  Esports: 'bg-orange-500/90',
  Industry: 'bg-pink-500/90',
};

interface Props {
  article: NewsArticle;
  variant?: 'default' | 'featured';
  index?: number;
}

export default function NewsCard({ article, variant = 'default', index = 0 }: Props) {
  const featured = variant === 'featured';
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <Link
        to={`/news/${article.id}`}
        className={`glass relative flex h-full overflow-hidden rounded-2xl transition hover:border-neon/50 hover:shadow-xl hover:shadow-neon/10 ${featured ? 'min-h-[420px] flex-col justify-end' : 'flex-col'}`}
      >
        <div className={featured ? 'absolute inset-0' : 'relative aspect-[16/9] overflow-hidden'}>
          <SmartImage
            src={article.image}
            alt=""
            width={featured ? 1200 : 640}
            height={featured ? 800 : 360}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 ${featured ? 'bg-gradient-to-t from-void via-void/60 to-transparent' : 'bg-gradient-to-t from-void/60 to-transparent'}`} />
          {!featured && (
            <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase ${NEWS_TYPE_STYLE[article.type]}`}>
              {article.type}
            </span>
          )}
        </div>
        <div className={`relative flex flex-1 flex-col gap-3 ${featured ? 'p-6 sm:p-8' : 'p-5'}`}>
          {featured && (
            <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase ${NEWS_TYPE_STYLE[article.type]}`}>
              {article.type}
            </span>
          )}
          <h3 className={`font-display font-bold leading-snug text-white transition group-hover:text-cyber ${featured ? 'text-xl sm:text-3xl' : 'text-base'}`}>
            {article.title}
          </h3>
          <p className={`text-sm text-slate-300 ${featured ? 'line-clamp-3 max-w-2xl' : 'line-clamp-2 text-muted'}`}>{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-xs text-muted">
            <span>{article.author} · {formatDate(article.date)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime} min</span>
          </div>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-neon">
            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
