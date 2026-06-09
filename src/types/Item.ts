export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC';
 
export interface Item {
  id:      string;
  e:       string;
  name:    string;
  r:       Rarity;
  hex:     string;
  col:     number;
  unlocks: string | null;
}
 
export interface Outfit {
  id:     string;
  name:   string;
  e:      string;
  unlock: string | null;
}
 
export interface OutfitColors {
  dress: string;
  hat:   string;
}
 
export interface SpawnSpot {
  id: string;
  x:  number;
  z:  number;
}
 
export interface Area {
  name: string;
  x:    number;
  z:    number;
  r:    number;
}