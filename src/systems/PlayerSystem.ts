import * as THREE from 'three';

import { G } from '../core/State';
import { keys } from '../core/Input';
import { camera } from '../core/Scene';

interface Area {
  name: string;
  x: number;
  z: number;
  r: number;
}

const AREAS: Area[] = [
  {
    name: 'FLOWER MEADOW',
    x: 0,
    z: 0,
    r: 22,
  },
  {
    name: 'MUSHROOM HOLLOW',
    x: -18,
    z: 18,
    r: 16,
  },
  {
    name: 'DEWDROP POND',
    x: 30,
    z: 10,
    r: 13,
  },
  {
    name: 'FIREFLY GROVE',
    x: 0,
    z: -20,
    r: 13,
  },
];

export function updatePlayer(
  dt: number,
): void {
  if (G.cooldown > 0) {
    G.cooldown -= dt;
  }

  const forward = new THREE.Vector3(
    -Math.sin(G.yaw),
    0,
    -Math.cos(G.yaw),
  );

  const right = new THREE.Vector3(
    Math.cos(G.yaw),
    0,
    -Math.sin(G.yaw),
  );

  let mx = 0;
  let mz = 0;

  // Movement input
  if (
    keys['KeyW'] ||
    keys['ArrowUp']
  ) {
    mx += forward.x;
    mz += forward.z;
  }

  if (
    keys['KeyS'] ||
    keys['ArrowDown']
  ) {
    mx -= forward.x;
    mz -= forward.z;
  }

  if (
    keys['KeyA'] ||
    keys['ArrowLeft']
  ) {
    mx -= right.x;
    mz -= right.z;
  }

  if (
    keys['KeyD'] ||
    keys['ArrowRight']
  ) {
    mx += right.x;
    mz += right.z;
  }

    // Normalize movement vector
    const len = Math.sqrt(
    mx * mx + mz * mz,
    );

    if (len > 0) {
    mx /= len;
    mz /= len;
    }

    // Position update
    G.px += mx * 4 * dt;
    G.pz += mz * 4 * dt;

    // Flying
    if (keys['Space']) {
    G.py += 2 * dt;
    } else if (
    keys['ShiftLeft'] ||
    keys['ShiftRight']
    ) {
    G.py -= 2 * dt;
    } else {
    const targetHeight =
        2.2 +
        Math.sin(Date.now() * 0.002) *
        0.09;

    G.py +=
        (targetHeight - G.py) *
        3 *
        dt;
    }

    G.py = Math.max(
    0.5,
    Math.min(14, G.py),
    );

    // Camera sync
    camera.position.set(
    G.px,
    G.py,
    G.pz,
    );

    camera.rotation.order = 'YXZ';

    camera.rotation.y = G.yaw;
    camera.rotation.x = G.pitch;

    // Area detection
    updateAreaName();
}

function updateAreaName(): void {
  let areaName = 'DEEP FOREST';

  AREAS.forEach((area) => {
    const dx = G.px - area.x;
    const dz = G.pz - area.z;

    const dist = Math.sqrt(
      dx * dx + dz * dz,
    );

    if (dist < area.r) {
      areaName = area.name;
    }
  });

  const areaLabel =
    document.getElementById(
      'areaName',
    );

  if (areaLabel) {
    areaLabel.textContent = areaName;
  }
}