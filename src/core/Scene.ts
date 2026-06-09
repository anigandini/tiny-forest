import * as THREE from 'three';

import { buildLights } from '../world/Lighting';
import { buildGround } from '../world/Terrain';
import { buildFlowers, buildMushrooms, buildTrees, buildGrass, buildCrystals, buildPond } from '../world/Vegetation';
import { buildPollen, buildFireflies } from '../world/Particles';
import { buildCollectibles } from '../world/Collectibles';

import { gameLoop } from './GameLoop';

export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;
export let clock: THREE.Clock;

export function initScene(): void {
  clock = new THREE.Clock();

  const canvas = document.getElementById(
    'gameCanvas'
  ) as HTMLCanvasElement;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure = 0.9;

  scene = new THREE.Scene();

  scene.fog =
    new THREE.FogExp2(0x0a140a, 0.02);

  scene.background =
    new THREE.Color(0x0a140a);

    camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth /
      window.innerHeight,
    0.05,
    180
  );

  camera.position.set(0, 2.2, 0);

   buildLights(scene);

  buildGround(scene);

  buildFlowers(scene);
  buildMushrooms(scene);
  buildTrees(scene);

  buildGrass(scene);

  buildCrystals(scene);
  buildPond(scene);

  buildPollen(scene);
  buildFireflies(scene);

  buildCollectibles(scene);

  window.addEventListener(
    'resize',
    onResize
  );

  renderer.setAnimationLoop(gameLoop);
}

function onResize(): void {
  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
}