import { G } from '../core/State';
import { drawFairy } from './FairyUI';

export function openPanel(name: string): void {
  closePanel();

  G.activePanel = name;

  const panel = document.getElementById(
    `panel${name.charAt(0).toUpperCase()}${name.slice(1)}`
  );

  panel?.classList.add('open');

  if (name === 'fairy') {
    drawFairy();
  }
}

export function closePanel(): void {
  if (!G.activePanel) return;

  const panel = document.getElementById(
    `panel${G.activePanel.charAt(0).toUpperCase()}${G.activePanel.slice(1)}`
  );

  panel?.classList.remove('open');

  G.activePanel = null;
}

export function initPanels(): void {
  const btnJournal = document.getElementById('btnJournal');
  const btnFairy   = document.getElementById('btnFairy');

  btnJournal?.addEventListener('click', () => {
    openPanel('journal');
  });

  btnFairy?.addEventListener('click', () => {
    openPanel('fairy');
  });

  document
    .querySelectorAll('.closeBtn')
    .forEach((el) => el.addEventListener('click', closePanel));
}