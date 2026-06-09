import * as THREE from 'three';

export function buildLights(scene: THREE.Scene): void {
  scene.add(new THREE.AmbientLight(0x304820, 2.2));
  scene.add(new THREE.HemisphereLight(0x204828, 0x101810, 0.8));

  const d = new THREE.DirectionalLight(0x99aabb, 1.1);
  d.position.set(20, 35, 15);
  d.castShadow = true;
  d.shadow.mapSize.set(1024, 1024);
  d.shadow.camera.near   = 0.5;
  d.shadow.camera.far    = 120;
  d.shadow.camera.left   = -55;
  d.shadow.camera.right  = 55;
  d.shadow.camera.top    = 55;
  d.shadow.camera.bottom = -55;
  scene.add(d);

  const f = new THREE.DirectionalLight(0x604828, 0.3);
  f.position.set(-15, 8, -20);
  scene.add(f);
}