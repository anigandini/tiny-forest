import type { GameState } from '../types/GameState';

export const G: GameState = {
  discovered:  new Set<string>(),
  inventory:   {},
  outfit:      'default',
  skin:        '#ffdcc0',
  wing:        '#c0f0ff',
  unlocked:    new Set<string>(['default']),
  activePanel: null,
  nearItem:    null,
  cooldown:    0,
  px: 0, py: 2.2, pz: 0,
  yaw: 0, pitch: 0,
  dragging: false,
  lastMX:   0,
  lastMY:   0,
};