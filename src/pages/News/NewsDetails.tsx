import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Link2, User } from 'lucide-react';
import { getArticle, news } from '../../data/news';
import SmartImage from '../../components/common/SmartImage';
import SectionHeading from '../../components/common/SectionHeading';
import NewsCard, { NEWS_TYPE_STYLE } from '../../components/news/NewsCard';
import CustomButton from '../../components/common/CustomButton';
import NotFound from '../NotFound';
import { useToast } from '../../hooks/useToast';
import { formatDate } from '../../utils/format';

export default function NewsDetails() {
  const { id = '' } = useParams();
  const article = getArticle(id);
  const toast = useToast();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (!article) return <NotFound message="That story has scrolled off the feed. Try the latest news instead." />;

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ kind: 'success', title: 'Link copied', message: 'Share it with your squad.' });
    } catch {
      toast({ kind: 'error', title: 'Couldn’t copy link', message: 'Your browser blocked clipboard access.' });
    }
  };

  const more = news.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[1200] h-1 origin-left bg-gradient-to-r from-neon to-cyber" />
      <article>
        <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
          <motion.div className="absolute inset-0 -z-20" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}>
            <SmartImage src={article.image} alt="" width={1920} height={900} priority className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/50 via-void/85 to-void" />
          <div className="container-gv max-w-4xl">
            <Link to="/news" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyber">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-4 block w-fit rounded-md px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase ${NEWS_TYPE_STYLE[article.type]}`}>
              {article.type}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-3xl leading-tight font-black text-white sm:text-5xl">
              {article.title}
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-cyber" />{article.author}</span>
              <span>{formatDate(article.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-cyber" />{article.readTime} min read</span>
            </motion.div>
          </div>
        </header>

        <div className="container-gv max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-6 sm:p-10">
            <p className="text-lg leading-relaxed font-medium text-white">{article.excerpt}</p>
            <div className="mt-6 space-y-5 leading-relaxed text-slate-300">
              {article.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-sm text-muted">Enjoyed this story? Share it with your squad.</p>
              <CustomButton variant="outline" onClick={share}>
                <Link2 className="h-4 w-4" /> Copy link
              </CustomButton>
            </div>
          </motion.div>
        </div>
      </article>

      <section className="container-gv py-20">
        <SectionHeading eyebrow="Keep reading" title="More Stories" link={{ to: '/news', label: 'All news' }} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a, i) => (
            <NewsCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
