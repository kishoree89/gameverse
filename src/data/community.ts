import type { CommunityUser, Post } from '../types';
import { IMG } from '../utils/images';

export const users: CommunityUser[] = [
  { id: 'u1', name: 'Aria Voss', handle: '@ariavoss', avatar: IMG.avatar1, level: 87, rank: 'Diamond', favoriteGame: 'Chronicles of Aether', followers: 12400 },
  { id: 'u2', name: 'Marcus Hale', handle: '@hale_fps', avatar: IMG.avatar4, level: 92, rank: 'Grandmaster', favoriteGame: 'Iron Protocol', followers: 28900 },
  { id: 'u3', name: 'Sofia Reyes', handle: '@sofiaplays', avatar: IMG.avatar2, level: 64, rank: 'Platinum', favoriteGame: 'Skyward Expanse', followers: 8700 },
  { id: 'u4', name: 'Leo Brandt', handle: '@leo_drifts', avatar: IMG.avatar7, level: 71, rank: 'Diamond', favoriteGame: 'Velocity Rush X', followers: 9600 },
  { id: 'u5', name: 'Nina Park', handle: '@ninaparkgg', avatar: IMG.avatar5, level: 55, rank: 'Gold', favoriteGame: 'Pixel Party Royale', followers: 4300 },
  { id: 'u6', name: 'Ethan Cole', handle: '@ethancole', avatar: IMG.avatar3, level: 99, rank: 'Legend', favoriteGame: 'Arena Legends', followers: 51200 },
  { id: 'u7', name: 'Jonas Wright', handle: '@jwright', avatar: IMG.avatar6, level: 48, rank: 'Gold', favoriteGame: 'Kingsgambit Empires', followers: 2100 },
  { id: 'u8', name: 'Elena Morris', handle: '@elenahorror', avatar: IMG.avatar8, level: 76, rank: 'Diamond', favoriteGame: 'Grin of the Hollow Circus', followers: 15800 },
];

/** The signed-in mock user who writes new comments. */
export const CURRENT_USER: CommunityUser = {
  id: 'me',
  name: 'You',
  handle: '@player_one',
  avatar: IMG.avatar6,
  level: 12,
  rank: 'Silver',
  favoriteGame: 'Skyward Expanse',
  followers: 0,
};

export const getUser = (id: string) =>
  id === CURRENT_USER.id ? CURRENT_USER : (users.find((u) => u.id === id) ?? users[0]);

export const posts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    title: 'Chronicles of Aether: which companion did you pick in Act 2?',
    body: 'I went with Seraphine and the whole northern questline changed. I didn’t expect the Ember Court to turn on me. Spoiler-free answers please. How different was your route?',
    tag: 'RPG',
    time: '2h ago',
    likes: 342,
    image: IMG.starPeaks,
    comments: [
      { id: 'c1', userId: 'u3', text: 'Picked Doran and got a completely different ending to the chapter. This game is wild.', time: '1h ago' },
      { id: 'c2', userId: 'u7', text: 'Seraphine gang! The court betrayal hit hard.', time: '45m ago' },
    ],
  },
  {
    id: 'p2',
    userId: 'u2',
    title: 'Iron Protocol 3.2: role queue is a game changer for solo players',
    body: 'Three days in and my solo-queue matches feel much more balanced. No more five entry fraggers on one team. What’s your experience been?',
    tag: 'Shooting',
    time: '5h ago',
    likes: 518,
    comments: [
      { id: 'c3', userId: 'u6', text: 'Queue times went up slightly for anchor players but the matches are way better.', time: '4h ago' },
    ],
  },
  {
    id: 'p3',
    userId: 'u4',
    title: 'My Velocity Rush X drift tune for the new mountain pass',
    body: 'Sharing my S-class drift setup ahead of Season 2: soft front anti-roll bars, 58% rear brake bias, and final drive at 3.9. It holds a line through the hairpins nicely.',
    tag: 'Racing',
    time: '8h ago',
    likes: 229,
    image: IMG.muscleCar,
    comments: [],
  },
  {
    id: 'p4',
    userId: 'u8',
    title: 'The audio design in Hollow Circus deserves every award',
    body: 'Play with headphones. The music changes key when the Ringmaster is close. I’ve never been this tense in a game.',
    tag: 'Horror',
    time: '1d ago',
    likes: 687,
    comments: [
      { id: 'c4', userId: 'u5', text: 'I had to stop after the hall of mirrors. Nope.', time: '20h ago' },
      { id: 'c5', userId: 'u1', text: 'That calliope tune is going to haunt me forever.', time: '18h ago' },
    ],
  },
  {
    id: 'p5',
    userId: 'u6',
    title: 'Looking for a Diamond+ squad for Arena Legends ranked',
    body: 'I main jungle and can flex support. I play evenings EU time and I’m chill on comms. Drop your rank and role below!',
    tag: 'Multiplayer',
    time: '1d ago',
    likes: 154,
    comments: [],
  },
];

export const popularDiscussions = [
  { title: 'Best open-world game of 2026?', replies: 1284, tag: 'Discussion' },
  { title: 'Arena Legends World Finals predictions', replies: 932, tag: 'Esports' },
  { title: 'Show us your battle station setup', replies: 811, tag: 'Hardware' },
  { title: 'Hidden gems under $20 this month', replies: 604, tag: 'Deals' },
  { title: 'Hollow Circus theories (spoilers!)', replies: 557, tag: 'Horror' },
];
