import { G } from '../core/State';
import { ITEMS } from '../data';

export function refreshInventory(): void {
  const items = Object.entries(G.inventory);

  for (let i = 0; i < 6; i++) {
    const slot = document.getElementById(`s${i}`);
    const qty  = document.getElementById(`q${i}`);

    if (!slot || !qty) continue;

    if (!items[i]) continue;

    const def = ITEMS.find(
      (item) => item.id === items[i][0]
    );

    if (!def) continue;

    if (
      slot.childNodes[0] &&
      slot.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      slot.childNodes[0].remove();
    }

    slot.insertBefore(
      document.createTextNode(def.e),
      slot.firstChild
    );

    slot.classList.add('filled');

    qty.textContent =
      items[i][1] > 1
        ? String(items[i][1])
        : '';
  }
}