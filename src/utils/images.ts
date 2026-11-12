// All Unsplash IDs below were checked to return HTTP 200 (Nov 2026).
const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const IMG = {
  // gaming setups & hardware
  arcadeBlue: u('1511512578047-dfb367046420'),
  arcadeNeon: u('1511882150382-421056c89033'),
  rgbKeyboard: u('1538481199705-c710c4e965fc'),
  retroConsoles: u('1550745165-9bc0b252726f'),
  padDark: u('1552820728-8b83bb6b773f'),
  padLaptop: u('1556438064-2d7646166914'),
  gameOver: u('1579373903781-fd5c0c30c4cd'),
  padsYellow: u('1580327344181-c1163234e5a0'),
  padPink: u('1586182987320-4f376d39d787'),
  gpu: u('1591488320449-011701bb6704'),
  streamSetup: u('1598550476439-6847785fcea6'),
  handsPad: u('1600861194942-f883de0dfe96'),
  pcNeon: u('1603481546238-487240415921'),
  consoleWhite: u('1605901309584-818e25960a8f'),
  padCyan: u('1612287230202-1ff1d85d1bdf'),
  padXbox: u('1614294148960-9aa740632a87'),
  roomNeon: u('1616588589676-62b3bd4ff6d2'),
  vrHeadset: u('1622979135225-d2ba269cf1ac'),
  lensRed: u('1626379953822-baec19c3accd'),
  battleStation: u('1636487658609-28282bb5a3a0'),
  laptopPlay: u('1640955014216-75201056c829'),
  playerTv: u('1486572788966-cfd3df1f5b42'),
  coopCouch: u('1493711662062-fa541adb3fc8'),
  padWhite: u('1509198397868-475647b2a1e5'),
  circuit: u('1518770660439-4636190af475'),
  matrix: u('1526374965328-7f61d4dc18c5'),
  laptopGlow: u('1525547719571-a2d4ac8945e2'),
  keyboardBlue: u('1547394765-185e1e68f34e'),
  circuitGlow: u('1550751827-4bd374c3f58b'),
  vrNeon: u('1535223289827-42f1e9919769'),
  // esports
  arena: u('1504450758481-7338eba7524a'),
  esportsPlayer: u('1542751371-adc38448a05e'),
  esportsStage: u('1558008258-3256797b43f3'),
  lanParty: u('1560253023-3ec5d502959f'),
  proGamer: u('1534423861386-85a16f5d13fd'),
  tabletPlay: u('1542751110-97427bbecf20'),
  // worlds
  forest: u('1441974231531-c6227db76b6e'),
  orbit: u('1446776811953-b23d57bd21aa'),
  earthNight: u('1451187580459-43490279c0fa'),
  nebula: u('1462331940025-496dfbfc7564'),
  alps: u('1464822759023-fed622ff2c3b'),
  cliffs: u('1470071459604-3b5ec3a7fe05'),
  fairyValley: u('1472214103451-9374bd1c798e'),
  skyline: u('1477959858617-67f85cf4f1df'),
  stormSky: u('1478760329108-5c3ed9d495a0'),
  canyonRoad: u('1500530855697-b586d89ba3ee'),
  peaks: u('1506905925346-21bda4d32df4'),
  harbor: u('1514565131-fce0801e5785'),
  castleFog: u('1518709268805-4e9042af9f23'),
  neonStreet: u('1519608487953-e999c86e7455'),
  starPeaks: u('1519681393784-d120267933ba'),
  starSea: u('1534447677768-be436bb09401'),
  wave: u('1559827260-dc66d52bef19'),
  redHaze: u('1563089145-599997674d42'),
  clown: u('1509248961158-e54f6934749c'),
  pistol: u('1595590424283-b8f17842773f'),
  chessBw: u('1528819622765-d6bcf132f793'),
  chessWood: u('1529699211952-734e80c4d42b'),
  // racing
  garage: u('1492144534655-ae79c964c9d7'),
  muscleCar: u('1494976388531-d1058494cdd8'),
  sedanSpeed: u('1503376780353-7e6692767b70'),
  hypercar: u('1544636331-e26879cd4d9b'),
  roadRacer: u('1568605117036-5fe5e7bab0b7'),
  redSuper: u('1583121274602-3e2820c69888'),
  // sports
  nightPitch: u('1431324155629-1a6deb1dec8d'),
  sprint: u('1461896836934-ffe607ba8211'),
  cycling: u('1517649763962-0c623066013b'),
  stadium: u('1540747913346-19e32dc3e97e'),
  hoops: u('1546519638-68e109498ffc'),
  football: u('1574629810360-7efbbe195018'),
  ropes: u('1599058917212-d750089bc07e'),
  // people
  avatar1: u('1438761681033-6461ffad8d80'),
  avatar2: u('1494790108377-be9c29b29330'),
  avatar3: u('1500648767791-00dcc994a43e'),
  avatar4: u('1507003211169-0a1dd7228f2d'),
  avatar5: u('1517841905240-472988babdf9'),
  avatar6: u('1535713875002-d1d0cf377fde'),
  avatar7: u('1539571696357-5a69c17a67c6'),
  avatar8: u('1544005313-94ddf0286df2'),
} as const;

/** Sized, compressed Unsplash URL. */
export const sized = (url: string, w: number, h?: number) =>
  `${url}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ''}`;

/** Inline SVG shown if a remote image ever fails – never a broken icon. */
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e1065"/><stop offset="1" stop-color="#083344"/></linearGradient></defs><rect width="400" height="250" fill="url(#g)"/><path d="M150 100h100l-15 50h-70z" fill="none" stroke="#22d3ee" stroke-width="6" stroke-linejoin="round"/></svg>`,
  );
