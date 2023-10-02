import { Component, Input } from '@angular/core';
import { MapObject } from 'src/app/common/map-object';

@Component({
  selector: 'app-terrain-feature-card-list',
  templateUrl: './terrain-feature-card-list.component.html',
  styleUrls: ['./terrain-feature-card-list.component.css']
})
export class TerrainFeatureCardListComponent {
  @Input() mapObjects: MapObject[];
}
