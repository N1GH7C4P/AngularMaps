import { Component } from '@angular/core';

@Component({
  selector: 'app-table-slider',
  templateUrl: './table-slider.component.html',
  styleUrls: ['./table-slider.component.css']
})
export class TableSliderComponent {

  min: number = 2;
  max: number = 8;
  width: number;
  length: number;
  disabled = false;
  private storage: Storage = localStorage;

  ngOnInit() {
    const widthFromStorage:number = +this.storage.getItem('tableWidth');
    if (widthFromStorage != null)
      this.width = widthFromStorage;
    else
      this.width = 2
    const lengthFromStorage:number = +this.storage.getItem('tableLength');
    if (lengthFromStorage != null)
      this.length = lengthFromStorage;
    else
      this.length = 12
      document.getElementById("sliderWidth").addEventListener('mouseup', () => {
      this.storage.setItem('tableWidth', this.width.toString());
    })
      document.getElementById("sliderLength").addEventListener('mouseup', () => {
      this.storage.setItem('tableLength', this.length.toString());
    })
  }

  ngOnDestroy(): void {
    this.storage.setItem('tableWidth', this.width.toString());
    this.storage.setItem('tableLength', this.length.toString());
  }

}
