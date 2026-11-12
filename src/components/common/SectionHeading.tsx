import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, link, center }: Props) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-3xl'}>
        <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-cyber uppercase">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
      </div>
      {link && (
        <Link
          to={link.to}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neon transition hover:text-cyber"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
