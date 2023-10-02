import { TerrainFeature } from "./terrain-feature";

export class MapObject {
  id: Number;
  type: TerrainFeature;
  x: number;
  y: number;
  w: number;
  h: number;
  hovered?: boolean;
  clicked?: boolean;
}
