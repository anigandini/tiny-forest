import { clock, renderer, scene, camera } from './Scene';
import { G } from './State';
import { updatePlayer } from '../systems/PlayerSystem';
import { updateCollectibles } from '../world/Collectibles';
import { updateParticles } from '../world/Particles';

export function gameLoop(): void {
  const dt = Math.min(
    clock.getDelta(),
    0.05
  );

  if (!G.activePanel) {
    updatePlayer(dt);
    updateCollectibles(dt);
  }

  updateParticles();

  renderer.render(
    scene,
    camera
  );
}