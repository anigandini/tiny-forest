import type { Item, Outfit, OutfitColors, SpawnSpot, Area, Rarity } from './types/Item';
 
export const ITEMS: Item[] = [
  { id:'daisy',      e:'🌼', name:'Daisy',          r:'COMMON',   hex:'#ffe57a', col:0xFFE57A, unlocks:'daisy'     },
  { id:'lavender',   e:'💜', name:'Lavender',        r:'COMMON',   hex:'#b08ed0', col:0xB08ED0, unlocks:'lavender'  },
  { id:'rose',       e:'🌹', name:'Rose',            r:'UNCOMMON', hex:'#ff6b8a', col:0xFF6B8A, unlocks:'rose'      },
  { id:'lily',       e:'🌸', name:'Lily',            r:'UNCOMMON', hex:'#ffb3d9', col:0xFFB3D9, unlocks:'lily'      },
  { id:'crystal',    e:'💎', name:'Forest Crystal',  r:'RARE',     hex:'#80e8ff', col:0x80E8FF, unlocks:null        },
  { id:'acorn',      e:'🌰', name:'Acorn',           r:'COMMON',   hex:'#a07040', col:0xA07040, unlocks:null        },
  { id:'leaf',       e:'🍃', name:'Magic Leaf',      r:'COMMON',   hex:'#60c060', col:0x60C060, unlocks:null        },
  { id:'mushroom',   e:'🍄', name:'Moon Mushroom',   r:'UNCOMMON', hex:'#ff9070', col:0xFF9070, unlocks:'mushroom'  },
  { id:'strawberry', e:'🍓', name:'Strawberry',      r:'UNCOMMON', hex:'#ff4060', col:0xFF4060, unlocks:'berry'     },
  { id:'blueberry',  e:'🫐', name:'Blueberry',       r:'COMMON',   hex:'#6070e0', col:0x6070E0, unlocks:null        },
  { id:'dewdrop',    e:'💧', name:'Dewdrop',         r:'RARE',     hex:'#90d8ff', col:0x90D8FF, unlocks:null        },
  { id:'waterlily',  e:'🪷', name:'Water Lily',      r:'RARE',     hex:'#ff80b0', col:0xFF80B0, unlocks:'waterlily' },
  { id:'firefly',    e:'✨', name:'Firefly Dust',    r:'RARE',     hex:'#ffff80', col:0xFFFF80, unlocks:null        },
  { id:'glowflower', e:'🌟', name:'Glow Flower',     r:'EPIC',     hex:'#ffff40', col:0xFFFF40, unlocks:'glow'      },
  { id:'petal',      e:'🌺', name:'Sunset Petal',    r:'COMMON',   hex:'#ff8050', col:0xFF8050, unlocks:null        },
  { id:'seed',       e:'🌱', name:'Magic Seed',      r:'COMMON',   hex:'#80d060', col:0x80D060, unlocks:null        },
  { id:'star',       e:'⭐', name:'Star Dust',       r:'EPIC',     hex:'#ffee80', col:0xFFEE80, unlocks:null        },
  { id:'blackberry', e:'🍇', name:'Blackberry',      r:'UNCOMMON', hex:'#6030a0', col:0x6030A0, unlocks:null        },
];
 
export const RARITY_COLORS: Record<Rarity, string> = {
  COMMON:   '#70a050',
  UNCOMMON: '#60a0c8',
  RARE:     '#b070e0',
  EPIC:     '#f8c840',
};
 
export const OUTFITS: Outfit[] = [
  { id:'default',  name:'Simple',   e:'👗', unlock:null       },
  { id:'daisy',    name:'Daisy',    e:'🌼', unlock:'daisy'    },
  { id:'lavender', name:'Lavender', e:'💜', unlock:'lavender' },
  { id:'berry',    name:'Berry',    e:'🍓', unlock:'berry'    },
  { id:'mushroom', name:'Mushroom', e:'🍄', unlock:'mushroom' },
  { id:'rose',     name:'Rose',     e:'🌹', unlock:'rose'     },
  { id:'glow',     name:'Glow',     e:'🌟', unlock:'glow'     },
];
 
export const OUTFIT_COLORS: Record<string, OutfitColors> = {
  default:  { dress:'#a0b4c8', hat:'#788898' },
  daisy:    { dress:'#ffe060', hat:'#e8c030' },
  lavender: { dress:'#c890d8', hat:'#a060b8' },
  berry:    { dress:'#f05868', hat:'#b83848' },
  mushroom: { dress:'#f08038', hat:'#d06018' },
  rose:     { dress:'#f07888', hat:'#d85068' },
  glow:     { dress:'#f8f870', hat:'#e8d830' },
};
 
export const SKIN_COLORS: string[] = [
  '#ffdcc0','#f0b080','#c08050','#80502a','#ffe4d0','#d4a070','#ffb0a0',
];
 
export const WING_COLORS: string[] = [
  '#c0f0ff','#ffb0d0','#b0ffb0','#ffe080','#d0b0ff','#ff9090','#a0e8ff',
];
 
export const SPAWN_SPOTS: SpawnSpot[] = [
  {id:'daisy',     x:3,  z:3 }, {id:'daisy',     x:-5, z:4 }, {id:'daisy',    x:7,  z:-2},
  {id:'lavender',  x:-4, z:6 }, {id:'lavender',  x:2,  z:-8},
  {id:'acorn',     x:5,  z:8 }, {id:'acorn',     x:-7, z:-5},
  {id:'leaf',      x:8,  z:2 }, {id:'leaf',      x:-3, z:-6},
  {id:'petal',     x:4,  z:-4}, {id:'seed',      x:-6, z:3 },
  {id:'mushroom',  x:-10,z:12}, {id:'mushroom',  x:12, z:-10},
  {id:'crystal',   x:15, z:5 }, {id:'crystal',   x:-12,z:-8 },
  {id:'blueberry', x:11, z:8 }, {id:'blackberry',x:-9, z:14},
  {id:'strawberry',x:6,  z:12},
  {id:'dewdrop',   x:28, z:8 }, {id:'waterlily', x:32, z:12},
  {id:'firefly',   x:-2, z:-15}, {id:'glowflower',x:3, z:-18}, {id:'star',   x:-5, z:-20},
  {id:'lily',      x:-14,z:10}, {id:'rose',      x:9,  z:-7 },
];
 
export const AREAS: Area[] = [
  { name:'FLOWER MEADOW',   x:0,   z:0,   r:22 },
  { name:'MUSHROOM HOLLOW', x:-18, z:18,  r:16 },
  { name:'DEWDROP POND',    x:30,  z:10,  r:13 },
  { name:'FIREFLY GROVE',   x:0,   z:-20, r:13 },
];