import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TerrainFeature } from '../common/terrain-feature';
import { StorageService } from '../common/storage.service';

export interface TerrainFeatureOption {
  terrainFeature: TerrainFeature
  completed: boolean;
  color: ThemePalette;
  suboptions?: TerrainFeatureOption[];
  suboptionsComplete: boolean;
  hovered: boolean;
}

/**
 * @title Basic checkboxes
 */
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit{
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
      this.storageService.setMode('generate');
  }
}
