import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Scenario } from '../setup/scenario-list/scenario';
import { TerrainFeature } from './terrain-feature';
import { TerrainFeatureOption } from '../setup/setup.component';
import { ScenarioOption } from '../setup/scenario-list/scenario-list.component';
import { MapObject } from './map-object';
import { GameState } from '../common/game-state';
import { GameTable } from '../game/game.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _mode$ = new BehaviorSubject<string>(null);
  public _mode: Observable<String> = this._mode$.asObservable();

  private _activeScenario$ = new BehaviorSubject<Scenario>(null);
  public _activeScenario: Observable<Scenario> = this._activeScenario$.asObservable();

  private _terrainFeatures$ = new BehaviorSubject<TerrainFeature[]>(null);
  public _terrainFeatures: Observable<TerrainFeature[]> = this._terrainFeatures$.asObservable();

  private _terrainFeatureOptions$ = new BehaviorSubject<TerrainFeatureOption[]>(null);
  public _terrainFeatureOptions: Observable<TerrainFeatureOption[]> = this._terrainFeatureOptions$.asObservable();

  private _scenarioOptions$ = new BehaviorSubject<ScenarioOption[]>(null);
  public _scenarioOptions: Observable<ScenarioOption[]> = this._scenarioOptions$.asObservable();

  private _mapObjects$ = new BehaviorSubject<MapObject[]>(null);
  public _mapObjects: Observable<MapObject[]> = this._mapObjects$.asObservable();

  private _gameState$ = new BehaviorSubject<GameState[]>(null);
  public _gameState: Observable<GameState[]> = this._gameState$.asObservable();

  private _activeGameState$ = new BehaviorSubject<GameState>(null);
  public _activeGameState: Observable<GameState> = this._activeGameState$.asObservable();



  private _gameTable$ = new BehaviorSubject<GameTable>(null);
  public _gameTable: Observable<GameTable> = this._gameTable$.asObservable();




  private storage: Storage = localStorage;

  constructor() { }

  setGameTable(data: GameTable) {
    this.storage.setItem('gameTable', JSON.stringify(data));
    this._gameTable$.next(data);
  }

  getGameTable() {
    const data:GameTable = JSON.parse(this.storage.getItem('gameTable'));
    this._gameTable$.next(data);
    return (data);
  }

  clearGameTable() {
    this.storage.removeItem('gameTable');
    this._gameTable$.next(null);
  }

  setMode(data: string) {
    this.storage.setItem('mode', data);
    this._mode$.next(data);
  }

  getMode() {
    const data = this.storage.getItem('mode');
    this._mode$.next(data);
    return (data);
  }

  clearMode() {
    this.storage.removeItem('mode');
    this._mode$.next(null);
  }

  setActiveScenario(data: Scenario) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('activeScenario', jsonData);
    this._activeScenario$.next(data);
  }

  getActiveScenario() {
    const data = JSON.parse(this.storage.getItem('activeScenario'));
    this._activeScenario$.next(data);
    return (data);
  }

  clearActiveScenario() {
    this.storage.removeItem('activeScenario');
    this._activeScenario$.next(null);
  }

  setTerrainFeatures(data: TerrainFeature[]) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('terrainFeatures', jsonData);
    this._terrainFeatures$.next(data);
  }

  getTerrainFeatures() {
    const data = JSON.parse(this.storage.getItem('terrainFeatures'));
    this._terrainFeatures$.next(data);
    return (data);
  }

  clearTerrainFeatures() {
    this.storage.removeItem('terrainFeatures');
    this._terrainFeatures$.next(null);
  }

  setTerrainFeatureOptions(data: TerrainFeatureOption[]) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('terrainFeatureOptions', jsonData);
    this._terrainFeatureOptions$.next(data);
  }

  getTerrainFeatureOptions() {
    const data = JSON.parse(this.storage.getItem('terrainFeatureOptions'));
    this._terrainFeatureOptions$.next(data);
    return (data);
  }

  clearTerrainFeatureOptions() {
    this.storage.removeItem('terrainFeatureOptions');
    this._terrainFeatureOptions$.next(null);
  }

  setScenarioOptions(data: ScenarioOption[]) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('scenarioOptions', jsonData);
    this._scenarioOptions$.next(data);
  }

  getScenarioOptions() {
    const data = JSON.parse(this.storage.getItem('scenarioOptions'));
    this._scenarioOptions$.next(data);
    return (data);
  }

  clearScenarioOptions() {
    this.storage.removeItem('scenarioOptions');
    this._scenarioOptions$.next(null);
  }

  setMapObjects(data: MapObject[]) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('mapObjects', jsonData);
    this._mapObjects$.next(data);
  }

  getMapObjects() {
    const data = JSON.parse(this.storage.getItem('mapObjects'));
    this._mapObjects$.next(data);
    return (data);
  }

  clearMapObjects() {
    this.storage.removeItem('mapObjects');
    this._mapObjects$.next(null);
  }

  setGameState(data: GameState[]) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('gameState', jsonData);
    this._gameState$.next(data);
  }

  getGameState() {
    const data = JSON.parse(this.storage.getItem('gameState'));
    this._gameState$.next(data);
    return (data);
  }

  clearGameState() {
    this.storage.removeItem('gameState');
    this._gameState$.next(null);
  }

  setActiveGameState(data: GameState) {
    const jsonData = JSON.stringify(data);
    this.storage.setItem('activeGameState', jsonData);
    this._activeGameState$.next(data);
    this.setMapObjects(data.mapObjects);
  }

  getActiveGameState() {
    const data = JSON.parse(this.storage.getItem('activeGameState'));
    this._activeGameState$.next(data);
    return (data);
  }

  clearActiveGameState() {
    this.storage.removeItem('activeGameState');
    this._activeGameState$.next(null);
  }

  clearStorage() {
    this.storage.clear();
    this._activeScenario$.next(null);
    this._terrainFeatureOptions$.next(null);
  }
}
