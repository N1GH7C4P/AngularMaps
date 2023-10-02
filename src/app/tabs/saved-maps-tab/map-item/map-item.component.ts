import { Component, Input } from '@angular/core';
import { GameState } from '../../../common/game-state';
import { StorageService } from 'src/app/common/storage.service';

@Component({
  selector: 'app-map-item',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.css']
})
export class MapItemComponent {
  @Input() gameState: GameState;
  public hovered: boolean = false;
  public terrainPiecesClicked: boolean = false;

  constructor(private storageService: StorageService) {}

  onDeleteMap(id: number) {
    console.log('deleting map: '+id)
    const gameStates: GameState[] = this.storageService.getGameState();
    const filtered = gameStates.filter((gs) => {
      gs.id !== id
    });
    this.storageService.setGameState(filtered);
  }

  onLoadMap(gameState: GameState) {
    this.storageService.setMode('load');
    this.storageService.setActiveGameState(gameState);
  }

}
