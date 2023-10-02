import { Injectable } from '@angular/core';
import { Scenario } from './setup/scenario-list/scenario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {


  private scenarios: Scenario[];

  constructor(private http: HttpClient) { }

  fetchScenarios(): Observable<Scenario[]> {
    return(this.http.get<Scenario[]>('../assets/json/scenarioDB.json'));
  }
}
