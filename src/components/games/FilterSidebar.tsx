import type { ReactNode } from 'react';
import { Check, Heart, RotateCcw, Star } from 'lucide-react';
import type { CategoryId, Genre } from '../../types';
import { categories } from '../../data/categories';
import { ALL_GENRES } from '../../data/games';

export interface Filters {
  category: CategoryId | 'all';
  genres: Genre[];
  minRating: number;
  favoritesOnly: boolean;
}

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}

const RATINGS = [0, 4, 4.5];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-white/10 pt-5">
      <legend className="mb-3 text-xs font-semibold tracking-[0.2em] text-cyber uppercase">{title}</legend>
      {children}
    </fieldset>
  );
}

const chip = (active: boolean) =>
  `rounded-lg border px-3 py-1.5 text-sm transition ${
    active ? 'border-neon/60 bg-neon/20 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
  }`;

export default function FilterSidebar({ filters, onChange, onReset }: Props) {
  const toggleGenre = (g: Genre) =>
    onChange({ genres: filters.genres.includes(g) ? filters.genres.filter((x) => x !== g) : [...filters.genres, g] });

  return (
    <aside className="glass space-y-5 rounded-2xl p-5" aria-label="Filters">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-bold tracking-widest text-white">FILTERS</h2>
        <button onClick={onReset} className="flex items-center gap-1.5 text-xs text-muted transition hover:text-cyber">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <button
        onClick={() => onChange({ favoritesOnly: !filters.favoritesOnly })}
        aria-pressed={filters.favoritesOnly}
        className={`flex w-full items-center gap-2 ${chip(filters.favoritesOnly)}`}
      >
        <Heart className={`h-4 w-4 ${filters.favoritesOnly ? 'fill-pink-500 text-pink-500' : ''}`} /> My favorites only
      </button>

      <Group title="Category">
        <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
          {[{ id: 'all' as const, name: 'All Categories' }, ...categories].map((c) => {
            const active = filters.category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onChange({ category: c.id })}
                aria-pressed={active}
                className={`flex items-center justify-between lg:w-full ${chip(active)}`}
              >
                {c.name}
                {active && <Check className="ml-2 h-4 w-4 text-cyber" />}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Genre">
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((g) => (
            <button key={g} onClick={() => toggleGenre(g)} aria-pressed={filters.genres.includes(g)} className={chip(filters.genres.includes(g))}>
              {g}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Minimum rating">
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button key={r} onClick={() => onChange({ minRating: r })} aria-pressed={filters.minRating === r} className={`flex items-center gap-1 ${chip(filters.minRating === r)}`}>
              {r === 0 ? 'Any' : (<><Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />{r.toFixed(1)}+</>)}
            </button>
          ))}
        </div>
      </Group>
    </aside>
  );
}
