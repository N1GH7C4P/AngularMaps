import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ScenarioService } from 'src/app/scenario-service';
import { StorageService } from 'src/app/common/storage.service';
import { Scenario } from './scenario';

export interface ScenarioOption {
  scenario: Scenario;
  completed: boolean;
  color: ThemePalette;
  hovered: boolean;
}

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit, OnDestroy {

  options: ScenarioOption[];
  scenarios: Scenario[];
  private optionsSub: Subscription;

  constructor(private scenarioService: ScenarioService, private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getScenarioOptions();
    this.storageService._scenarioOptions.subscribe((data) => {
      this.options = data
    })
    if(!this.options || this.options.length === 0)
      this.optionsSub = this.populateOptions();
    this.storageService.setScenarioOptions(this.options);
  }

  populateOptions(): Subscription {
    return (this.scenarioService.fetchScenarios().subscribe((scenarios) => {
      console.log(scenarios);
      this.options = [];
      let tempOption: ScenarioOption;
      scenarios.forEach((s) => {
        {
          tempOption = {
            scenario: s,
            completed: true,
            color: 'primary',
            hovered: false,
          }
          this.options.push(tempOption);
        }
      })
      this.storageService.setScenarioOptions(this.options);
    }))
  }

  setComplete(completed: boolean, option: ScenarioOption) {
    option.completed = completed;
    this.storageService.setScenarioOptions(this.options);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.storageService.setScenarioOptions(this.options);
    if(this.optionsSub != null)
      this.optionsSub.unsubscribe();
  }
}
