import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapObject } from 'src/app/common/map-object';
import { StorageService } from 'src/app/common/storage.service';
import { GameState } from '../../common/game-state';
import { Scenario } from 'src/app/setup/scenario-list/scenario';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.component.html',
  styleUrls: ['./map-tab.component.css']
})
export class MapTabComponent implements OnInit{

  mapObjects$: Observable<MapObject[]>;
  activeScenario$: Observable<Scenario>
  storage: Storage = localStorage
  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await delay(1000);
    this.storageService.getActiveScenario();
    this.activeScenario$ = this.storageService._activeScenario;
    this.storageService.getMapObjects();
    this.mapObjects$ = this.storageService._mapObjects;
  }

  saveState() {
    var currentGameState: GameState[] = this.storageService.getGameState();
    const id: number = uuidv4();

    const newState:GameState = {
      id: id,
      created: new Date(),
      activeScenario: this.storageService.getActiveScenario(),
      terrainFeatures: this.storageService.getTerrainFeatures(),
      terrainFeatureOptions: this.storageService.getTerrainFeatureOptions(),
      scenarioOptions: this.storageService.getScenarioOptions(),
      mapObjects: this.storageService.getMapObjects(),
    }
    if (!currentGameState)
      currentGameState = [];
    currentGameState.push(newState);

    this.storageService.setGameState(currentGameState);
    console.log(JSON.stringify(currentGameState));
  }
  clearState() {
    this.storageService.clearGameState();
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
