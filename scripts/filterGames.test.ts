// Run: node scripts/filterGames.test.ts   (Node 23.6+ strips types natively)
import assert from 'node:assert/strict';
import { filterGames, type GameQuery } from '../src/utils/filterGames.ts';
import type { Game } from '../src/types/index.ts';

const mk = (id: string, p: Partial<Game>): Game =>
  ({ id, title: id, tagline: '', description: '', developer: 'Dev', genres: [], rating: 4, reviews: 1, players: 1, releaseDate: '2026-01-01', category: 'action', ...p }) as Game;

const games = [
  mk('alpha', { rating: 4.9, category: 'rpg', genres: ['Fantasy', 'Co-op'], players: 10, releaseDate: '2025-01-01' }),
  mk('bravo', { rating: 4.2, category: 'racing', genres: ['Arcade'], players: 99, releaseDate: '2026-06-01', developer: 'Redline' }),
  mk('charlie', { rating: 4.6, category: 'rpg', genres: ['Fantasy'], players: 50, releaseDate: '2026-02-01' }),
];
const base: GameQuery = { q: '', category: 'all', genres: [], minRating: 0, favoritesOnly: false, favorites: [], sort: 'rating' };
const ids = (p: Partial<GameQuery>) => filterGames(games, { ...base, ...p }).map((g) => g.id);

assert.deepEqual(ids({}), ['alpha', 'charlie', 'bravo']);
assert.deepEqual(ids({ sort: 'popular' }), ['bravo', 'charlie', 'alpha']);
assert.deepEqual(ids({ sort: 'newest' }), ['bravo', 'charlie', 'alpha']);
assert.deepEqual(ids({ category: 'rpg' }), ['alpha', 'charlie']);
assert.deepEqual(ids({ genres: ['Fantasy', 'Co-op'] }), ['alpha']);
assert.deepEqual(ids({ minRating: 4.5 }), ['alpha', 'charlie']);
assert.deepEqual(ids({ q: '  REDLINE ' }), ['bravo']);
assert.deepEqual(ids({ favoritesOnly: true, favorites: ['charlie'] }), ['charlie']);
assert.deepEqual(ids({ favoritesOnly: true }), []);
console.log('filterGames: all checks passed');
