import * as THREE from 'three';

export interface FireflyInfo {
  ox: number; oy: number; oz: number;
  ph: number; sp: number;
}

let pollenBuf:   THREE.BufferGeometry | null = null;
let fireflyBuf:  THREE.BufferGeometry | null = null;
let fireflyInfo: FireflyInfo[] = [];

export function buildPollen(scene: THREE.Scene): void {
  const N = 280;
  const p = new Float32Array(N * 3);
  const c = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    p[i * 3]     = (Math.random() - 0.5) * 80;
    p[i * 3 + 1] = 0.5 + Math.random() * 8;
    p[i * 3 + 2] = (Math.random() - 0.5) * 80;
    c[i * 3]     = 0.9  + Math.random() * 0.1;
    c[i * 3 + 1] = 0.88 + Math.random() * 0.08;
    c[i * 3 + 2] = 0.2  + Math.random() * 0.22;
  }

  pollenBuf = new THREE.BufferGeometry();
  pollenBuf.setAttribute('position', new THREE.BufferAttribute(p, 3));
  pollenBuf.setAttribute('color',    new THREE.BufferAttribute(c, 3));
  scene.add(new THREE.Points(pollenBuf, new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.72 })));
}

export function buildFireflies(scene: THREE.Scene): void {
  const N = 70;
  const p = new Float32Array(N * 3);
  const c = new Float32Array(N * 3);
  fireflyInfo = [];

  for (let i = 0; i < N; i++) {
    const x = (Math.random() - 0.5) * 55;
    const z = (Math.random() - 0.5) * 55;
    const y = 0.5 + Math.random() * 4;
    p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = z;
    c[i * 3] = 0.8; c[i * 3 + 1] = 1; c[i * 3 + 2] = 0.3;
    fireflyInfo.push({ ox: x, oy: y, oz: z, ph: Math.random() * Math.PI * 2, sp: 0.3 + Math.random() * 0.5 });
  }

  fireflyBuf = new THREE.BufferGeometry();
  fireflyBuf.setAttribute('position', new THREE.BufferAttribute(p, 3));
  fireflyBuf.setAttribute('color',    new THREE.BufferAttribute(c, 3));
  scene.add(new THREE.Points(fireflyBuf, new THREE.PointsMaterial({ size: 0.14, vertexColors: true, transparent: true, opacity: 0.92 })));
}

export function updateParticles(): void {
  const t = Date.now() * 0.001;

  if (pollenBuf) {
    const p = pollenBuf.attributes.position.array as Float32Array;
    for (let i = 0; i < p.length; i += 3) {
      p[i]     += Math.sin(t * 0.3 + i) * 0.009;
      p[i + 1] += 0.0015;
      if (p[i + 1] > 10) p[i + 1] = 0.3;
    }
    pollenBuf.attributes.position.needsUpdate = true;
  }

  if (fireflyBuf) {
    const p = fireflyBuf.attributes.position.array as Float32Array;
    const c = fireflyBuf.attributes.color.array    as Float32Array;
    fireflyInfo.forEach((fd, i) => {
      p[i * 3]     = fd.ox + Math.sin(t * fd.sp + fd.ph) * 2.8;
      p[i * 3 + 1] = fd.oy + Math.sin(t * fd.sp * 1.3 + fd.ph * 2) * 1.4;
      p[i * 3 + 2] = fd.oz + Math.cos(t * fd.sp + fd.ph) * 2.8;
      const br = 0.45 + 0.55 * Math.sin(t * 2.2 + fd.ph * 3);
      c[i * 3]     = br;
      c[i * 3 + 1] = br;
      c[i * 3 + 2] = br * 0.3;
    });
    fireflyBuf.attributes.position.needsUpdate = true;
    fireflyBuf.attributes.color.needsUpdate    = true;
  }
}