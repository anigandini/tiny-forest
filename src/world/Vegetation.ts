import * as THREE from 'three';

function mkMesh(geo: THREE.BufferGeometry, color: number | THREE.Color, cast = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color }));
  if (cast) m.castShadow = true;
  return m;
}

export function buildFlowers(scene: THREE.Scene): void {
  const FC = [0xFFE57A, 0xFF6B8A, 0xFFB3D9, 0xB08ED0, 0xFF9050, 0xFFFFAA, 0xFF80B0, 0xFF4060];

  for (let i = 0; i < 55; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 52;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 1.8 + Math.random() * 3.5;
    const col = FC[Math.floor(Math.random() * FC.length)];

    const stem = mkMesh(new THREE.CylinderGeometry(0.04, 0.07, h, 6), 0x3a8028);
    stem.position.set(x, h / 2, z);
    scene.add(stem);

    const np = 5 + Math.floor(Math.random() * 4);
    for (let p = 0; p < np; p++) {
      const pa = (p / np) * Math.PI * 2;
      const pm = mkMesh(new THREE.SphereGeometry(0.27 + Math.random() * 0.15, 6, 4), col);
      pm.position.set(x + Math.cos(pa) * 0.44, h, z + Math.sin(pa) * 0.44);
      pm.scale.y = 0.3;
      scene.add(pm);
    }

    const ctr = mkMesh(new THREE.SphereGeometry(0.23, 7, 5), 0xFFFF70);
    ctr.position.set(x, h + 0.05, z);
    scene.add(ctr);
  }
}

export function buildMushrooms(scene: THREE.Scene): void {
  const MC = [0xFF6040, 0xE05030, 0xFF9040, 0xD04020];

  for (let i = 0; i < 22; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 6 + Math.random() * 50;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 1.2 + Math.random() * 2.5;

    const stem = mkMesh(new THREE.CylinderGeometry(0.17, 0.27, h, 8), 0xDDBB99);
    stem.position.set(x, h / 2, z);
    scene.add(stem);

    const cap = mkMesh(
      new THREE.SphereGeometry(0.68 + Math.random() * 0.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      MC[Math.floor(Math.random() * MC.length)],
    );
    cap.position.set(x, h + 0.15, z);
    scene.add(cap);

    const spotCount = 3 + Math.floor(Math.random() * 3);
    for (let s = 0; s < spotCount; s++) {
      const sa = Math.random() * Math.PI * 2;
      const sr = 0.18 + Math.random() * 0.36;
      const sp = mkMesh(new THREE.SphereGeometry(0.062, 4, 4), 0xFFFFFF);
      sp.position.set(x + Math.cos(sa) * sr, h + 0.42 + Math.random() * 0.22, z + Math.sin(sa) * sr);
      scene.add(sp);
    }
  }
}

export function buildTrees(scene: THREE.Scene): void {
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 65;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 9 + Math.random() * 14;

    const trunk = mkMesh(new THREE.CylinderGeometry(0.5, 1.1, h, 8), 0x5a3618);
    trunk.position.set(x, h / 2, z);
    scene.add(trunk);

    const layerCount = 3 + Math.floor(Math.random() * 2);
    for (let l = 0; l < layerCount; l++) {
      const cr = Math.max(0.5, 2.5 + Math.random() * 2.5 - l * 0.5);
      const cn = mkMesh(
        new THREE.SphereGeometry(cr, 8, 6),
        new THREE.Color(0.08 + Math.random() * 0.06, 0.28 + Math.random() * 0.1, 0.06 + Math.random() * 0.04),
      );
      cn.position.set(x + (Math.random() - 0.5) * 1.5, h + l * 2.2, z + (Math.random() - 0.5) * 1.5);
      cn.receiveShadow = true;
      scene.add(cn);
    }
  }
}

export function buildGrass(scene: THREE.Scene): void {
  const verts: number[] = [];
  const cols:  number[] = [];

  for (let i = 0; i < 7000; i++) {
    const x = (Math.random() - 0.5) * 110;
    const z = (Math.random() - 0.5) * 110;
    const h = 0.25 + Math.random() * 0.7;

    for (let b = 0; b < 3; b++) {
      const ba = b * (Math.PI / 3) + Math.random() * 0.3;
      const bx = Math.cos(ba) * 0.052;
      const bz = Math.sin(ba) * 0.052;
      verts.push(x - bx, 0, z - bz,  x + bx, 0, z + bz,  x, h, z);
      const gv = 0.22 + Math.random() * 0.25;
      cols.push(gv * 0.3, gv * 0.6, gv * 0.15,  gv * 0.3, gv * 0.6, gv * 0.15,  gv * 0.2, gv, 0.1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(cols),  3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })));
}

export function buildCrystals(scene: THREE.Scene): void {
  const CC = [0x80E8FF, 0xC080FF, 0x80FFE0, 0xFFD080];

  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 9 + Math.random() * 42;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;

    const count = 3 + Math.floor(Math.random() * 3);
    for (let c = 0; c < count; c++) {
      const h   = 0.4 + Math.random() * 1.8;
      const col = CC[Math.floor(Math.random() * CC.length)];
      const cr  = new THREE.Mesh(
        new THREE.ConeGeometry(0.08 + Math.random() * 0.12, h, 5),
        new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: 0.72, emissive: col, emissiveIntensity: 0.35 }),
      );
      cr.position.set(x + (Math.random() - 0.5) * 1.2, h / 2, z + (Math.random() - 0.5) * 1.2);
      cr.rotation.z = (Math.random() - 0.5) * 0.3;
      scene.add(cr);
    }
  }
}

export function buildPond(scene: THREE.Scene): void {
  const pond = new THREE.Mesh(
    new THREE.CircleGeometry(6, 32),
    new THREE.MeshPhongMaterial({ color: 0x1028a8, transparent: true, opacity: 0.72, shininess: 120 }),
  );
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(30, 0.07, 10);
  scene.add(pond);

  for (let i = 0; i < 8; i++) {
    const a  = Math.random() * Math.PI * 2;
    const r  = Math.random() * 4.5;
    const lp = new THREE.Mesh(
      new THREE.CircleGeometry(0.33 + Math.random() * 0.22, 8),
      new THREE.MeshLambertMaterial({ color: 0x2a6820 }),
    );
    lp.rotation.x = -Math.PI / 2;
    lp.position.set(30 + Math.cos(a) * r, 0.09, 10 + Math.sin(a) * r);
    scene.add(lp);
  }
}