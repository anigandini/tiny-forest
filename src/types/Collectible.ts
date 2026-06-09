import * as THREE from 'three';
import type { Item } from './Item';
 
import { G } from '../core/State';

type GType = typeof G;
type NearItemType = typeof G.nearItem;

export interface CollectibleMesh {
  group:     THREE.Group;
  id:        string;
  def:       Item;
  collected: boolean;
}