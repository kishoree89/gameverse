export type CategoryId =
  | 'action'
  | 'adventure'
  | 'racing'
  | 'sports'
  | 'rpg'
  | 'shooting'
  | 'strategy'
  | 'simulation'
  | 'horror'
  | 'multiplayer';

export type Genre =
  | 'Open World'
  | 'Sci-Fi'
  | 'Fantasy'
  | 'Arcade'
  | 'Survival'
  | 'Story Rich'
  | 'Competitive'
  | 'Co-op';

export interface SystemRequirements {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
}

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: CategoryId;
  genres: Genre[];
  rating: number;
  reviews: number;
  players: number; // monthly active, in thousands
  releaseDate: string; // ISO date
  developer: string;
  platforms: string[];
  price: number; // 0 = free to play
  cover: string;
  screenshots: string[];
  trending?: boolean;
  featured?: boolean;
  requirements: { minimum: SystemRequirements; recommended: SystemRequirements };
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  accent: string; // tailwind gradient classes
}

export type NewsType = 'Release' | 'Upcoming' | 'Update' | 'Esports' | 'Industry';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  body: string[];
  type: NewsType;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

export interface CommunityUser {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  level: number;
  rank: string;
  favoriteGame: string;
  followers: number;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  tag: string;
  time: string;
  likes: number;
  comments: Comment[];
  image?: string;
}
