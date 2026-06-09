import * as THREE from 'three';
import { ITEMS, SPAWN_SPOTS } from '../data';
import type { CollectibleMesh } from '../types/Collectible';
import { G } from '../core/State';

export let collectMeshes: CollectibleMesh[] = [];


export function buildCollectibles(scene: THREE.Scene): void {
  collectMeshes = [];

  SPAWN_SPOTS.forEach(({ id, x, z }) => {
    const def = ITEMS.find((d) => d.id === id);
    if (!def) return;

    const g = new THREE.Group();
    g.position.set(x, 1.1, z);

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 8, 6),
      new THREE.MeshPhongMaterial({
        color: def.col, emissive: def.col, emissiveIntensity: 0.7,
        transparent: true, opacity: 0.93,
      }),
    );
    g.add(orb);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.042, 6, 16),
      new THREE.MeshBasicMaterial({ color: def.col, transparent: true, opacity: 0.42 }),
    );
    ring.rotation.x = Math.PI / 2;
    g.add(ring);

    const pt = new THREE.PointLight(def.col, 0.6, 3.2);
    g.add(pt);

    scene.add(g);
    collectMeshes.push({ group: g, id, def, collected: false });
  });
}

export function updateCollectibles(_dt: number): void {
  const t = Date.now() * 0.001;
  let nearDist = 999;
  G.nearItem = null;

  for (const cm of collectMeshes) {
  if (cm.collected) continue;

  cm.group.position.y = 1.1 + Math.sin(t * 1.6 + cm.group.position.x) * 0.2;
  cm.group.rotation.y += _dt * 1.1;

  const ring = cm.group.children[1] as THREE.Mesh;

  if (ring) {
    const s = 0.88 + Math.sin(t * 2.2 + cm.group.position.z) * 0.14;
    ring.scale.set(s, s, s);
  }

  const dx = G.px - cm.group.position.x;
  const dz = G.pz - cm.group.position.z;
  const dy = G.py - cm.group.position.y;
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (dist < 2 && dist < nearDist) {
    nearDist = dist;
    G.nearItem = cm;
  }
}

  const ip = document.getElementById('collectPrompt');
  if (!ip) return;
  const item = G.nearItem;

if (item) {
  const test = item.def;
}
  const nearItem: CollectibleMesh | null = G.nearItem;

  if (nearItem) {
    ip.classList.add('show');
    ip.textContent =
      `[ E ] Collect ${nearItem.def.e} ${nearItem.def.name}`;
  } else {
    ip.classList.remove('show');
  }
  }