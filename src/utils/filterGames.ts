import type { CategoryId, Game, Genre } from '../types';

export type SortKey = 'rating' | 'popular' | 'newest' | 'title';

export interface GameQuery {
  q: string;
  category: CategoryId | 'all';
  genres: Genre[];
  minRating: number;
  favoritesOnly: boolean;
  favorites: string[];
  sort: SortKey;
}

const SORTERS: Record<SortKey, (a: Game, b: Game) => number> = {
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  popular: (a, b) => b.players - a.players,
  newest: (a, b) => b.releaseDate.localeCompare(a.releaseDate),
  title: (a, b) => a.title.localeCompare(b.title),
};

/** Search + filter + sort. Genres match if the game has ALL selected genres. */
export function filterGames(games: Game[], query: GameQuery): Game[] {
  const q = query.q.trim().toLowerCase();
  return games
    .filter(
      (g) =>
        (!q || [g.title, g.developer, g.tagline, ...g.genres].some((s) => s.toLowerCase().includes(q))) &&
        (query.category === 'all' || g.category === query.category) &&
        query.genres.every((genre) => g.genres.includes(genre)) &&
        g.rating >= query.minRating &&
        (!query.favoritesOnly || query.favorites.includes(g.id)),
    )
    .sort(SORTERS[query.sort]);
}
