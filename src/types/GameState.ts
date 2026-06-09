import type { CollectibleMesh } from './Collectible';

export interface GameState {
  discovered: Set<string>;
  inventory:  Record<string, number>;
  outfit:     string;
  skin:       string;
  wing:       string;
  unlocked:   Set<string>;
  activePanel: string | null;
  nearItem:    CollectibleMesh | null;
  cooldown:    number;
  // player
  px: number;
  py: number;
  pz: number;
  yaw:   number;
  pitch: number;
  // mouse drag
  dragging: boolean;
  lastMX:   number;
  lastMY:   number;
}