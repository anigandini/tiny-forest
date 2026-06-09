import { G } from '../core/State';
import { ITEMS, RARITY_COLORS } from '../data';

import { refreshJournal } from '../ui/JournalUI';
import { refreshFairyUI } from '../ui/FairyUI';
import { refreshInventory } from '../ui/InventoryUI';

import type { Item } from '../types/Item';

export function tryCollect(): void {
  if (G.cooldown > 0 || !G.nearItem) return;

  const cm = G.nearItem;

  if (cm.collected) return;

  cm.collected = true;
  cm.group.visible = false;

  const def = cm.def;

  G.inventory[def.id] = (G.inventory[def.id] || 0) + 1;

  G.discovered.add(def.id);

  if (def.unlocks) {
    G.unlocked.add(def.unlocks);
  }

  showPopup(def);

  floatEmoji(def.e);

  refreshInventory();
  refreshJournal();
  refreshFairyUI();

  G.cooldown = 1.5;
}

function showPopup(def: Item): void {
  const emoji  = document.getElementById('popEmoji');
  const name   = document.getElementById('popName');
  const rarity = document.getElementById('popRarity');
  const popup  = document.getElementById('popup');

  if (
    !emoji ||
    !name ||
    !rarity ||
    !popup
  ) {
    return;
  }

  emoji.textContent = def.e;
  name.textContent = def.name;

  rarity.textContent = `✦ ${def.r} ✦`;
  rarity.style.color = RARITY_COLORS[def.r];

  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 2200);
}

function floatEmoji(emoji: string): void {
  const el = document.createElement('div');

  el.className = 'rise';
  el.textContent = emoji;

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 1200);
}