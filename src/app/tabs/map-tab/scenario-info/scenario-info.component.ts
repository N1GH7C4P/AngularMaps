import { Component, Input } from '@angular/core';
import { Scenario } from 'src/app/setup/scenario-list/scenario';

@Component({
  selector: 'app-scenario-info',
  templateUrl: './scenario-info.component.html',
  styleUrls: ['./scenario-info.component.css']
})
export class ScenarioInfoComponent  {
  @Input() activeScenario: Scenario;
}
