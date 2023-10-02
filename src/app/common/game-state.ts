import { Scenario } from "../setup/scenario-list/scenario";
import { ScenarioOption } from "../setup/scenario-list/scenario-list.component";
import { TerrainFeatureOption } from "../setup/setup.component";
import { MapObject } from "./map-object";
import { TerrainFeature } from "./terrain-feature";

export class GameState {

  id: number;
  created: Date;
  activeScenario: Scenario;
  terrainFeatures: TerrainFeature[];
  terrainFeatureOptions: TerrainFeatureOption[];
  scenarioOptions: ScenarioOption[];
  mapObjects: MapObject[];
}

