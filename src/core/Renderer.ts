import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;

export function initRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
 
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}

export function getRenderer(): THREE.WebGLRenderer {
  return renderer;
}