import { Component, Input } from '@angular/core';
import { Scenario } from '../scenario';

@Component({
  selector: 'app-scenario-card',
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.css']
})
export class ScenarioCardComponent {
  @Input() scenario: Scenario;
}
