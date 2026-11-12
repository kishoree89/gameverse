import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import { Gamepad2, Heart, Menu, X } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/categories', label: 'Categories' },
  { to: '/top-games', label: 'Top Games' },
  { to: '/news', label: 'News' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/plugin-test', label: 'Plugin Test' },
];

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="GameVerse home">
      <span className="animated-gradient grid h-10 w-10 place-items-center rounded-xl shadow-lg shadow-neon/40 transition-transform group-hover:rotate-12">
        <Gamepad2 className="h-5 w-5 text-white" />
      </span>
      <span className="font-display text-lg font-black tracking-wider text-white">
        GAME<span className="text-gradient">VERSE</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-[1100] transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-void/80 py-3 backdrop-blur-xl' : 'py-5'
      }`}
    >
      <nav className="container-gv flex items-center justify-between gap-4" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(l.to) ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive(l.to) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg border border-neon/40 bg-neon/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Tooltip title="My favorites" arrow>
            <Link
              to="/explore?favorites=1"
              className="glass relative grid h-10 w-10 place-items-center rounded-xl text-pink-400 transition hover:bg-white/10"
              aria-label={`Favorites (${favorites.length})`}
            >
              <Heart className="h-5 w-5" />
              <AnimatePresence>
                {favorites.length > 0 && (
                  <motion.span
                    key={favorites.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </Tooltip>
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass grid h-10 w-10 place-items-center rounded-xl text-white xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-y-auto xl:hidden"
          >
            <ul className="container-gv flex flex-col gap-1 pt-6 pb-32">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={l.to}
                    className={`block rounded-xl px-4 py-3.5 font-display text-lg tracking-wide transition ${
                      isActive(l.to) ? 'bg-neon/15 text-white' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
