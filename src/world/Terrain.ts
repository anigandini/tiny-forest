import * as THREE from 'three';
import { snoise } from '../utils/Noise';

export function buildGround(scene: THREE.Scene): void {
  const geo = new THREE.PlaneGeometry(200, 200, 64, 64);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors: number[] = [];

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const n = snoise(x * 0.04, z * 0.04);
    pos.setY(i, n * 0.4);
    const g = 0.16 + n * 0.05;
    colors.push(0.05 + n * 0.02, g, 0.03 + n * 0.01);
  }

  geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
  mesh.rotation.x   = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
}