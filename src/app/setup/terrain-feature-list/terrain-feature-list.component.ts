import { Component } from '@angular/core';
import { TerrainFeatureOption } from '../setup.component';
import { Subscription } from 'rxjs';
import { TerrainService } from 'src/app/terrain-service';
import { StorageService } from 'src/app/common/storage.service';
import { TerrainFeature } from 'src/app/common/terrain-feature';

@Component({
  selector: 'app-terrain-feature-list',
  templateUrl: './terrain-feature-list.component.html',
  styleUrls: ['./terrain-feature-list.component.css']
})
export class TerrainFeatureListComponent {

  options: TerrainFeatureOption[];
  private optionsSub: Subscription;

  constructor(private terrainService: TerrainService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.terrainService.initTerrainFeatures();
    this.storageService.getTerrainFeatureOptions();
    this.storageService._terrainFeatureOptions.subscribe((data) => {
      this.options = data
    });
    if(!this.options || this.options.length === 0)
      this.optionsSub = this.populateOptions();
  }

  populateOptions(): Subscription {
    return (this.terrainService.getTerrainFeatures().subscribe((terrainFeatures) => {
      this.options = [];
      let tempOption: TerrainFeatureOption;
      let previous_id = 0
      terrainFeatures.forEach((tf) => {
        if(previous_id === 0 || previous_id !== tf.type_id)
        {
          tempOption = {
            terrainFeature: tf,
            completed: true,
            color: 'primary',
            suboptions: [{
              terrainFeature: tf,
              completed: true,
              color: 'accent',
              suboptions: [],
              suboptionsComplete: true,
              hovered: false,
            }],
            suboptionsComplete: true,
            hovered: false
          }
          this.options.push(tempOption);
        }
        else {
          tempOption.suboptions.push({
            terrainFeature: tf,
            completed: true,
            color: 'accent',
            suboptions: [],
            suboptionsComplete: true,
            hovered: false
          })
        }
        previous_id = tf.type_id;
      })
      this.storageService.setTerrainFeatureOptions(this.options);
    }))
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.storageService.setTerrainFeatureOptions(this.options);
    if(this.optionsSub != null)
      this.optionsSub.unsubscribe();
  }

  updateAllComplete(option: TerrainFeatureOption) {
    option.suboptionsComplete = option.suboptions != null && option.suboptions.every(t => t.completed);
    console.log("Terrain Checkbox - values changed");
    this.storageService.setTerrainFeatureOptions(this.options);
  }

  someComplete(option: TerrainFeatureOption): boolean {
    if (option.suboptions == null) {
      return false;
    }
    const res = option.suboptions.filter(t => t.completed).length > 0 && !option.suboptionsComplete;
    return res;
  }

  setAll(completed: boolean, option: TerrainFeatureOption) {
    option.suboptions.every(t => t.completed = completed)
    if (option.suboptions == null) {
      return;
    }
    option.suboptions.forEach(t => (t.completed = completed));
    console.log("Terrain Checkbox - values changed");
    this.storageService.setTerrainFeatureOptions(this.options);
  }

}
