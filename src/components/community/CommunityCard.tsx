import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import type { Comment, Post } from '../../types';
import { CURRENT_USER, getUser } from '../../data/community';
import SmartImage from '../common/SmartImage';
import { useToast } from '../../hooks/useToast';

function Avatar({ src, name, size = 'h-10 w-10' }: { src: string; name: string; size?: string }) {
  return <SmartImage src={src} alt={name} width={96} height={96} className={`${size} shrink-0 rounded-full object-cover ring-2 ring-neon/40`} />;
}

export default function CommunityCard({ post, index = 0 }: { post: Post; index?: number }) {
  const author = getUser(post.userId);
  const toast = useToast();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const addComment = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments((c) => [...c, { id: `${post.id}-${Date.now()}`, userId: CURRENT_USER.id, text, time: 'Just now' }]);
    setDraft('');
    toast({ kind: 'success', title: 'Comment posted' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-2xl p-5 transition hover:border-white/20 sm:p-6"
    >
      <header className="flex items-center gap-3">
        <Avatar src={author.avatar} name={author.name} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">{author.name}</p>
          <p className="text-xs text-muted">{author.handle} · {post.time}</p>
        </div>
        <span className="rounded-md border border-neon/40 bg-neon/10 px-2 py-0.5 text-xs font-semibold text-neon">{post.tag}</span>
      </header>

      <h3 className="mt-4 font-display text-lg font-bold text-white">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{post.body}</p>
      {post.image && (
        <div className="mt-4 overflow-hidden rounded-xl">
          <SmartImage src={post.image} alt="" width={900} height={420} className="aspect-[21/9] w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      )}

      <footer className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked((l) => !l)}
          aria-pressed={liked}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${liked ? 'bg-pink-500/15 text-pink-400' : 'text-muted hover:bg-white/5 hover:text-white'}`}
        >
          <motion.span key={String(liked)} initial={{ scale: liked ? 0.3 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
            <Heart className={`h-4 w-4 ${liked ? 'fill-pink-500' : ''}`} />
          </motion.span>
          {(post.likes + (liked ? 1 : 0)).toLocaleString('en-US')}
          <span className="sr-only">likes</span>
        </motion.button>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${open ? 'bg-cyber/10 text-cyber' : 'text-muted hover:bg-white/5 hover:text-white'}`}
        >
          <MessageCircle className="h-4 w-4" /> {comments.length}
          <span className="sr-only">comments</span>
        </button>
        <Tooltip title="Copy link" arrow>
          <button
            onClick={() => {
              navigator.clipboard
                ?.writeText(`${window.location.origin}/community#${post.id}`)
                .then(() => toast({ kind: 'info', title: 'Post link copied' }))
                .catch(() => toast({ kind: 'error', title: 'Couldn’t copy link' }));
            }}
            className="ml-auto rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-white"
            aria-label="Share post"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </Tooltip>
      </footer>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <ul className="mt-4 space-y-3">
              <AnimatePresence initial={false}>
                {comments.map((c) => {
                  const u = getUser(c.userId);
                  return (
                    <motion.li key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                      <Avatar src={u.avatar} name={u.name} size="h-8 w-8" />
                      <div className="min-w-0 flex-1 rounded-xl bg-white/5 px-3 py-2">
                        <p className="text-xs"><span className="font-semibold text-white">{u.name}</span> <span className="text-muted">· {c.time}</span></p>
                        <p className="text-sm break-words text-slate-300">{c.text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
              {comments.length === 0 && <li className="text-sm text-muted">No comments yet. Start the conversation!</li>}
            </ul>
            <form onSubmit={addComment} className="mt-4 flex gap-2">
              <label htmlFor={`comment-${post.id}`} className="sr-only">Write a comment</label>
              <input
                id={`comment-${post.id}`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={280}
                placeholder="Write a comment…"
                className="input-gv !py-2.5"
              />
              <button type="submit" disabled={!draft.trim()} className="animated-gradient grid w-11 shrink-0 place-items-center rounded-xl text-white disabled:opacity-40" aria-label="Post comment">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
