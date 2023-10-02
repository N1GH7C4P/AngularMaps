import { Component, Input } from '@angular/core';
import { TerrainFeatureOption } from 'src/app/setup/setup.component';
import { MapObject } from 'src/app/common/map-object';

@Component({
  selector: 'app-terrain-feature-chips',
  templateUrl: './terrain-feature-chips.component.html',
  styleUrls: ['./terrain-feature-chips.component.css']
})
export class TerrainFeatureChipsComponent {
  options: TerrainFeatureOption[]

  @Input() mapObjects: MapObject[]

  constructor() {}

}
