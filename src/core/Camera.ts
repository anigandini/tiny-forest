import * as THREE from 'three';

let camera: THREE.PerspectiveCamera;

export function initCamera(): THREE.PerspectiveCamera {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.05,
    180,
  );

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return camera;
}

export function getCamera(): THREE.PerspectiveCamera {
  return camera;
}