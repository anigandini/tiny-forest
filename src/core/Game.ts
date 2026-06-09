import { initScene } from './Scene';
import { setupInput } from './Input';
import { buildJournalUI } from '../ui/JournalUI';
import { buildFairyUI } from '../ui/FairyUI';
import { initPanels } from '../ui/Panels';

export function startGame(): void {
  initScene();

  buildJournalUI();
  buildFairyUI();
  initPanels();
  
  setupInput();
}