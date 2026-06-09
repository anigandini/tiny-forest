import { G } from './State';
import { tryCollect } from '../systems/CollectionSystem';
import { closePanel } from '../ui/Panels';

export const keys: Record<string, boolean> = {};

export function setupInput(): void {
  document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'KeyE')     tryCollect();
    if (e.code === 'Escape')   closePanel();
  });

  document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });

  const cv = document.getElementById('gameCanvas') as HTMLCanvasElement;

  cv.addEventListener('mousedown', (e) => {
    if (G.activePanel) return;
    G.dragging = true;
    G.lastMX   = e.clientX;
    G.lastMY   = e.clientY;
  });

  window.addEventListener('mouseup', () => { G.dragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (!G.dragging || G.activePanel) return;
    const dx = e.clientX - G.lastMX;
    const dy = e.clientY - G.lastMY;
    G.lastMX = e.clientX;
    G.lastMY = e.clientY;
    G.yaw   -= dx * 0.003;
    G.pitch  = Math.max(-1.1, Math.min(1.1, G.pitch - dy * 0.003));
  });

  // Touch
  cv.addEventListener('touchstart', (e) => {
    if (G.activePanel) return;
    const t   = e.touches[0];
    G.dragging = true;
    G.lastMX   = t.clientX;
    G.lastMY   = t.clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => { G.dragging = false; });

  window.addEventListener('touchmove', (e) => {
    if (!G.dragging || G.activePanel) return;
    const t  = e.touches[0];
    const dx = t.clientX - G.lastMX;
    const dy = t.clientY - G.lastMY;
    G.lastMX = t.clientX;
    G.lastMY = t.clientY;
    G.yaw   -= dx * 0.004;
    G.pitch  = Math.max(-1.1, Math.min(1.1, G.pitch - dy * 0.004));
  }, { passive: true });

  // Hide drag hint on first interaction
  cv.addEventListener('mousedown', () => {
    const hint = document.getElementById('lookHint');
    if (hint) hint.style.opacity = '0';
  }, { once: true });
}