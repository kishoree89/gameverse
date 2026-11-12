import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import SearchBar from '../../components/common/SearchBar';
import GameGrid from '../../components/games/GameGrid';
import FilterSidebar, { type Filters } from '../../components/games/FilterSidebar';
import { games } from '../../data/games';
import { getCategory, isCategoryId } from '../../data/categories';
import { useFavorites } from '../../hooks/useFavorites';
import { filterGames, type SortKey } from '../../utils/filterGames';
import { IMG } from '../../utils/images';
import type { Genre } from '../../types';

const PAGE_SIZE = 6;
const SORTS: { value: SortKey; label: string }[] = [
  { value: 'rating', label: 'Top rated' },
  { value: 'popular', label: 'Most popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'A – Z' },
];

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const { favorites } = useFavorites();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>('rating');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  // Category & favorites live in the URL so links from other pages can deep-link here.
  const categoryParam = params.get('category');
  const category = isCategoryId(categoryParam) ? categoryParam : 'all';
  const favoritesOnly = params.get('favorites') === '1';

  const filters: Filters = { category, genres, minRating, favoritesOnly };

  const update = (patch: Partial<Filters>) => {
    if (patch.genres) setGenres(patch.genres);
    if (patch.minRating !== undefined) setMinRating(patch.minRating);
    if (patch.category !== undefined || patch.favoritesOnly !== undefined) {
      const next = new URLSearchParams(params);
      const cat = patch.category ?? category;
      const fav = patch.favoritesOnly ?? favoritesOnly;
      if (cat === 'all') next.delete('category');
      else next.set('category', cat);
      if (fav) next.set('favorites', '1');
      else next.delete('favorites');
      setParams(next, { replace: true });
    }
  };

  const reset = () => {
    setQ('');
    setGenres([]);
    setMinRating(0);
    setSort('rating');
    setParams({}, { replace: true });
  };

  const results = useMemo(
    () => filterGames(games, { q, category, genres, minRating, favoritesOnly, favorites, sort }),
    [q, category, genres, minRating, favoritesOnly, favorites, sort],
  );

  useEffect(() => setVisible(PAGE_SIZE), [q, category, genres, minRating, favoritesOnly, sort]);

  const heading = favoritesOnly ? 'Your Favorites' : category !== 'all' ? `${getCategory(category)?.name} Games` : 'Explore Games';

  return (
    <>
      <PageBanner
        eyebrow="Game Library"
        title={<>Find Your Next <span className="text-gradient">Obsession</span></>}
        subtitle={`Search ${games.length} hand-picked titles by genre, rating and popularity. Add favorites to build your personal library.`}
        image={IMG.battleStation}
      >
        <div className="mx-auto max-w-2xl">
          <SearchBar value={q} onChange={setQ} />
        </div>
      </PageBanner>

      <section className="container-gv">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-72 lg:shrink-0">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="glass mb-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white lg:hidden"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" /> {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            <div className={`${showFilters ? 'block' : 'hidden'} lg:sticky lg:top-24 lg:block`}>
              <FilterSidebar filters={filters} onChange={update} onReset={reset} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">{heading}</h2>
                <p className="text-sm text-muted" aria-live="polite">
                  Showing {Math.min(visible, results.length)} of {results.length} games
                </p>
              </div>
              <label className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                <ArrowUpDown className="h-4 w-4 text-cyber" />
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="cursor-pointer bg-transparent pr-1 text-white focus:outline-none [&>option]:bg-navy"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <GameGrid
              games={results.slice(0, visible)}
              emptyText={favoritesOnly && favorites.length === 0 ? 'Tap the heart on any game to save it here.' : 'Try clearing a filter or searching for something else.'}
            />

            <AnimatePresence>
              {visible < results.length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 flex justify-center">
                  <Button variant="outlined" size="large" onClick={() => setVisible((v) => v + PAGE_SIZE)} sx={{ px: 5, py: 1.5, borderRadius: 3 }}>
                    Load More Games ({results.length - visible} left)
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
