import { TerrainFeature } from './common/terrain-feature';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private _terrainFeatures: BehaviorSubject<TerrainFeature[]> = new BehaviorSubject<TerrainFeature[]>([])
  private _terrainFeatures$: Observable<TerrainFeature[]> = this._terrainFeatures.asObservable();

  constructor(private http: HttpClient) { }

  setTerrainFeatures(tf: TerrainFeature[]) {
    this._terrainFeatures.next(tf);
  }

  getTerrainFeatures(): Observable<TerrainFeature[]> {
    return this._terrainFeatures$;
  }

  fetchTerrainFeatures(): Observable<TerrainFeature[]> {
    return(this.http.get<TerrainFeature[]>('../assets/json/terrainDB.json'));
  }

  initTerrainFeatures() {
    this.fetchTerrainFeatures().subscribe((tf => {
      this._terrainFeatures.next(tf);
    }));
  }
}
