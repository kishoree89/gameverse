import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { Mail, MapPin, MessageCircle, Phone, Radio, Send, Tv } from 'lucide-react';
import { Logo, NAV_LINKS } from './Navbar';
import { categories } from '../../data/categories';

export const SOCIALS = [
  { label: 'Discord', href: 'https://discord.com', Icon: MessageCircle },
  { label: 'Twitch', href: 'https://twitch.tv', Icon: Radio },
  { label: 'YouTube', href: 'https://youtube.com', Icon: Tv },
  { label: 'Telegram', href: 'https://telegram.org', Icon: Send },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-navy/60">
      <div className="absolute inset-x-0 top-0 h-px animated-gradient" />
      <div className="container-gv py-16">
        {/* Bootstrap grid for the multi-column footer layout */}
        <div className="row g-5">
          <div className="col-12 col-lg-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              GameVerse is your home for discovering games, following the industry and connecting with millions of players worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <Tooltip key={label} title={label} arrow>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="glass grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:-translate-y-1 hover:border-neon/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <h3 className="mb-4 font-display text-sm tracking-widest text-white">EXPLORE</h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted transition hover:text-cyber">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <h3 className="mb-4 font-display text-sm tracking-widest text-white">GENRES</h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/explore?category=${c.id}`} className="text-muted transition hover:text-cyber">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <h3 className="mb-4 font-display text-sm tracking-widest text-white">CONTACT</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-neon" />42 Pixel Avenue, Bengaluru, India</li>
              <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-neon" /><a href="mailto:hello@gameverse.gg" className="hover:text-cyber">hello@gameverse.gg</a></li>
              <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-neon" /><a href="tel:+918000000000" className="hover:text-cyber">+91 80 0000 0000</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} GameVerse. All rights reserved.</p>
          <p>All game titles shown are fictional.</p>
        </div>
      </div>
    </footer>
  );
}
