import { G } from '../core/State';

import {
  SKIN_COLORS,
  WING_COLORS,
  OUTFITS,
  OUTFIT_COLORS,
} from '../data';

export function buildFairyUI(): void {
  buildSkinSelector();
  buildWingSelector();
  buildOutfitSelector();
  drawFairy();
}

function buildSkinSelector(): void {
  const row = document.getElementById('skinRow');

  if (!row) return;

  SKIN_COLORS.forEach((color) => {
    const swatch = document.createElement('div');

    swatch.className =
      'colorSwatch' +
      (color === G.skin ? ' active' : '');

    swatch.style.background = color;

    swatch.onclick = () => {
      G.skin = color;

      row
        .querySelectorAll('.colorSwatch')
        .forEach((el) =>
          el.classList.remove('active')
        );

      swatch.classList.add('active');

      drawFairy();
    };

    row.appendChild(swatch);
  });
}


function buildWingSelector(): void {
  const row = document.getElementById('wingRow');

  if (!row) return;

  WING_COLORS.forEach((color) => {
    const swatch = document.createElement('div');

    swatch.className =
      'colorSwatch' +
      (color === G.wing ? ' active' : '');

    swatch.style.background = color;

    swatch.onclick = () => {
      G.wing = color;

      row
        .querySelectorAll('.colorSwatch')
        .forEach((el) =>
          el.classList.remove('active')
        );

      swatch.classList.add('active');

      drawFairy();
    };

    row.appendChild(swatch);
  });
}

function buildOutfitSelector(): void {
  const row = document.getElementById('outfitRow');

  if (!row) return;

  OUTFITS.forEach((outfit) => {
    const locked =
      outfit.unlock &&
      !G.unlocked.has(outfit.unlock);

    const btn =
      document.createElement('button');

    btn.id = `ob-${outfit.id}`;

    btn.className =
      'outfitBtn' +
      (G.outfit === outfit.id
        ? ' active'
        : '') +
      (locked ? ' locked' : '');

    btn.innerHTML =
      `${outfit.e} ${outfit.name}` +
      (locked
        ? '<span class="lockBadge">🔒</span>'
        : '');

    btn.onclick = () => {
      if (
        outfit.unlock &&
        !G.unlocked.has(outfit.unlock)
      ) {
        return;
      }

      G.outfit = outfit.id;

      document
        .querySelectorAll('.outfitBtn')
        .forEach((b) =>
          b.classList.remove('active')
        );

      btn.classList.add('active');

      drawFairy();
    };

    row.appendChild(btn);
  });
}

export function refreshFairyUI(): void {
  OUTFITS.forEach((outfit) => {
    const btn = document.getElementById(
      `ob-${outfit.id}`
    );

    if (!btn) return;

    const locked =
      outfit.unlock &&
      !G.unlocked.has(outfit.unlock);

    btn.classList.toggle(
      'locked',
      Boolean(locked)
    );

    btn.innerHTML =
      `${outfit.e} ${outfit.name}` +
      (locked
        ? '<span class="lockBadge">🔒</span>'
        : '');
  });
}

export function drawFairy(): void {
  const cv = document.getElementById(
    'fairyCanvas'
  ) as HTMLCanvasElement | null;

  if (!cv) return;

  const ctx = cv.getContext('2d');

  if (!ctx) return;

  const W = 140;
  const H = 140;

  ctx.clearRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2 + 10;
  const oc=OUTFIT_COLORS[G.outfit]||OUTFIT_COLORS.default;
  // bg glow
  const bg=ctx.createRadialGradient(cx,cy,5,cx,cy,68); bg.addColorStop(0,'rgba(30,15,50,.85)'); bg.addColorStop(1,'rgba(6,3,12,0)');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  // wings
  ctx.save(); ctx.globalAlpha=.62; ctx.fillStyle=G.wing;
  ctx.beginPath(); ctx.ellipse(cx-26,cy-17,24,16,Math.PI*.15,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx-19,cy+8,16,11,Math.PI*.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+26,cy-17,24,16,-Math.PI*.15,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+19,cy+8,16,11,-Math.PI*.3,0,Math.PI*2); ctx.fill();
  ctx.restore();
  // dress
  ctx.fillStyle=oc.dress;
  ctx.beginPath(); ctx.moveTo(cx-12,cy-3); ctx.lineTo(cx+12,cy-3); ctx.lineTo(cx+18,cy+34); ctx.lineTo(cx-18,cy+34); ctx.closePath(); ctx.fill();
  // body
  ctx.fillStyle=G.skin; ctx.beginPath(); ctx.ellipse(cx,cy-3,10,18,0,0,Math.PI*2); ctx.fill();
  // head
  ctx.beginPath(); ctx.arc(cx,cy-28,16,0,Math.PI*2); ctx.fill();
  // eyes
  ctx.fillStyle='#1e102e';
  ctx.beginPath(); ctx.ellipse(cx-6,cy-28,2.8,3.6,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+6,cy-28,2.8,3.6,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#fff';
  ctx.beginPath(); ctx.arc(cx-5,cy-30,1,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+7,cy-30,1,0,Math.PI*2); ctx.fill();
  // cheeks
  ctx.fillStyle='rgba(255,130,100,.36)';
  ctx.beginPath(); ctx.ellipse(cx-9,cy-24,4.5,2.8,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+9,cy-24,4.5,2.8,0,0,Math.PI*2); ctx.fill();
  // mouth
  ctx.strokeStyle='#6a3828'; ctx.lineWidth=1.3;
  ctx.beginPath(); ctx.arc(cx,cy-21,3.5,.22,Math.PI-.22); ctx.stroke();
  // hat brim
  ctx.fillStyle=oc.hat; ctx.beginPath(); ctx.ellipse(cx,cy-41,14,4.5,0,0,Math.PI*2); ctx.fill();
  // hat cone
  ctx.beginPath(); ctx.moveTo(cx-8,cy-41); ctx.lineTo(cx,cy-60); ctx.lineTo(cx+8,cy-41); ctx.closePath(); ctx.fill();
  // hair
  ctx.fillStyle='#3e2c14';
  ctx.beginPath(); ctx.arc(cx,cy-37,10,Math.PI+.38,Math.PI*2-.38); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx-14,cy-30,4,10,-.28,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+14,cy-30,4,10,.28,0,Math.PI*2); ctx.fill();
  // sparkles
  ctx.fillStyle='rgba(255,255,120,.88)';
  [[cx-31,cy-12],[cx+30,cy-17],[cx-25,cy+3],[cx+27,cy+6]].forEach(([sx,sy])=>{ ctx.beginPath(); ctx.arc(sx,sy,1.3,0,Math.PI*2); ctx.fill(); });
}