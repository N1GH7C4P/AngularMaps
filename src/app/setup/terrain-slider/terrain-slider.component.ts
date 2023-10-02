import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-terrain-slider',
  templateUrl: './terrain-slider.component.html',
  styleUrls: ['./terrain-slider.component.css']
})
export class TerrainSliderComponent implements OnInit, OnDestroy {
  min: number = 0;
  max: number = 20;
  startValue: number;
  endValue: number;
  disabled = false;
  private storage: Storage = localStorage;

  ngOnInit() {
    const minFromStorage:number = +this.storage.getItem('minTerrainElements');
    if (minFromStorage != null)
      this.startValue = minFromStorage;
    else
      this.startValue = 2
    const maxFromStorage:number = +this.storage.getItem('maxTerrainElements');
    if (maxFromStorage != null)
      this.endValue = maxFromStorage;
    else
      this.endValue = 12
    document.getElementById("sliderMin").addEventListener('mouseup', () => {
      console.log("TerrainSlider - Min Changes: "+this.startValue);
      this.storage.setItem('minTerrainElements', this.startValue.toString());
    })
    document.getElementById("sliderMax").addEventListener('mouseup', () => {
      console.log("TerrainSlider - Max Changes: "+this.endValue);
      this.storage.setItem('maxTerrainElements', this.endValue.toString());
    })
  }

  ngOnDestroy(): void {
    this.storage.setItem('minTerrainElements', this.startValue.toString());
    this.storage.setItem('maxTerrainElements', this.endValue.toString());
  }
}
