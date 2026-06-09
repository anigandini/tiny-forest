import * as THREE from 'three';
import { loadModel } from '../Loaders/AssetsLoader';

function mkMesh(geo: THREE.BufferGeometry, color: number | THREE.Color, cast = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color }));
  if (cast) m.castShadow = true;
  return m;
}

export async function buildFlowers(
  scene: THREE.Scene
): Promise<void> {

  const template = await loadModel(
    '/assets/models/stylized_daisy.glb'
  );

  for (let i = 0; i < 25; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 52;

    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;

    const patch = template.clone();

    patch.position.set(x, 0, z);

    patch.rotation.y =
      Math.random() * Math.PI * 2;

    const scale =
      0.8 + Math.random() * 0.4;

    patch.scale.setScalar(scale);

    scene.add(patch);
  }
}

export async function buildMushrooms(scene: THREE.Scene): Promise<void> {

  const template = await loadModel(
    '/assets/models/mushroom.glb'
  );

  for (let i = 0; i < 22; i++) {

    const a = Math.random() * Math.PI * 2;
    const r = 6 + Math.random() * 50;

    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;

    const mushroom = template.clone();

    mushroom.position.set(x, 0, z);

    mushroom.rotation.y =
      Math.random() * Math.PI * 2;

    const scale =
      0.8 + Math.random() * 0.6;

    mushroom.scale.setScalar(scale);

    scene.add(mushroom);
  }
}

export async function buildTrees(
  scene: THREE.Scene
): Promise<void> {

  const treeTemplate = await loadModel(
    '/assets/models/anime_tree.glb'
  );

  for (let i = 0; i < 8; i++) {

    const a = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 65;

    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;

    const tree = treeTemplate.clone();

    tree.position.set(x, 0, z);

    tree.rotation.y =
      Math.random() * Math.PI * 2;

    const scale = 3
      //0.8 + Math.random() * 0.5;

    tree.scale.setScalar(scale);

    scene.add(tree);
  }
}

export async function buildGrass(scene: THREE.Scene): Promise<void> {
  const grass = await loadModel(
      '/assets/models/anime_bush.glb'
    );

    for (let i = 0; i < 50; i++) {
      const instance = grass.clone();

      instance.position.set(
        (Math.random() - 0.5) * 100,
        0,
        (Math.random() - 0.5) * 100
      );

      instance.rotation.y = Math.random() * Math.PI * 2;

      const scale = 0.8 + Math.random() * 0.4;
      instance.scale.setScalar(scale);

      scene.add(instance);
    }  
}

export async function buildCrystals(
  scene: THREE.Scene
): Promise<void> {

  const crystalTemplate = await loadModel(
    '/assets/models/stylized_crystal_cluster.glb'
  );

  

  for (let i = 0; i < 14; i++) {

    const a = Math.random() * Math.PI * 2;
    const r = 9 + Math.random() * 42;

    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;

    const crystal = crystalTemplate.clone();

    crystal.position.set(x, 0, z);

    crystal.rotation.y =
      Math.random() * Math.PI * 2;

    const scale =
      0.8 + Math.random() * 0.7;

    crystal.scale.setScalar(scale);

    crystal.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const material =
          obj.material as THREE.MeshStandardMaterial;

        material.emissive.set(0xcff6ff);
        material.emissiveIntensity = 1.5;
      }
    });

    scene.add(crystal);
  }
}

export async function buildPond(scene: THREE.Scene): Promise<void> {
  const pond  = await loadModel(
    '/assets/models/cartoon_pond.glb'
  );
  //pond.rotation.x = -Math.PI / 2;
  pond.scale.setScalar(0.5);
  pond.position.set(30, 0.07, 10);
  scene.add(pond);
}