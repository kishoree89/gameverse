import type { Category, CategoryId } from '../types';
import { IMG } from '../utils/images';

export const categories: Category[] = [
  { id: 'action', name: 'Action', description: 'Fast reflexes, big combos and cinematic set pieces.', image: IMG.redHaze, accent: 'from-rose-500 to-orange-400' },
  { id: 'adventure', name: 'Adventure', description: 'Vast worlds, hidden secrets and epic journeys.', image: IMG.peaks, accent: 'from-emerald-400 to-cyan-400' },
  { id: 'racing', name: 'Racing', description: 'Burn rubber on streets, circuits and open roads.', image: IMG.hypercar, accent: 'from-amber-400 to-red-500' },
  { id: 'sports', name: 'Sports', description: 'Stadium-ready football, hoops and endurance events.', image: IMG.stadium, accent: 'from-lime-400 to-emerald-500' },
  { id: 'rpg', name: 'RPG', description: 'Level up, choose your path and shape the story.', image: IMG.castleFog, accent: 'from-violet-500 to-fuchsia-500' },
  { id: 'shooting', name: 'Shooting', description: 'Tactical gunfights and lightning-fast arenas.', image: IMG.lensRed, accent: 'from-red-500 to-pink-500' },
  { id: 'strategy', name: 'Strategy', description: 'Outthink, outbuild and outmanoeuvre your rivals.', image: IMG.chessBw, accent: 'from-sky-400 to-indigo-500' },
  { id: 'simulation', name: 'Simulation', description: 'Build, manage and live out other lives.', image: IMG.vrHeadset, accent: 'from-cyan-400 to-blue-500' },
  { id: 'horror', name: 'Horror', description: 'Survive the dark. Do not look behind you.', image: IMG.clown, accent: 'from-zinc-400 to-red-600' },
  { id: 'multiplayer', name: 'Multiplayer', description: 'Squad up, compete and climb the ranks together.', image: IMG.esportsStage, accent: 'from-purple-500 to-cyan-400' },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const isCategoryId = (id: string | null): id is CategoryId =>
  !!id && categories.some((c) => c.id === id);
