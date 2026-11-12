import type { NewsArticle } from '../types';
import { IMG } from '../utils/images';

export const news: NewsArticle[] = [
  {
    id: 'chronicles-of-aether-launch',
    title: 'Chronicles of Aether launches to record-breaking 1.5M concurrent players',
    excerpt:
      'Starlight Hearth’s fantasy epic had the biggest RPG launch of the year, and reviewers are calling its branching story a new genre benchmark.',
    body: [
      'Chronicles of Aether went live worldwide on 4 November, and within 48 hours it had passed 1.5 million concurrent players across all platforms. That is the largest launch for a single-player RPG this year.',
      'Reviewers have singled out the branching narrative. Major choices in the first act change which kingdoms, companions and quest lines you see later, and the studio estimates a single playthrough covers less than 40% of the total story content.',
      'Starlight Hearth has confirmed a free “Skyforged” update for December that adds a new region, two companions and a photo mode. A paid expansion is planned for late 2027.',
      'Players on older hardware reported stutter in the capital city. A hotfix released on 9 November improves streaming performance by up to 30% on mid-range GPUs.',
    ],
    type: 'Release',
    author: 'Maya Chen',
    date: '2026-11-06',
    readTime: 4,
    image: IMG.starPeaks,
    featured: true,
  },
  {
    id: 'arena-legends-worlds',
    title: 'Arena Legends World Finals sell out in under ten minutes',
    excerpt:
      'The world finals return with a $5M prize pool, a new double-elimination format and a live crowd of 18,000 fans.',
    body: [
      'Tickets for the Arena Legends World Finals sold out in nine minutes and forty seconds, setting a new record for the event.',
      'This year’s tournament moves to a double-elimination bracket from the quarter-finals onward, giving teams a second chance after one bad series.',
      'Crownfall Entertainment also announced a co-streaming program that lets approved creators broadcast every match, which the studio expects will push peak viewership past 6 million.',
    ],
    type: 'Esports',
    author: 'Jordan Reyes',
    date: '2026-11-03',
    readTime: 3,
    image: IMG.arena,
    featured: true,
  },
  {
    id: 'velocity-rush-season-2',
    title: 'Velocity Rush X Season 2 adds a night-time mountain pass and 24 new cars',
    excerpt:
      'The free “Ridgeline” update introduces touge-style duels, a reworked drift scoring system and crew garages.',
    body: [
      'Redline Works has detailed Season 2 of Velocity Rush X. Its centrepiece is “Ridgeline”, a 30 km mountain road open only between in-game dusk and dawn.',
      'Drift scoring now rewards line consistency and proximity, and crew garages let up to eight friends share tuning setups and liveries.',
      'The update arrives on 20 November for all platforms at no extra cost.',
    ],
    type: 'Update',
    author: 'Priya Nair',
    date: '2026-11-01',
    readTime: 3,
    image: IMG.hypercar,
  },
  {
    id: 'hollow-circus-review',
    title: 'Grin of the Hollow Circus is the scariest game of 2026',
    excerpt:
      'Nightjar Studio’s Halloween release turns a decaying big top into a masterclass in tension and sound design.',
    body: [
      'Released on Halloween, Grin of the Hollow Circus has quickly become the year’s most talked-about horror game.',
      'Instead of relying on jump scares, the game uses adaptive audio, so the calliope music shifts key as danger approaches. Players say it is the most anxious experience they have had this year.',
      'Nightjar has confirmed a “Daylight Mode” accessibility option that reduces gore and flashing effects without removing the tension.',
    ],
    type: 'Release',
    author: 'Sam Okafor',
    date: '2026-10-31',
    readTime: 5,
    image: IMG.clown,
  },
  {
    id: 'starfall-legacy-2-announced',
    title: 'Starfall Legacy II revealed with seamless planet landings',
    excerpt:
      'Parsec Nine confirms the sequel for 2027, with no loading screens between space and planet surfaces.',
    body: [
      'Parsec Nine opened its showcase with a first look at Starfall Legacy II, which promises seamless transitions from orbit to the surface of every planet.',
      'Companions now remember and react to past decisions across the whole campaign, and ship crews can mutiny if morale gets too low.',
      'The game is targeting a fall 2027 release on PC and current-generation consoles.',
    ],
    type: 'Upcoming',
    author: 'Maya Chen',
    date: '2026-10-27',
    readTime: 4,
    image: IMG.nebula,
    featured: true,
  },
  {
    id: 'skyward-expanse-dlc',
    title: 'Skyward Expanse “Sunken Peaks” expansion dated for February',
    excerpt:
      'Dive beneath the clouds into a drowned kingdom in the first major expansion for the open-world hit.',
    body: [
      'Northwind Interactive has confirmed that Sunken Peaks, the first expansion for Skyward Expanse, launches on 12 February 2027.',
      'The expansion adds an underwater biome roughly 40% the size of the base map, along with new traversal gear and a six-hour story arc.',
    ],
    type: 'Upcoming',
    author: 'Lena Fischer',
    date: '2026-10-20',
    readTime: 2,
    image: IMG.cliffs,
  },
  {
    id: 'iron-protocol-ranked',
    title: 'Iron Protocol overhauls ranked play with role queue and replay system',
    excerpt:
      'Sentinel Forge’s tactical shooter introduces full match replays and a new anti-smurf system.',
    body: [
      'Iron Protocol’s Patch 3.2 introduces role queue for ranked matches, so every team gets a balanced mix of entry, support and anchor players.',
      'A new replay system lets players re-watch any match from the last 30 days from any player’s perspective.',
      'The patch also adds a phone-verification step for ranked play, aimed at reducing smurf accounts.',
    ],
    type: 'Update',
    author: 'Jordan Reyes',
    date: '2026-10-14',
    readTime: 3,
    image: IMG.pistol,
  },
  {
    id: 'indie-showcase-2026',
    title: '12 indie games you should wishlist from this year’s Indie Spotlight',
    excerpt:
      'From cosy farming RPGs to brutal roguelites, here are the indie highlights from Indie Spotlight 2026.',
    body: [
      'This year’s Indie Spotlight featured more than 40 games. Our editors picked 12 standouts across every genre.',
      'Highlights include a rune-crafting sequel from Hearthglen Games, a rhythm roguelite from Bitwave Collective and a minimalist city builder that uses only sound.',
      'Most of the showcased titles have free demos available until the end of the month.',
    ],
    type: 'Industry',
    author: 'Lena Fischer',
    date: '2026-10-08',
    readTime: 6,
    image: IMG.arcadeNeon,
  },
  {
    id: 'pixel-party-royale-crossplay',
    title: 'Pixel Party Royale adds full cross-play and cross-progression',
    excerpt: 'Play with friends on any device and keep every crown, costume and emote.',
    body: [
      'Confetti Cannon has rolled out full cross-play and cross-progression for Pixel Party Royale across console, PC and mobile.',
      'To celebrate, the studio is running a two-week “Confetti Carnival” event with double crown rewards.',
    ],
    type: 'Update',
    author: 'Priya Nair',
    date: '2026-09-30',
    readTime: 2,
    image: IMG.padsYellow,
  },
];

export const getArticle = (id: string) => news.find((n) => n.id === id);
