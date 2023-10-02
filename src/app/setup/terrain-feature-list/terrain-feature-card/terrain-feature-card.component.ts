import { Component, Input } from '@angular/core';
import { TerrainFeature } from 'src/app/common/terrain-feature';

@Component({
  selector: 'app-terrain-feature-card',
  templateUrl: './terrain-feature-card.component.html',
  styleUrls: ['./terrain-feature-card.component.css']
})
export class TerrainFeatureCardComponent {
  @Input() terrainFeature: TerrainFeature;
}
