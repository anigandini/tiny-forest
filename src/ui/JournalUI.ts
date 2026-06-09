import { G } from '../core/State';
import { ITEMS, RARITY_COLORS } from '../data';

export function buildJournalUI(): void {
  const grid = document.getElementById('jGrid');

  if (!grid) return;

  ITEMS.forEach((def) => {
    const el = document.createElement('div');

    el.className = 'jEntry hidden';
    el.id = `je-${def.id}`;

    el.innerHTML = `
      <span class="jEmoji">${def.e}</span>
      <div class="jName">${def.name}</div>
      <div class="jRarity" style="color:${RARITY_COLORS[def.r]}">
        ${def.r}
      </div>
    `;

    grid.appendChild(el);
  });
}

export function refreshJournal(): void {
  const discovered = G.discovered.size;
  const total = ITEMS.length;

  const label = document.getElementById('progLabel');
  const fill = document.getElementById('progFill');

  if (label) {
    label.textContent =
      `${discovered} / ${total} discovered`;
  }

  if (fill) {
    fill.style.width =
      `${(discovered / total) * 100}%`;
  }

  G.discovered.forEach((id) => {
    const el = document.getElementById(`je-${id}`);

    if (!el) return;

    el.classList.remove('hidden');
    el.classList.add('found');
  });
}